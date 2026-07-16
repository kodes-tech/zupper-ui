import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { AirSearch } from './AirSearch';

export default {
  title: 'Screens/AirSearch',
  component: AirSearch,
  args: {
    onBack: action('onBack'),
    onPressOrigin: action('onPressOrigin'),
    onPressDestination: action('onPressDestination'),
    onSwapEndpoints: action('onSwapEndpoints'),
    onPressDates: action('onPressDates'),
    onPressTravelers: action('onPressTravelers'),
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

export const Vazio = {};

export const Preenchido = {
  args: {
    origin: { city: 'São Paulo, SP', airport: 'GRU - Aeroporto Internacional de Guarulhos' },
    destination: { city: 'Recife, PE', airport: 'REC - Aeroporto Internacional do Recife' },
    dates: '10 Set 26 - 20 Set 26',
    travelers: '2 Viajantes, econômica',
    canSearch: true,
  },
};
