import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { PackageResultCard } from './PackageResultCard';

const segments = [
  {
    direction: 'ida' as const,
    originCode: 'FLN',
    destinationCode: 'CGH',
    airlineCode: 'G3',
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
    stopsLabel: 'Direto',
    departureTime: '11:30',
    arrivalTime: '13:20',
    date: '24 Ago 2024',
  },
];

export default {
  title: 'Organisms/PackageResultCard',
  component: PackageResultCard,
  args: {
    onPressPrimary: action('onPressPrimary'),
    onPressSecondary: action('onPressSecondary'),
  },
  parameters: { layout: 'centered' },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 351 }}>
        <Story />
      </View>
    ),
  ],
};

export const Destaque = {
  args: {
    featured: true,
    data: {
      hotelName: 'Hotel Bourbon São Paulo Convention',
      roomInfo: 'Quarto Basic (2 Adultos)',
      segments,
      priceLabel: 'Preço total do pacote',
      price: 'R$ 255,00',
      primaryCtaLabel: 'Gostei! Quero este pacote',
      secondaryCtaLabel: 'Montar meu pacote',
    },
  },
};

export const Padrao = {
  args: {
    data: {
      hotelName: 'Hotel Bourbon São Paulo Convention',
      roomInfo: 'Quarto Basic (2 Adultos)',
      segments,
      priceLabel: 'Preço total do pacote',
      price: 'R$ 255,00',
      primaryCtaLabel: 'Escolher pacote Zupper',
    },
  },
};
