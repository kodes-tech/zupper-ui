import React from 'react';
import { View } from 'react-native';
import { HotelDetailsCard } from './HotelDetailsCard';

const image = require('../../_figma/assets/photos/card-destino.jpg');

export default {
  title: 'Organisms/HotelDetailsCard',
  component: HotelDetailsCard,
  decorators: [(Story: React.ComponentType) => <View style={{ width: 390, padding: 16 }}><Story /></View>],
};

export const Padrao = {
  args: {
    name: 'Hotel Boa Viagem Praia',
    image,
    starRating: 4,
    checkIn: 'Ter, 10 Set - 14:00',
    checkOut: 'Sex, 20 Set - 12:00',
    guestsSummary: '1 quarto, 2 adultos',
    breakfast: true,
    cancellation: { text: 'Cancelamento grátis até 08/09', tone: 'success' },
    priceLabel: 'A partir de 10 noites + taxas',
    price: 'R$ 3.480',
  },
};
