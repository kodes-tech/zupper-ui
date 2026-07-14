import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { SelectField } from './SelectField';

export default {
  title: 'Molecules/SelectField',
  component: SelectField,
  args: { onPress: action('onPress') },
  decorators: [(Story: React.ComponentType) => <View style={{ width: 390, padding: 16 }}><Story /></View>],
};

export const Selecionado = { args: { value: 'Recife, PE' } };
export const Vazio = { args: { placeholder: 'Selecione o destino' } };
