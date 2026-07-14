import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { HotelDetails } from './HotelDetails';

const image = require('../../_figma/assets/photos/card-destino.jpg');

export default {
  title: 'Screens/HotelDetails',
  component: HotelDetails,
  args: {
    destination: 'Recife - PE',
    searchDetails: '10 set - 20 set · 2 hóspedes',
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
    address: 'Av. Boa Viagem, 1500 - Recife, PE',
    description:
      'Localizado de frente para a praia de Boa Viagem, o hotel oferece vista para o mar, piscina e fácil acesso aos principais pontos turísticos do Recife.',
    amenities: ['Wi-Fi', 'Piscina', 'Estacionamento', 'Ar-condicionado', 'Academia'],
    nearbyPoints: [
      { name: 'Praia de Boa Viagem', distance: '0.2 km' },
      { name: 'Marco Zero', distance: '5.4 km' },
    ],
    onBack: action('onBack'),
    onEditSearch: action('onEditSearch'),
    onSeeAllAmenities: action('onSeeAllAmenities'),
    onSelectRooms: action('onSelectRooms'),
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

/** Sem imagem, sem pontos de interesse — o bloco "O que tem por perto" some. */
export const SemImagemNemPerto = {
  args: {
    image: undefined,
    cancellation: { text: 'Sem cancelamento grátis', tone: 'warning' },
    breakfast: false,
    nearbyPoints: [],
  },
};
