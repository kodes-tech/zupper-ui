import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { SelectField, type SelectOption } from './SelectField';

const CITIES: SelectOption[] = [
  { id: 'sp', label: 'São Paulo (Cidade de residência)' },
  { id: 'floripa', label: 'Florianópolis, SC' },
  { id: 'noronha', label: 'Fernando de Noronha, PE' },
  { id: 'recife', label: 'Recife, PE' },
  { id: 'gramado', label: 'Gramado, RS' },
  { id: 'bonito', label: 'Bonito, MS' },
];

export default {
  title: 'Primitives/SelectField',
  component: SelectField,
  args: { onPress: action('onPress'), onSelectOption: action('onSelectOption') },
  // minHeight dá espaço pro overlay flutuante (top: 100%) aparecer na story aberta.
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 390, minHeight: 320, padding: 16 }}>
        <Story />
      </View>
    ),
  ],
};

export const Vazio = { args: { placeholder: 'Selecione a cidade' } };
export const Selecionado = { args: { value: 'Recife, PE' } };
export const Aberto = {
  args: { placeholder: 'Selecione a cidade', open: true, options: CITIES },
};
