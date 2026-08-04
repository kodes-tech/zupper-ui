import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { SearchInput, type SearchInputOption } from './SearchInput';

const DESTINATIONS: SearchInputOption[] = [
  { id: 'floripa', label: 'Florianópolis, SC' },
  { id: 'noronha', label: 'Fernando de Noronha, PE' },
  { id: 'recife', label: 'Recife, PE' },
  { id: 'gramado', label: 'Gramado, RS' },
];

export default {
  title: 'Primitives/SearchInput',
  component: SearchInput,
  args: {
    onChangeText: action('onChangeText'),
    onSelectOption: action('onSelectOption'),
    onPressSearch: action('onPressSearch'),
  },
  // minHeight dá espaço pro painel flutuante (top: 100%+) aparecer nas stories abertas.
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 390, minHeight: 320, padding: 16 }}>
        <Story />
      </View>
    ),
  ],
};

export const Fechado = { args: {} };

export const DigitandoComSugestoes = {
  args: { value: 'Fl', options: DESTINATIONS },
};

export const Vazio = {
  args: { value: 'Atlantida perdida', options: [] },
};
