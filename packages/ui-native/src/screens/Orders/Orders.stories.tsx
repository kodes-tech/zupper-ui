import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { Orders } from './Orders';
import type { OrdersOrder } from './Orders';

const destino = require('../../_figma/assets/photos/card-destino.jpg');

const orders: OrdersOrder[] = [
  {
    id: '1',
    status: 'issued',
    productIcon: 'order-flight',
    productTitle: 'Voo Ida e Volta',
    orderNumber: '2151215',
    createdAtLabel: 'Criado em 12/05/22',
    trip: {
      destination: 'São Paulo - São José dos Campos',
      people: '2 viajantes',
      dates: '25 Mar 2023 - 02 Abr 2023',
      imageUrl: destino,
    },
    alert: 'Atenção! Taxa de serviço pendente',
  },
  {
    id: '2',
    status: 'ongoing',
    productIcon: 'order-flight',
    productTitle: 'Voo Ida e Volta',
    orderNumber: '2151216',
    createdAtLabel: 'Criado em 12/05/22',
    trip: {
      destination: 'São Paulo - São José dos Campos',
      people: '1 viajante',
      dates: '25 Mar 2023 - 02 Abr 2023',
      imageUrl: destino,
    },
  },
  {
    id: '3',
    status: 'cancelled',
    productIcon: 'order-flight',
    productTitle: 'Voo Ida',
    orderNumber: '2151217',
    createdAtLabel: 'Criado em 12/05/22',
    trip: {
      destination: 'São Paulo - São José dos Campos',
      people: '4 viajantes',
      dates: '25 Mar 2023 - 02 Abr 2023',
      imageUrl: destino,
    },
  },
];

export default {
  title: 'Screens/Orders',
  component: Orders,
  args: {
    onChangeFilter: action('onChangeFilter'),
    onSearch: action('onSearch'),
    onPressFilterButton: action('onPressFilterButton'),
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

export const Logado = {
  args: {
    filter: 'issued',
    orders: orders.filter((o) => o.status === 'issued'),
    resultsCount: orders.length,
  },
};

export const EmAndamento = {
  args: {
    filter: 'ongoing',
    orders: orders.filter((o) => o.status === 'ongoing'),
    resultsCount: orders.length,
  },
};

export const LogadoSemPedido = {
  args: {
    filter: 'issued',
    orders: [],
    emptyState: {
      message: 'Você ainda não possui pedidos',
      title: 'Aproveite para pesquisar\nsua viagem agora',
      ctaLabel: 'Pesquisar viagem agora',
      onPressCta: action('onPressCta'),
    },
  },
};

export const Deslogado = {
  args: {
    filter: 'issued',
    orders: [],
    emptyState: {
      message: 'Você ainda não possui pedidos',
      title: 'Faça login para acompanhar\nsuas reservas',
      ctaLabel: 'Fazer login',
      onPressCta: action('onPressCta'),
    },
  },
};
