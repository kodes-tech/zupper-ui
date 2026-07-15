import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { PackagesSearch } from './PackagesSearch';

export default {
  title: 'Screens/PackagesSearch',
  component: PackagesSearch,
  args: {
    onBack: action('onBack'),
    onPressDestination: action('onPressDestination'),
    onPressOrigin: action('onPressOrigin'),
    onSwapEndpoints: action('onSwapEndpoints'),
    onPressCurrentLocation: action('onPressCurrentLocation'),
    onPressDates: action('onPressDates'),
    onPressTravelers: action('onPressTravelers'),
    onRegister: action('onRegister'),
    onSearch: action('onSearch'),
  },
  parameters: { layout: 'centered' },
  decorators: [
    (Story: React.ComponentType) => (
      <View
        style={{ width: 390, height: 844, borderRadius: 24, overflow: 'hidden', borderWidth: 8, borderColor: '#1a1a1a' }}
      >
        <Story />
      </View>
    ),
  ],
};

/** Estado inicial real do app: campos vazios, sem CTA de pesquisar. */
export const Vazio = {};

export const Preenchido = {
  args: {
    destination: 'Salvador, BA',
    origin: 'São Paulo, SP',
    dates: '20 Ago - 24 Ago',
    travelers: '2 Viajantes',
    canSearch: true,
  },
};

/** Usuário já logado: sem o CTA de cadastro no rodapé. */
export const Logado = {
  args: {
    destination: 'Salvador, BA',
    origin: 'São Paulo, SP',
    dates: '20 Ago - 24 Ago',
    travelers: '2 Viajantes',
    canSearch: true,
    isAuthenticated: true,
  },
};
