import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { CheckoutPayment } from './CheckoutPayment';

export default {
  title: 'Screens/CheckoutPayment',
  component: CheckoutPayment,
  args: {
    currentStep: 3,
    totalSteps: 4,
    offerDuration: '14:38',
    route: 'GRU - REC',
    tripDate: '15 de julho',
    totalPrice: 'R$ 2.434,67',
    onBack: action('onBack'),
    onChangePaymentMethod: action('onChangePaymentMethod'),
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

export const NadaSelecionado = {};

export const CartaoDeCredito = {
  args: {
    paymentMethod: 'creditCard',
    creditCard: { installmentsLabel: '3x Sem juros' },
  },
};

export const Pix = {
  args: { paymentMethod: 'pix' },
};
