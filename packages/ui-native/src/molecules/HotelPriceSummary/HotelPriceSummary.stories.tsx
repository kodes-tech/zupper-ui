import React from 'react';
import { View } from 'react-native';
import { HotelPriceSummary } from './HotelPriceSummary';

export default {
  title: 'Molecules/HotelPriceSummary',
  component: HotelPriceSummary,
  decorators: [(Story: React.ComponentType) => <View style={{ width: 320, padding: 16 }}><Story /></View>],
};

export const Padrao = {
  args: { label: 'A partir de 10 noites + taxas', price: 'R$ 3.480' },
};

export const Combo = {
  args: {
    label: 'A partir de 10 noites + taxas',
    price: 'R$ 3.480',
    note: '/ Média por quarto',
  },
};
