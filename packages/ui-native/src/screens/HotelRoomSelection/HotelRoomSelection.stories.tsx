import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { HotelRoomSelection } from './HotelRoomSelection';
import type { HotelRoomOptionData } from '../../organisms/HotelRoomCard';

const image = require('../../_figma/assets/photos/card-destino.jpg');

const options: HotelRoomOptionData[] = [
  {
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
  {
    id: 'r2',
    title: 'Quarto 2',
    rooms: [
      {
        name: 'Standard',
        description: 'Cama de casal, 20m²',
        cancellation: { text: 'Sem cancelamento grátis', tone: 'warning' },
      },
    ],
    checkIn: 'Ter, 10 Set - 14:00',
    checkOut: 'Sex, 20 Set - 12:00',
    guestsSummary: '1 quarto, 2 adultos',
    priceLabel: 'A partir de 10 noites + taxas',
    price: 'R$ 2.150',
    totalNote: 'Total de R$ 2.150 + taxas',
  },
];

export default {
  title: 'Screens/HotelRoomSelection',
  component: HotelRoomSelection,
  args: {
    hotelName: 'Hotel Boa Viagem Praia',
    options,
    onBack: action('onBack'),
    onSelectOption: action('onSelectOption'),
    onContinue: action('onContinue'),
  },
  parameters: { layout: 'centered' },
  decorators: [
    (Story: React.ComponentType) => (
      <View
        style={{ width: 390, height: 844, borderRadius: 24, overflow: 'hidden', borderWidth: 8, borderColor: '#1a1a1a' }}
      >
        <Story />
      </View>
    ),
  ],
};

/** Nenhuma opção selecionada — CTA desabilitado. */
export const NenhumSelecionado = {};

/** Uma opção selecionada — resumo e CTA habilitados. */
export const ComSelecao = {
  args: {
    options: options.map((option) => (option.id === 'r1' ? { ...option, selected: true } : option)),
    selectedSummary: { nightsLabel: '10 noites - Quarto 1', price: 'R$ 3.480' },
  },
};
