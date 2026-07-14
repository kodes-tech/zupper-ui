import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';

export type CalendarDayState = 'default' | 'start' | 'end' | 'in-range' | 'disabled';

export type CalendarDay = { day: number; state?: CalendarDayState } | null;

export type DateRangeCalendarProps = {
  title?: string;
  /** Ano exibido (ex.: "2026"); o seletor de ano abre externamente via `onPressYear`. */
  yearLabel: string;
  /** Mês exibido (ex.: "Julho, 2026"). */
  monthLabel: string;
  /** Semanas do mês — cada uma com 7 células; `null` = espaço em branco. */
  weeks: CalendarDay[][];
  isOneWayOnly?: boolean;
  departureLabel?: string;
  returnLabel?: string;
  departureValue?: string;
  returnValue?: string;
  /** Total de diárias (ex.: "10 diárias"); exibido só com as duas datas escolhidas. */
  nightsLabel?: string;
  confirmDisabled?: boolean;
  onSelectDay?: (day: number) => void;
  onPressYear?: () => void;
  onClearDeparture?: () => void;
  onClearReturn?: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
};

const WEEK_DAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const dayClassesByState: Record<CalendarDayState, string> = {
  default: 'text-fg-subtle',
  disabled: 'text-fg-muted',
  'in-range': 'text-fg-inverse',
  start: 'text-fg-inverse',
  end: 'text-fg-inverse',
};

const DayCell = ({ cell, onPress }: { cell: CalendarDay; onPress?: (day: number) => void }) => {
  if (!cell) return <View className="h-[34px] w-[38px]" />;
  const { day, state = 'default' } = cell;
  const isEdge = state === 'start' || state === 'end';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Dia ${day}`}
      accessibilityState={{ disabled: state === 'disabled' }}
      disabled={state === 'disabled'}
      onPress={() => onPress?.(day)}
      className={`h-[34px] w-[38px] items-center justify-center ${
        isEdge ? 'rounded-pill bg-brand-zupper' : state === 'in-range' ? 'bg-brand-base' : ''
      }`}
    >
      <Text className={`font-sans text-md font-medium ${dayClassesByState[state]}`}>{day}</Text>
    </Pressable>
  );
};

/** Campo de data do rodapé (Ida/Volta): valor com "limpar" quando preenchido. */
const DateField = ({
  label,
  value,
  onClear,
}: {
  label: string;
  value?: string;
  onClear?: () => void;
}) => (
  <View className="w-[49%] gap-xs py-lg">
    <Text className="font-sans text-md font-medium text-fg-subtle">{label}</Text>
    <View className="flex-row items-center justify-between rounded-md border border-border-subtle bg-surface-default px-md py-lg">
      <Text className="font-sans text-md font-medium capitalize text-fg-subtle">{value ?? '—'}</Text>
      {value ? (
        <Pressable accessibilityRole="button" accessibilityLabel={`Limpar ${label}`} onPress={onClear}>
          <Icon name="close" size={16} color={colors.text.body} />
        </Pressable>
      ) : null}
    </View>
  </View>
);

/**
 * DateRangeCalendar — o modal de calendário do motor de busca (voos e
 * hospedagens): ocupa a tela inteira, com o seletor de ano, o mês, a grade
 * de dias (início/fim na cor da marca, intervalo num tom mais claro,
 * indisponíveis em cinza) e o rodapé com os campos Ida/Volta e o confirmar.
 * A grade é montada por props (sem depender de uma lib de calendário) — o
 * app consumidor calcula os dias e os estados de cada célula. Reproduz
 * ModalCalendar do zupper-app.
 */
export const DateRangeCalendar = ({
  title = 'Selecionar data',
  yearLabel,
  monthLabel,
  weeks,
  isOneWayOnly = false,
  departureLabel = 'Ida',
  returnLabel = 'Volta',
  departureValue,
  returnValue,
  nightsLabel,
  confirmDisabled = false,
  onSelectDay,
  onPressYear,
  onClearDeparture,
  onClearReturn,
  onCancel,
  onConfirm,
}: DateRangeCalendarProps): React.ReactElement => (
  <View className="absolute inset-0 justify-between bg-surface-default pt-md">
    <View>
      <View className="items-center gap-xs px-md pb-xs">
        <View className="w-full flex-row items-center justify-between">
          <Pressable accessibilityRole="button" onPress={onPressYear} className="h-[40px] justify-end">
            <View className="flex-row items-center gap-xxs">
              <Text className="font-sans text-md font-medium text-fg-secondary">{yearLabel}</Text>
              <Icon name="dropdown-arrow" size={16} style={{ transform: [{ rotate: '90deg' }] }} />
            </View>
          </Pressable>
          <Text className="text-center font-sans text-lg font-bold text-fg-secondary">{title}</Text>
          <Pressable accessibilityRole="button" onPress={onCancel} className="w-[100px] items-end p-xs">
            <Text className="font-sans text-xs font-medium text-fg-link underline">Cancelar</Text>
          </Pressable>
        </View>
        <View className="w-full flex-row justify-around pt-xl">
          {WEEK_DAYS.map((label, index) => (
            <Text key={index} className="font-sans text-md font-bold text-fg-muted">
              {label}
            </Text>
          ))}
        </View>
      </View>

      <View className="gap-md px-md">
        {/* Cabeçalho do mês, alinhado à esquerda — renderizado pelo próprio
         * calendário no app (react-native-calendars), um por mês visível. */}
        <Text className="mt-lg font-sans text-md font-bold text-fg-secondary">{monthLabel}</Text>
        {weeks.map((week, weekIndex) => (
          <View key={weekIndex} className="flex-row justify-between">
            {week.map((cell, dayIndex) => (
              <DayCell key={dayIndex} cell={cell} onPress={onSelectDay} />
            ))}
          </View>
        ))}
      </View>
    </View>

    <View className="gap-md border-t-[3px] border-border-subtle px-xl py-xl">
      {!isOneWayOnly && departureValue && returnValue && nightsLabel ? (
        <Text className="font-sans text-lg font-bold text-brand-zupper">{nightsLabel}</Text>
      ) : null}
      <View className="flex-row justify-between">
        <DateField label={departureLabel} value={departureValue} onClear={onClearDeparture} />
        {!isOneWayOnly ? (
          <DateField label={returnLabel} value={returnValue} onClear={onClearReturn} />
        ) : null}
      </View>
      <Button
        label="Aplicar"
        variant="secondary"
        fullWidth
        disabled={confirmDisabled}
        onPress={onConfirm}
      />
    </View>
  </View>
);
