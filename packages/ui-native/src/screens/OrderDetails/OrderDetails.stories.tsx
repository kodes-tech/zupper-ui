import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { OrderDetails } from './OrderDetails';
import type { OrderDetailsProps } from './OrderDetails';

const destino = require('../../_figma/assets/photos/card-destino.jpg');

const flightBase = {
  dateLabel: 'Qua, 24 de maio 2024',
  airline: { name: 'Gol airlines', operatedByName: 'Latam Airlines' },
  flightNumber: 'LA522',
  flightClass: 'Econômica',
  aircraftModel: 'Boeing 747',
  departure: {
    time: '11:30',
    dateLabel: 'Qua, 24 maio',
    city: 'Florianópolis, SC',
    code: 'FLN',
    name: 'Aeroporto Internacional Hercílio Luz',
  },
  arrival: {
    time: '12:55',
    dateLabel: 'Qua, 24 maio',
    city: 'Congonhas, SP',
    code: 'CGH',
    name: 'Aeroporto Internacional de Congonhas',
  },
  duration: '1h50',
  locator: 'SWOK2A',
  eTicket: 'SWOK2A',
};

export default {
  title: 'Screens/OrderDetails',
  component: OrderDetails,
  args: {
    onBack: action('onBack'),
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

const commonProps: Partial<OrderDetailsProps> = {
  productIcon: 'order-flight',
  productTitle: 'Voo Ida e Volta',
  orderNumber: '2151215',
  createdAtLabel: 'Criado em 12/05/22',
  heroImage: destino,
  trip: {
    destination: 'São Paulo - São José dos Campos',
    people: '1 passageiro (1 Adulto)',
    dates: '25 Mar 2023 - 02 Abr 2023',
  },
};

export const PendenteDePagamento = {
  args: {
    ...commonProps,
    status: 'ongoing',
    timelineSteps: [
      { title: 'Pedido recebido', timestamp: '28/02/2023 às 15:55', tone: 'success' },
      { title: 'Pagamento aprovado', timestamp: '28/02/2023 às 15:55', tone: 'success' },
      { title: 'Emitido parcial', timestamp: '28/02/2023 às 15:55', tone: 'warning' },
    ],
    pendingNotice: {
      title: 'Seu trecho Congonhas - Florianópolis\nestá pendente.',
      description: 'Regularize o pagamento para seunome@dominio.com.br para garantir o trecho.',
    },
    alertNotice: 'Atenção! Altere a forma de pagamento dentro do prazo para garantir o trecho.',
    ctaLabel: 'Pagar trecho pendente',
    onPressCta: action('onPressCta'),
    changePaymentLabel: 'Alterar forma de pagamento',
    onPressChangePayment: action('onPressChangePayment'),
    flights: [
      { ...flightBase, direction: 'ida', flexible: { cancelPolicy: 'Não permite cancelamento', farePolicy: 'Alterações a partir de R$ 478,00' } },
      { ...flightBase, direction: 'volta' },
    ],
  },
};

export const Emitido = {
  args: {
    ...commonProps,
    status: 'issued',
    timelineSteps: [
      { title: 'Pedido recebido', timestamp: '28/02/2023 às 15:55', tone: 'success' },
      { title: 'Pagamento aprovado', timestamp: '28/02/2023 às 15:55', tone: 'success' },
      { title: 'Emitido', timestamp: '28/02/2023 às 16:10', tone: 'success' },
    ],
    flights: [{ ...flightBase, direction: 'ida' }, { ...flightBase, direction: 'volta' }],
  },
};
