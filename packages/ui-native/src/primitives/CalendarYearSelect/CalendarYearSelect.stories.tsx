import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { CalendarYearSelect } from './CalendarYearSelect';

export default {
  title: 'Primitives/CalendarYearSelect',
  component: CalendarYearSelect,
  args: { onToggle: action('onToggle'), onSelect: action('onSelect') },
  // Alinhado à direita e com folga embaixo: é assim que ele cai no slot `right`
  // do AppHeader, e a lista aberta precisa de espaço pra aparecer.
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 390, minHeight: 260, padding: 16, alignItems: 'flex-end' }}>
        <Story />
      </View>
    ),
  ],
};

export const Fechado = { args: { value: 2026, years: [2026, 2027, 2028] } };
export const Aberto = { args: { value: 2026, years: [2026, 2027, 2028], open: true } };
