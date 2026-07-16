import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { CheckoutContact } from './CheckoutContact';

export default {
  title: 'Screens/CheckoutContact',
  component: CheckoutContact,
  args: {
    currentStep: 1,
    totalSteps: 4,
    offerDuration: '14:38',
    route: 'GRU - REC',
    tripDate: '15 de julho',
    totalPrice: 'R$ 2.434,67',
    contactMethod: 'cellphone',
    phoneError: 'Campo obrigatório',
    onBack: action('onBack'),
    onChangeFullName: action('onChangeFullName'),
    onChangeEmail: action('onChangeEmail'),
    onChangeContactMethod: action('onChangeContactMethod'),
    onChangePhone: action('onChangePhone'),
    onToggleSmsOptIn: action('onToggleSmsOptIn'),
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

/** Estado do screenshot: campo de telefone vazio com erro de obrigatoriedade. */
export const Default = {};

export const Preenchido = {
  args: {
    fullName: 'Ana Silva',
    email: 'ana.silva@email.com',
    phone: '(11) 98888-7777',
    phoneError: undefined,
    smsOptIn: true,
  },
};

export const TelefoneFixo = {
  args: {
    contactMethod: 'phone',
    phoneError: undefined,
  },
};

export const SemContagem = {
  args: { offerDuration: undefined },
};
