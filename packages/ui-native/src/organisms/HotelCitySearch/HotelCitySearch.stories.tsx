import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { HotelCitySearch } from './HotelCitySearch';

export default {
  title: 'Organisms/HotelCitySearch',
  component: HotelCitySearch,
  args: {
    onChangeQuery: action('onChangeQuery'),
    onSelectCity: action('onSelectCity'),
    onClose: action('onClose'),
  },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 390, height: 600, position: 'relative' }}>
        <Story />
      </View>
    ),
  ],
};

export const Padrao = {
  args: {
    query: 'Recife',
    cities: [
      { id: '1', label: 'Recife, PE - Brasil' },
      { id: '2', label: 'Recife (Todos os aeroportos), PE - Brasil' },
      { id: '3', label: 'Recife Antigo, PE - Brasil' },
    ],
  },
};

export const SemResultados = {
  args: { query: 'zzz', cities: [] },
};
