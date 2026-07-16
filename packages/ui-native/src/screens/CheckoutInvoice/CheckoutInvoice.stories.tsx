import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { CheckoutInvoice } from './CheckoutInvoice';

export default {
  title: 'Screens/CheckoutInvoice',
  component: CheckoutInvoice,
  args: {
    currentStep: 4,
    totalSteps: 4,
    offerDuration: '14:38',
    route: 'GRU - REC',
    tripDate: '15 de julho',
    totalPrice: 'R$ 2.434,67',
    onBack: action('onBack'),
    onPressFinish: action('onPressFinish'),
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

export const PessoaFisica = {};

export const PessoaJuridica = {
  args: {
    document: { personType: 'CNPJ' },
  },
};
