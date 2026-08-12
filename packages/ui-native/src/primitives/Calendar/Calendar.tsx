import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  FlatList,
  Pressable,
  Text,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type ViewStyle,
} from 'react-native';
import { spacing } from '@kodes-tech/tokens';
import {
  buildWeeks,
  monthsBetween,
  nextRange,
  EMPTY_RANGE,
  MONTH_LABELS_LONG,
  MONTH_LABELS_SHORT,
  WEEKDAY_INITIALS,
  type CalendarCell,
  type DateRange,
  type IsoDate,
  type YearMonth,
} from './date-utils';

type CalendarBaseProps = {
  /**
   * Primeiro dia selecionável **e** primeiro mês da lista. Obrigatório de
   * propósito: a janela `[minDate, maxDate]` é o que define ao mesmo tempo o que
   * rola e o que está habilitado — sem ela o primitivo teria que ler o relógio,
   * e aí não dá pra testar nem prever o que renderiza.
   */
  minDate: IsoDate;
  /** Último dia selecionável e último mês da lista. */
  maxDate: IsoDate;
  /** Ano visível (controlado). Mudar rola a lista pro 1º mês daquele ano. */
  year?: number;
  /** Dispara quando a rolagem manual chega num ano diferente. */
  onYearChange?: (year: number) => void;
};

export type CalendarSingleProps = CalendarBaseProps & {
  mode?: 'single';
  value?: IsoDate | null;
  onChange?: (value: IsoDate) => void;
};

export type CalendarRangeProps = CalendarBaseProps & {
  mode: 'range';
  value?: DateRange;
  onChange?: (value: DateRange) => void;
};

export type CalendarProps = CalendarSingleProps | CalendarRangeProps;

/** Lado arredondado da cápsula do dia — o interior do período fica reto pra faixa emendar. */
type Pill = 'none' | 'full' | 'left' | 'right';
/** Faixa contínua do miolo do período: cobre a célula toda, ou meia célula na ponta. */
type Band = 'none' | 'full' | 'toRight' | 'toLeft';

type MonthData = YearMonth & { weeks: CalendarCell[][] };

/**
 * Geometria da grade, em dp. A altura de cada mês é **calculada**, não medida —
 * é o que deixa o `getItemLayout` exato e o `scrollToIndex` do salto de ano
 * cair no lugar certo sem esperar layout.
 */
const DAY_SIZE = 32;
const ROW_GAP = 1;
const LABEL_HEIGHT = 20;
const LABEL_GAP = spacing.xl;
const MONTH_GAP = spacing.xxxl;
/**
 * Padding do `contentContainerStyle` da lista. Entra na conta dos offsets: o
 * `paddingTop` faz parte do conteúdo rolável, então o topo do primeiro mês não
 * está em 0 — está neste valor. Sem somar, o `contentOffset.y` (que já conta o
 * padding) e os offsets ficariam defasados, e o salto de ano pararia um pouco
 * antes do rótulo do mês.
 */
const LIST_PADDING = spacing.xl;

const monthHeight = (weeks: number): number =>
  LABEL_HEIGHT + LABEL_GAP + weeks * DAY_SIZE + (weeks - 1) * ROW_GAP + MONTH_GAP;

const BAND_STYLE: Record<Exclude<Band, 'none'>, ViewStyle> = {
  full: { left: 0, right: 0 },
  toRight: { left: '50%', right: 0 },
  toLeft: { left: 0, right: '50%' },
};

const PILL_CLASS: Record<Exclude<Pill, 'none'>, string> = {
  full: 'bg-brand-strong rounded-pill',
  left: 'bg-brand-strong rounded-l-pill',
  right: 'bg-brand-strong rounded-r-pill',
};

const dayLabel = (day: number, month: number, year: number): string =>
  `${day} de ${MONTH_LABELS_LONG[month - 1]} de ${year}`;

/** Estado visual de um dia — derivado só do valor, sem estado interno. */
const visualFor = (
  iso: IsoDate,
  range: DateRange | null,
  single: IsoDate | null,
): { pill: Pill; band: Band } => {
  if (range === null) {
    return { pill: iso === single ? 'full' : 'none', band: 'none' };
  }

  const { start, end } = range;
  const isStart = iso === start;
  const isEnd = iso === end;
  const closed = start !== null && end !== null;

  if (isStart && isEnd) return { pill: 'full', band: 'none' };
  if (isStart) return { pill: closed ? 'left' : 'full', band: closed ? 'toRight' : 'none' };
  if (isEnd) return { pill: 'right', band: 'toLeft' };
  if (closed && iso > start && iso < end) return { pill: 'none', band: 'full' };
  return { pill: 'none', band: 'none' };
};

/**
 * Calendar — grade de meses roláveis com seleção de **data única** (`mode='single'`)
 * ou de **período** (`mode='range'`), em pt-BR e com a semana começando na segunda.
 *
 * Controlado: o valor entra por `value` e sai por `onChange`; o componente não
 * guarda seleção. Datas são strings ISO `YYYY-MM-DD` — sem `Date`, sem fuso, sem
 * erro de um dia (ver `date-utils.ts`).
 *
 * O dropdown de ano **não** mora aqui: no Figma ele fica na mesma linha do botão
 * voltar, então é o `CalendarYearSelect` plugado no slot `right` do `AppHeader`.
 * A ligação entre os dois é `year`/`onYearChange`, nos dois sentidos — escolher
 * um ano rola a lista, e rolar a lista atualiza o rótulo.
 */
