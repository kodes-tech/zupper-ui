import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { TravelHome } from './TravelHome';

export default {
  title: 'Screens/TravelHome',
  component: TravelHome,
  args: {
    active: 'inicio',
    onSelectProductTab: action('onSelectProductTab'),
    onChangeTripType: action('onChangeTripType'),
    onPressOrigin: action('onPressOrigin'),
    onPressDestination: action('onPressDestination'),
    onSwapEndpoints: action('onSwapEndpoints'),
    onPressDates: action('onPressDates'),
    onPressTravelers: action('onPressTravelers'),
    onSearch: action('onSearch'),
    onNavigate: action('onNavigate'),
  },
  parameters: { layout: 'centered' },
  decorators: [
    (Story: React.ComponentType) => (
      <View
        style={{
          width: 390,
          height: 844,
          borderRadius: 24,
          overflow: 'hidden',
          borderWidth: 8,
          borderColor: '#1a1a1a',
        }}
      >
        <Story />
      </View>
    ),
  ],
};

/** Estado inicial real do app: campos vazios, 1 adulto/econômica, CTA desabilitado. */
export const Vazio = {};

export const Preenchido = {
  args: {
    origin: { city: 'São Paulo, SP', airport: 'GRU - Aeroporto de Guarulhos, SP' },
    destination: { city: 'Recife, PE', airport: 'REC - Aeroporto Internacional do Recife, PE' },
    dates: '10 Set 26 - 20 Set 26',
    travelers: '2 Viajantes, econômica',
    canSearch: true,
  },
};

export const SoIda = {
  args: {
    tripType: 'soIda',
  },
};
