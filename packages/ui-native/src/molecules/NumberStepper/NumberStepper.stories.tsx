import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { NumberStepper } from './NumberStepper';

export default {
  title: 'Molecules/NumberStepper',
  component: NumberStepper,
  args: { label: 'Adultos', onDecrement: action('onDecrement'), onIncrement: action('onIncrement') },
  decorators: [(Story: React.ComponentType) => <View style={{ padding: 16 }}><Story /></View>],
};

export const Padrao = { args: { value: 2 } };
export const MinimoAtingido = { args: { value: 1, canDecrement: false } };
export const LotadoNoMaximo = { args: { value: 5, canIncrement: false } };
