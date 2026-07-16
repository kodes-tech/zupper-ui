import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { OrderCard } from './OrderCard';

const destino = require('../../_figma/assets/photos/card-destino.jpg');

export default {
  title: 'Organisms/OrderCard',
  component: OrderCard,
  args: { onPressDetails: action('onPressDetails') },
  decorators: [(Story: React.ComponentType) => <View style={{ width: 335, padding: 16 }}><Story /></View>],
};

export const Emitido = {
  args: {
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
};

export const EmAndamento = {
  args: {
    status: 'ongoing',
    productIcon: 'order-flight',
    productTitle: 'Voo Ida e Volta',
    orderNumber: '2151215',
    createdAtLabel: 'Criado em 12/05/22',
    trip: {
      destination: 'São Paulo - São José dos Campos',
      people: '1 viajante',
      dates: '25 Mar 2023 - 02 Abr 2023',
      imageUrl: destino,
    },
  },
};

export const Cancelado = {
  args: {
    status: 'cancelled',
    productIcon: 'order-flight',
    productTitle: 'Voo Ida',
    orderNumber: '2151215',
    createdAtLabel: 'Criado em 12/05/22',
    trip: {
      destination: 'São Paulo - São José dos Campos',
      people: '4 viajantes',
      dates: '25 Mar 2023 - 02 Abr 2023',
      imageUrl: destino,
    },
  },
};

export const SemImagem = {
  args: {
    status: 'issued',
    productIcon: 'order-package',
    productTitle: 'Pacote de viagem',
    orderNumber: '2151300',
    createdAtLabel: 'Criado em 01/06/23',
    trip: {
      destination: 'Recife, Pernambuco',
      people: '2 adultos · 1 criança',
      dates: '12 jul - 19 jul',
    },
  },
};
