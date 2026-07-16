import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { CancelOrder } from './CancelOrder';
import { CancelConfirmSheet } from '../../organisms/CancelConfirmSheet';
import { CancelSuccessSheet } from '../../organisms/CancelSuccessSheet';
import { CancelErrorSheet } from '../../organisms/CancelErrorSheet';

const destino = require('../../_figma/assets/photos/card-destino.jpg');

const foundOrder = {
  status: 'ongoing' as const,
  productIcon: 'order-flight' as const,
  productTitle: 'Voo Ida e Volta',
  orderNumber: '2151215',
  createdAtLabel: 'Criado em 12/05/22',
  trip: {
    destination: 'São Paulo - São José dos Campos',
    people: '1 viajante',
    dates: '25 Mar 2023 - 02 Abr 2023',
    imageUrl: destino,
  },
};

export default {
  title: 'Screens/CancelOrder',
  component: CancelOrder,
  args: {
    onBack: action('onBack'),
    onChangeOrderNumber: action('onChangeOrderNumber'),
    onPressCancel: action('onPressCancel'),
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

export const Vazio = {
  args: {},
};

export const PedidoEncontrado = {
  args: {
    orderNumberValue: '2151300',
    result: foundOrder,
    canSubmit: true,
  },
};

export const SheetConfirmacao = {
  args: {
    orderNumberValue: '2151300',
    result: foundOrder,
    canSubmit: true,
    overlay: (
      <CancelConfirmSheet
        onConfirm={action('onConfirm')}
        onGoBack={action('onGoBack')}
        onDismiss={action('onDismiss')}
      />
    ),
  },
};

export const SheetSucesso = {
  args: {
    orderNumberValue: '2151300',
    result: foundOrder,
    canSubmit: true,
    overlay: <CancelSuccessSheet onNewSearch={action('onNewSearch')} onDismiss={action('onDismiss')} />,
  },
};

export const SheetErro = {
  args: {
    orderNumberValue: '9999999',
    overlay: (
      <CancelErrorSheet
        onRetry={action('onRetry')}
        onContactSupport={action('onContactSupport')}
        onDismiss={action('onDismiss')}
      />
    ),
  },
};
