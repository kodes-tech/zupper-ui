import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { HotelRoomCard } from './HotelRoomCard';

const image = require('../../_figma/assets/photos/card-destino.jpg');

export default {
  title: 'Organisms/HotelRoomCard',
  component: HotelRoomCard,
  args: { onSelect: action('onSelect') },
  decorators: [(Story: React.ComponentType) => <View style={{ width: 390 }}><Story /></View>],
};

export const NaoSelecionado = {
  args: {
    option: {
      id: 'r1',
      title: 'Quarto 1',
      rooms: [
        {
          name: 'Superior Vista Mar',
          image,
          description: 'Cama king, 28m², vista para o mar',
          cancellation: { text: 'Cancelamento grátis até 08/09', tone: 'success' },
          amenities: ['Wi-Fi', 'Ar-condicionado', 'Frigobar'],
        },
      ],
      checkIn: 'Ter, 10 Set - 14:00',
      checkOut: 'Sex, 20 Set - 12:00',
      guestsSummary: '1 quarto, 2 adultos',
      priceLabel: 'A partir de 10 noites + taxas',
      price: 'R$ 3.480',
      totalNote: 'Total de R$ 3.480 + taxas',
    },
  },
};

export const Selecionado = {
  args: {
    ...NaoSelecionado.args,
    option: { ...NaoSelecionado.args.option, selected: true },
  },
};

/** Combo — mais de um quarto físico na mesma opção. */
export const Combo = {
  args: {
    kind: 'combo',
    option: {
      id: 'c1',
      title: 'Combo 1 - 2 Quartos',
      rooms: [
        {
          name: 'Standard',
          description: 'Cama de casal, 20m²',
          cancellation: { text: 'Sem cancelamento grátis', tone: 'warning' },
        },
        {
          name: 'Standard',
          description: 'Cama de casal, 20m²',
          cancellation: { text: 'Sem cancelamento grátis', tone: 'warning' },
        },
      ],
      checkIn: 'Ter, 10 Set - 14:00',
      checkOut: 'Sex, 20 Set - 12:00',
      guestsSummary: '2 quartos, 4 adultos',
      priceLabel: 'A partir de 10 noites + taxas',
      price: 'R$ 5.200',
      totalNote: 'Total de R$ 5.200 + taxas',
    },
  },
};
