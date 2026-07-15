import React from 'react';
import { View } from 'react-native';
import { RangeSlider } from './RangeSlider';

export default {
  title: 'Molecules/RangeSlider',
  component: RangeSlider,
  parameters: { layout: 'centered' },
  decorators: [(Story: React.ComponentType) => <View style={{ width: 327 }}><Story /></View>],
};

export const Preco = {
  args: { min: 0, max: 2000, values: [300, 1400], formatLabel: (v: number) => `R$ ${v}` },
};
export const Duracao = {
  args: { min: 1, max: 12, values: [2, 8], formatLabel: (v: number) => `${v}h` },
};
