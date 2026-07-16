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
  baggage: [
    {
      icon: 'baggage-personal' as const,
      title: 'Inclui uma mochila ou bolsa',
      description: 'Tamanho limitado a caber abaixo do assento dianteiro.',
    },
    {
      icon: 'baggage-carry-on' as const,
      title: 'Inclui bagagem de mão',
      description: 'Tamanho limitado a caber no compartimento superior do avião. Até 10kg.',
    },
    {
      icon: 'baggage-none' as const,
      title: 'Não inclui bagagem para despachar',
      description: 'É possível alterar a tarifa incluindo nas opções ao lado.',
    },
  ],
};

const paymentDetails = [
  { label: 'Tarifa por adulto', value: 'R$ 856,12' },
  { label: '1 Adulto', value: 'R$ 856,12' },
  { label: 'Taxas e impostos', value: 'R$ 399,00' },
  { label: 'TOTAL A PAGAR', value: 'R$ 1.255,12', emphasized: true },
];

const paymentMethod = {
  methodLabel: 'PIX',
  rows: [
    { label: 'Pagamento via PIX', value: '1x de R$ 1.255,12' },
    { label: 'Pagar com', value: 'PIX' },
    { label: 'Via', value: 'Paymee' },
  ],
};

const travelers = [
  { role: 'Adulto 1', name: 'Maria Joaquina Silva, 30/11/1991' },
  { role: 'Adulto 2', name: 'Maria Joaquina Silva, 30/11/1991' },
];

const importantInfo = [
  'Alterações de nome não são permitidas. É possível que a companhia aérea faça a cobrança de taxas adicionais para bagagem despachada no aeroporto.',
  'Chegue ao aeroporto com antecedência mínima de 2 horas para voos nacionais.',
];

export default {
  title: 'Screens/OrderDetails',
  component: OrderDetails,
  args: {
    onBack: action('onBack'),
    onNavigate: action('onNavigate'),
    onPressCta: action('onPressCta'),
    onPressChangePayment: action('onPressChangePayment'),
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
  flights: [
    { ...flightBase, direction: 'ida', flexible: { cancelPolicy: 'Não permite cancelamento', farePolicy: 'Alterações a partir de R$ 478,00' } },
    { ...flightBase, direction: 'volta' },
  ],
  paymentDetails,
  paymentMethod,
  travelers,
  importantInfo,
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
  },
};

export const AguardandoPagamento = {
  args: {
    ...commonProps,
    status: 'ongoing',
    statusLabel: 'Aguardando pagamento',
    timelineSteps: [{ title: 'Pedido recebido', timestamp: '28/02/2023 às 15:55', tone: 'warning' }],
    pendingNotice: {
      title: 'Ainda não identificamos\no pagamento deste pedido.',
      description: 'Assim que o pagamento for confirmado, atualizaremos a situação do seu pedido automaticamente.',
    },
    ctaLabel: 'Pagar agora',
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
  },
};
