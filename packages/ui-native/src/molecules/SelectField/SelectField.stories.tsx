import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { SelectField } from './SelectField';

const destinations = [
  { id: 'sao-paulo', label: 'São Paulo (Cidade de residência)' },
  { id: 'florianopolis', label: 'Florianópolis, SC' },
  { id: 'noronha', label: 'Fernando de Noronha, PE' },
  { id: 'recife', label: 'Recife, PE' },
];

export default {
  title: 'Molecules/SelectField',
  component: SelectField,
  args: { onPress: action('onPress'), onSelectOption: action('onSelectOption') },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 390, padding: 16 }}>
        <Story />
      </View>
    ),
  ],
};

// As três variantes do `dropdown` no Figma: default / selected / open.
export const Vazio = { args: { placeholder: 'Selecione o destino' } };
export const Selecionado = { args: { value: 'Recife, PE' } };
export const Aberto = {
  args: { placeholder: 'Selecione a cidade', open: true, options: destinations },
};
