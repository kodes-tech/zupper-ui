import React, { useState } from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
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