export const Calendar = (props: CalendarProps): React.ReactElement => {
  const { minDate, maxDate, year, onYearChange } = props;

  const range = props.mode === 'range' ? (props.value ?? EMPTY_RANGE) : null;
  const single = props.mode === 'range' ? null : (props.value ?? null);

  const months = useMemo<MonthData[]>(
    () =>
      monthsBetween(minDate, maxDate).map((month) => ({
        ...month,
        weeks: buildWeeks(month.year, month.month),
      })),
    [minDate, maxDate],
  );

  /**
   * Deslocamento acumulado de cada mês — base do `getItemLayout` e do sync de ano.
   * Começa em `LIST_PADDING`, não em 0: o `paddingTop` da lista empurra o primeiro
   * mês para baixo e conta como conteúdo rolável.
   */
  const offsets = useMemo(() => {
    let cursor = LIST_PADDING;
    return months.map((month) => {
      const offset = cursor;
      cursor += monthHeight(month.weeks.length);
      return offset;
    });
  }, [months]);

  const listRef = useRef<FlatList<MonthData>>(null);
  /**
   * Último ano que já está refletido nos dois lados. Sem isso, o `onYearChange`
   * da rolagem volta como prop `year` e dispara um `scrollToIndex` que briga com
   * o dedo do usuário.
   */
  const syncedYear = useRef<number | null>(null);

  useEffect(() => {
    if (year === undefined || year === syncedYear.current) return;
    const index = months.findIndex((month) => month.year === year);
    if (index < 0) return;
    syncedYear.current = year;
    listRef.current?.scrollToIndex({ index, animated: true });
  }, [year, months]);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
      if (!onYearChange) return;
      const offsetY = event.nativeEvent.contentOffset.y;
      let index = 0;
      while (index + 1 < offsets.length && offsets[index + 1] <= offsetY) index += 1;

      const visibleYear = months[index].year;
      if (visibleYear === syncedYear.current) return;
      syncedYear.current = visibleYear;
      onYearChange(visibleYear);
    },
    [months, offsets, onYearChange],
  );

  const handleSelectDay = useCallback(
    (iso: IsoDate): void => {
      if (props.mode === 'range') {
        props.onChange?.(nextRange(props.value ?? EMPTY_RANGE, iso));
        return;
      }
      props.onChange?.(iso);
    },
    // O handler precisa da identidade atual de `value`/`onChange` a cada render —
    // o objeto `props` inteiro é a dependência honesta aqui.
    [props],
  );

  const renderMonth = useCallback(
    ({ item }: { item: MonthData }) => (
      <View style={{ marginBottom: MONTH_GAP }}>
        <Text
          className="font-sans text-buttonLabel text-fg-primary"
          style={{ height: LABEL_HEIGHT, marginBottom: LABEL_GAP }}
        >
          {`${MONTH_LABELS_SHORT[item.month - 1]}, ${item.year}`}
        </Text>

        <View style={{ rowGap: ROW_GAP }}>
          {item.weeks.map((week, weekIndex) => (
            <View key={weekIndex} className="flex-row">
              {week.map((cell, cellIndex) => {
                if (cell === null) {
                  return <View key={cellIndex} className="flex-1" style={{ height: DAY_SIZE }} />;
                }

                const disabled = cell.iso < minDate || cell.iso > maxDate;
                const { pill, band } = visualFor(cell.iso, range, single);

                return (
                  <Pressable
                    key={cellIndex}
                    accessibilityRole="button"
                    accessibilityLabel={dayLabel(cell.day, item.month, item.year)}
                    // O miolo do período conta como selecionado: para quem usa
                    // leitor de tela, 25 está tão dentro da viagem quanto 24 e 26.
                    accessibilityState={{ disabled, selected: pill !== 'none' || band !== 'none' }}
                    disabled={disabled}
                    onPress={() => handleSelectDay(cell.iso)}
                    className="flex-1 items-center justify-center"
                    style={{ height: DAY_SIZE }}
                  >
                    {band === 'none' ? null : (
                      <View
                        className="absolute inset-y-0 bg-brand-chipSurface"
                        style={BAND_STYLE[band]}
                      />
                    )}
                    <View
                      className={`items-center justify-center ${pill === 'none' ? '' : PILL_CLASS[pill]}`}
                      style={{ width: DAY_SIZE, height: DAY_SIZE }}
                    >
                      <Text
                        className={`font-sans text-paragraphMd ${
                          disabled
                            ? 'text-fg-muted'
                            : pill === 'none'
                              ? 'text-fg-secondary'
                              : 'text-fg-inverse'
                        }`}
                      >
                        {cell.day}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          ))}
        </View>
      </View>
    ),
    [handleSelectDay, maxDate, minDate, range, single],
  );

  return (
    <View className="w-full flex-1">
      {/* Cabeçalho da semana — fixo, fora da lista, pra não rolar junto com os meses.
          Usa as mesmas 7 colunas `flex-1` da grade, então cada letra cai exatamente
          sobre a sua coluna em qualquer largura de tela. */}
      <View className="w-full bg-surface-default pt-xxl">
        <View className="w-full flex-row border-b border-border-default px-xl pb-xs">
          {WEEKDAY_INITIALS.map((initial, index) => (
            <Text
              key={index}
              className="flex-1 text-center font-sans text-buttonLabel text-fg-muted"
            >
              {initial}
            </Text>
          ))}
        </View>
      </View>

      <FlatList
        ref={listRef}
        testID="calendar-months"
        data={months}
        keyExtractor={(item) => `${item.year}-${item.month}`}
        renderItem={renderMonth}
        getItemLayout={(_, index) => ({
          length: monthHeight(months[index].weeks.length),
          offset: offsets[index],
          index,
        })}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: LIST_PADDING }}
      />
    </View>
  );
};
