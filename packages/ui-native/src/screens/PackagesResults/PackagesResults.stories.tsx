import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { PackagesResults } from './PackagesResults';

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

const featured = {
  hotelName: 'Hotel Bourbon São Paulo Convention',
  roomInfo: 'Quarto Basic (2 Adultos)',
  segments,
  priceLabel: 'Preço total do pacote',
  price: 'R$ 255,00',
  primaryCtaLabel: 'Gostei! Quero este pacote',
  secondaryCtaLabel: 'Montar meu pacote',
};

const others = [
  { ...featured, primaryCtaLabel: 'Escolher pacote Zupper', secondaryCtaLabel: undefined },
  { ...featured, primaryCtaLabel: 'Escolher pacote Zupper', secondaryCtaLabel: undefined },
  { ...featured, primaryCtaLabel: 'Escolher pacote Zupper', secondaryCtaLabel: undefined },
];

export default {
  title: 'Screens/PackagesResults',
  component: PackagesResults,
  args: {
    routeLabel: 'FLN - CGH',
    routeDetails: 'Florianópolis, SC - São Paulo, SP',
    searchSummary: '24 de Maio - 26 de Maio - 1 viajante',
    totalResults: 10,
    featured,
    others,
    onBack: action('onBack'),
    onEditSearch: action('onEditSearch'),
    onShare: action('onShare'),
    onOpenFilters: action('onOpenFilters'),
    onChangeSort: action('onChangeSort'),
    onSelectFeatured: action('onSelectFeatured'),
    onCustomizeFeatured: action('onCustomizeFeatured'),
    onSelectPackage: action('onSelectPackage'),
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

export const SemOutrosPacotes = {
  args: { others: [] },
};
