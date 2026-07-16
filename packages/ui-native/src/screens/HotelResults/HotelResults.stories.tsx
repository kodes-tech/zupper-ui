import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { HotelResults } from './HotelResults';
import type { HotelCardData } from '../../organisms/HotelCard';

const image = require('../../_figma/assets/photos/card-destino.jpg');

const hotels: HotelCardData[] = [
  {
    name: 'Hotel Boa Viagem Praia',
    image,
    starRating: 4,
    address: 'Av. Boa Viagem, 1500 - Recife, PE',
    hasMap: true,
    breakfast: true,
    cancellation: { text: 'Cancelamento grátis até 08/09', tone: 'success' },
    amenities: ['Wi-Fi', 'Piscina', 'Estacionamento'],
    priceLabel: 'Preço para 10 diárias',
    price: 'R$ 3.480',
    taxNote: 'Taxas incluídas',
    installments: 'em até 10x',
  },
  {
    name: 'Pousada Recife Antigo',
    starRating: 3,
    address: 'Rua do Bom Jesus, 120 - Recife, PE',
    cancellation: { text: 'Sem cancelamento grátis', tone: 'warning' },
    amenities: ['Wi-Fi', 'Café da manhã'],
    priceLabel: 'Preço para 10 diárias',
    price: 'R$ 2.150',
    taxNote: 'Taxas incluídas',
    installments: 'em até 6x',
  },
];

export default {
  title: 'Screens/HotelResults',
  component: HotelResults,
  args: {
    destination: 'Recife - PE',
    searchDetails: '10 set - 20 set · 2 hóspedes',
    totalResults: 128,
    hotels,
    sort: 'recomendados',
    onBack: action('onBack'),
    onEditSearch: action('onEditSearch'),
    onOpenFilters: action('onOpenFilters'),
    onChangeSort: action('onChangeSort'),
    onSelectHotel: action('onSelectHotel'),
    onSeeMap: action('onSeeMap'),
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

export const Padrao = {};
