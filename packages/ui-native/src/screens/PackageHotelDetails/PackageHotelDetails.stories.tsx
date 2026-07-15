import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { PackageHotelDetails } from './PackageHotelDetails';

const cardDestino = require('../../_figma/assets/photos/card-destino.jpg');

const quote =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dolor nibh, lacinia sed aliquam a, eleifend eget lorem.';

const segments = [
  {
    direction: 'ida' as const,
    originCode: 'FLN',
    destinationCode: 'CGH',
    airlineCode: 'G3',
    airlineIcon: 'airline-gol',
    stopsLabel: '3 paradas',
    departureTime: '11:30',
    arrivalTime: '13:20',
    date: '20 Ago 2024',
  },
  {
    direction: 'volta' as const,
    originCode: 'CGH',
    destinationCode: 'FLN',
    airlineCode: 'G3',
    airlineIcon: 'airline-gol',
    stopsLabel: 'Direto',
    departureTime: '11:30',
    arrivalTime: '13:20',
    date: '24 Ago 2024',
  },
];

export default {
  title: 'Screens/PackageHotelDetails',
  component: PackageHotelDetails,
  args: {
    name: 'Bourbon São Paulo Ibirapuera Convention',
    headerSubtitle: 'São Paulo, SP - Brasil',
    image: cardDestino,
    starRating: 4,
    checkIn: 'Qua, 20 Ago 2024',
    checkOut: 'Sáb, 24 Ago 2024',
    guestsSummary: '1 quarto, 2 adultos',
    breakfast: true,
    cancellation: { text: 'Cancelamento grátis', tone: 'success' },
    priceLabel: 'Preço para 3 diárias',
    price: 'R$ 1.234',
    address: 'Av. Ibirapuera, 2927 - Ibirapuera, São Paulo - SP',
    description:
      'Localizado no coração de São Paulo, o hotel oferece quartos confortáveis, café da manhã incluso e fácil acesso aos principais pontos turísticos da cidade.',
    amenities: [
      { label: '1 cama de casal grande', icon: 'amenity-bed' },
      { label: 'Tamanho 41m²', icon: 'amenity-size' },
      { label: 'Wi-Fi Grátis', icon: 'amenity-wifi' },
      { label: 'Café da manhã', icon: 'amenity-coffee' },
      { label: 'Ar-condicionado', icon: 'amenity-ac' },
      { label: 'Estacionamento', icon: 'amenity-parking' },
      { label: 'Restaurante', icon: 'amenity-restaurant' },
      { label: 'Piscina', icon: 'amenity-pool' },
      { label: 'Academia', icon: 'amenity-gym' },
      { label: 'Televisão', icon: 'amenity-tv' },
    ],
    nearbyPoints: [
      { name: 'Parque Ibirapuera', address: 'Av. Ibirapuera, 2927 - Ibirapuera', distance: '5km do Centro', hasMap: true },
      { name: 'Av. Paulista', address: 'Av. Paulista, 1000 - Bela Vista', distance: '8km do Centro', hasMap: true },
    ],
    reviews: {
      stars: 3,
      ratingLabel: 'Bom 7,0',
      categories: [
        { label: 'Comodidades', value: 7 },
        { label: 'Conforto', value: 7 },
        { label: 'Limpeza', value: 8 },
        { label: 'Localização', value: 9 },
        { label: 'Wi-Fi', value: 6 },
      ],
    },
    testimonials: [
      { id: '1', name: 'Jéssica M.', initials: 'JM', flag: '🇧🇷', quote },
      { id: '2', name: 'Carlos S.', initials: 'CS', flag: '🇧🇷', quote },
    ],
    footer: {
      roomInfo: 'Quarto Basic (2 Adultos)',
      segments,
      priceLabel: 'Pacote - 2 adultos (3 dias)',
      price: 'R$ 2.550',
      expanded: true,
    },
    onBack: action('onBack'),
    onShare: action('onShare'),
    onSeeAllAmenities: action('onSeeAllAmenities'),
    onSeeAllReviews: action('onSeeAllReviews'),
    onPressRelevantInfo: action('onPressRelevantInfo'),
    onPressPolicies: action('onPressPolicies'),
    onToggleFooter: action('onToggleFooter'),
    onEditPackage: action('onEditPackage'),
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

export const Default = {};

export const RodapeRecolhido = {
  args: {
    footer: {
      roomInfo: 'Quarto Basic (2 Adultos)',
      segments,
      priceLabel: 'Pacote - 2 adultos (3 dias)',
      price: 'R$ 2.550',
      expanded: false,
    },
  },
};
