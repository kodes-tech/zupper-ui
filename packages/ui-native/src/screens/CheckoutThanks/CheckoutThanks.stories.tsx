import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { CheckoutThanks } from './CheckoutThanks';

export default {
  title: 'Screens/CheckoutThanks',
  component: CheckoutThanks,
  args: {
    email: 'joao.silva@email.com',
    priceRows: [
      { label: 'Tarifa por adulto', value: 'R$ 2.165,79' },
      { label: '1 adulto', value: 'R$ 2.165,79' },
      { label: 'Taxas e impostos', value: 'R$ 94,19' },
      { label: 'TOTAL PAGO', value: 'R$ 2.259,98', bold: true },
    ],
    onPressAccount: action('onPressAccount'),
    onPressBackToHome: action('onPressBackToHome'),
    onPressReviewPayment: action('onPressReviewPayment'),
    onPressCopyPixCode: action('onPressCopyPixCode'),
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

export const PagamentoPendenteCartao = {
  args: {
    statusMessage: 'Falta pouco! Agora só falta finalizar o pagamento do seu pedido #48213.',
    emailExists: false,
    paymentMethod: 'creditCard',
    cardBrand: 'Visa',
    cardLastDigits: '4242',
    installmentCount: 3,
    hasFee: false,
    installmentValue: 'R$ 753,33',
    extraInstallmentsValue: 'R$ 753,32',
  },
};

export const EmAprovacaoPix = {
  args: {
    statusMessage: 'Parabéns! O seu pedido #48213 está em processo de aprovação.',
    emailExists: true,
    paymentMethod: 'pix',
    pixValue: 'R$ 2.259,98',
  },
};

export const TaxaPendente = {
  args: {
    statusMessage: 'Falta pouco! Agora só falta finalizar o pagamento da taxa pendente do seu pedido #48213.',
    emailExists: true,
    paymentMethod: 'creditCard',
    cardBrand: 'Mastercard',
    cardLastDigits: '1881',
    installmentCount: 1,
    installmentValue: 'R$ 2.259,98',
  },
};

export const ErroAoProcessarCartao = {
  args: {
    status: 'error',
    statusMessage: 'Infelizmente algo deu errado na reserva do seu pedido #48213.',
    paymentMethod: 'creditCard',
    cardBrand: 'Visa',
    cardLastDigits: '4242',
    installmentCount: 1,
    installmentValue: 'R$ 2.259,98',
  },
};

export const ErroAoProcessarPix = {
  args: {
    status: 'error',
    statusMessage: 'Infelizmente algo deu errado na reserva do seu pedido #48213.',
    paymentMethod: 'pix',
    pixValue: 'R$ 2.259,98',
  },
};
