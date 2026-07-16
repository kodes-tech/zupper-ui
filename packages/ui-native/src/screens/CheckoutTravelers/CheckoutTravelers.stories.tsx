import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { CheckoutTravelers } from './CheckoutTravelers';
import type { Passenger } from './CheckoutTravelers';

const passengers: Passenger[] = [
  { id: 'adt-1', title: 'Adulto 1' },
  { id: 'adt-2', title: 'Adulto 2' },
  { id: 'chd-1', title: 'Criança 1' },
];

export default {
  title: 'Screens/CheckoutTravelers',
  component: CheckoutTravelers,
  args: {
    currentStep: 2,
    totalSteps: 4,
    offerDuration: '14:38',
    passengers,
    route: 'GRU - REC',
    tripDate: '15 de julho',
    totalPrice: 'R$ 2.434,67',
    onBack: action('onBack'),
    onToggleExpanded: action('onToggleExpanded'),
    onChangePassengerField: action('onChangePassengerField'),
    onPressNextStep: action('onPressNextStep'),
    onPressTripDetails: action('onPressTripDetails'),
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

export const Default = {};

export const PrimeiroRecolhido = {
  args: { expandedPassengerIds: ['adt-2', 'chd-1'] },
};
