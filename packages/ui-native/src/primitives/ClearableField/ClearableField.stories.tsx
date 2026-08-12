import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { ClearableField } from './ClearableField';

export default {
  title: 'Primitives/ClearableField',
  component: ClearableField,
  args: { onPress: action('onPress'), onClear: action('onClear') },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 390, padding: 16 }}>
        <Story />
      </View>
    ),
  ],
};

export const ComValor = { args: { label: 'Ida', value: 'Qua, 24 Maio' } };
export const Vazio = { args: { label: 'Volta', placeholder: 'Escolha a volta' } };
export const Desabilitado = { args: { label: 'Volta', value: 'Sex, 26 Maio', disabled: true } };

/** Lado a lado, como no rodapé da seleção de datas — cada campo ocupa metade. */
export const ParIdaVolta = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16 }}>
      <ClearableField
        label="Ida"
        value="Qua, 24 Maio"
        onPress={action('onPress')}
        onClear={action('onClear')}
      />
      <ClearableField
        label="Volta"
        value="Sex, 26 Maio"
        onPress={action('onPress')}
        onClear={action('onClear')}
      />
    </View>
  ),
};
