import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { DateRangeCalendar } from './DateRangeCalendar';
import type { CalendarDay } from './DateRangeCalendar';

// Julho/2026: dia 1 é quarta (índice 3). Semanas de exemplo com um intervalo
// selecionado (10 a 20) e alguns dias indisponíveis (antes de hoje).
const weeks: CalendarDay[][] = [
  [null, null, null, { day: 1, state: 'disabled' }, { day: 2, state: 'disabled' }, { day: 3, state: 'disabled' }, { day: 4, state: 'disabled' }],
  [
    { day: 5, state: 'disabled' }, { day: 6, state: 'disabled' }, { day: 7, state: 'disabled' },
    { day: 8, state: 'disabled' }, { day: 9, state: 'disabled' }, { day: 10, state: 'start' }, { day: 11, state: 'in-range' },
  ],
  [
    { day: 12, state: 'in-range' }, { day: 13, state: 'in-range' }, { day: 14, state: 'in-range' },
    { day: 15, state: 'in-range' }, { day: 16, state: 'in-range' }, { day: 17, state: 'in-range' }, { day: 18, state: 'in-range' },
  ],
  [
    { day: 19, state: 'in-range' }, { day: 20, state: 'end' }, { day: 21 }, { day: 22 }, { day: 23 }, { day: 24 }, { day: 25 },
  ],
  [{ day: 26 }, { day: 27 }, { day: 28 }, { day: 29 }, { day: 30 }, { day: 31 }, null],
];

export default {
  title: 'Organisms/DateRangeCalendar',
  component: DateRangeCalendar,
  args: {
    yearLabel: '2026',
    monthLabel: 'Julho, 2026',
    weeks,
    onSelectDay: action('onSelectDay'),
    onPressYear: action('onPressYear'),
    onClearDeparture: action('onClearDeparture'),
    onClearReturn: action('onClearReturn'),
    onCancel: action('onCancel'),
    onConfirm: action('onConfirm'),
  },
  parameters: { layout: 'centered' },
  decorators: [
    (Story: React.ComponentType) => (
      <View
        style={{ width: 390, height: 844, borderRadius: 24, overflow: 'hidden', borderWidth: 8, borderColor: '#1a1a1a', position: 'relative' }}
      >
        <Story />
      </View>
    ),
  ],
};

export const IntervaloSelecionado = {
  args: {
    departureValue: 'Sex, 10 Julho',
    returnValue: 'Seg, 20 Julho',
    nightsLabel: '10 diárias',
  },
};

export const SemSelecao = {
  args: { confirmDisabled: true },
};

/** Só ida (hospedagem/voo só ida) — sem o segundo campo nem o resumo de diárias. */
export const SoIda = {
  args: { isOneWayOnly: true, departureValue: 'Sex, 10 Julho' },
};
