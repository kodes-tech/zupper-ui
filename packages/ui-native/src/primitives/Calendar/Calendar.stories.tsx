import React, { useState } from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { AppHeader } from '../AppHeader';
import { CalendarYearSelect } from '../CalendarYearSelect';
import { Calendar } from './Calendar';
import type { DateRange } from './date-utils';

const MIN = '2026-05-15';
const MAX = '2027-04-30';

export default {
  title: 'Primitives/Calendar',
  component: Calendar,
  args: { onChange: action('onChange'), onYearChange: action('onYearChange') },
  // Altura fixa: o Calendar rola por dentro, então precisa de um pai com altura.
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 390, height: 640, backgroundColor: '#F5F5F5' }}>
        <Story />
      </View>
    ),
  ],
};

/** Ida e Volta — período já fechado, como no Figma (24 → 26 de maio). */
export const Periodo = {
  args: {
    mode: 'range' as const,
    value: { start: '2026-05-24', end: '2026-05-26' },
    minDate: MIN,
    maxDate: MAX,
  },
};

/** Período pela metade: só a ida escolhida, esperando a volta. */
export const PeriodoIncompleto = {
  args: {
    mode: 'range' as const,
    value: { start: '2026-05-24', end: null },
    minDate: MIN,
    maxDate: MAX,
  },
};

/** Só ida / trecho de Multidestinos — uma data e pronto. */
export const DataUnica = {
  args: { value: '2026-05-24', minDate: MIN, maxDate: MAX },
};

/** Nada escolhido — dias antes de `minDate` saem desabilitados. */
export const Vazio = {
  args: { mode: 'range' as const, value: { start: null, end: null }, minDate: MIN, maxDate: MAX },
};

/**
 * Casca controlada — o `Calendar` não guarda seleção, então a story precisa
 * segurar o estado pra dar pra brincar com a regra de seleção no preview.
 */
const CalendarControlado = (): React.ReactElement => {
  const [value, setValue] = useState<DateRange>({ start: null, end: null });
  return (
    <Calendar
      mode="range"
      value={value}
      minDate={MIN}
      maxDate={MAX}
      onChange={(next) => {
        action('onChange')(next);
        setValue(next);
      }}
    />
  );
};

/** Interativo: mostra a regra de seleção do Figma valendo de verdade. */
export const Interativo = { render: () => <CalendarControlado /> };

/**
 * Fiação dos dois primitivos — é a parte não-óbvia da API: o dropdown de ano não
 * mora dentro da grade, ele vai no slot `right` do `AppHeader`, e os dois se
 * ligam por `year`/`onYearChange` nos dois sentidos (escolher um ano rola a
 * lista; rolar a lista atualiza o rótulo).
 *
 * Não é a tela de datas: o rodapé (campos Ida/Volta, "Viagem: N dias", Aplicar)
 * é composição do app e fica no `zupper-superapp` (ADR 0009 — o DS não tem
 * `screens/`). Aqui é só a bancada pra conferir o encaixe.
 */
const ComposicaoHeader = (): React.ReactElement => {
  const [periodo, setPeriodo] = useState<DateRange>({ start: '2026-05-24', end: '2026-05-26' });
  const [ano, setAno] = useState(2026);
  const [anoAberto, setAnoAberto] = useState(false);

  return (
    <>
      <AppHeader
        title="Selecionar data"
        onBack={action('onBack')}
        right={
          <CalendarYearSelect
            value={ano}
            years={[2026, 2027]}
            open={anoAberto}
            onToggle={() => setAnoAberto((aberto) => !aberto)}
            onSelect={(proximoAno) => {
              action('onSelect')(proximoAno);
              setAno(proximoAno);
              setAnoAberto(false);
            }}
          />
        }
      />
      <Calendar
        mode="range"
        value={periodo}
        minDate={MIN}
        maxDate={MAX}
        year={ano}
        onYearChange={setAno}
        onChange={(proximo) => {
          action('onChange')(proximo);
          setPeriodo(proximo);
        }}
      />
    </>
  );
};

/** Com o header: `AppHeader` + `CalendarYearSelect` + `Calendar` ligados. */
export const ComHeader = { render: () => <ComposicaoHeader /> };
