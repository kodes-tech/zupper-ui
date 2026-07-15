import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { PackageSummaryFooter } from './PackageSummaryFooter';

const segments = [
  {
    direction: 'ida' as const,
    originCode: 'FLN',
    destinationCode: 'CGH',
    airlineCode: 'G3',
    airlineIcon: 'airline-gol',
    airlineColor: '#F97316',
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
    airlineColor: '#F97316',
    stopsLabel: 'Direto',
    departureTime: '11:30',
    arrivalTime: '13:20',
    date: '24 Ago 2024',
  },
];

export default {
  title: 'Organisms/PackageSummaryFooter',
  component: PackageSummaryFooter,
  args: {
    hotelName: 'Bourbon São Paulo Ibirapuera Con.',
    roomInfo: 'Quarto Basic (2 Adultos)',
    segments,
    priceLabel: 'Pacote - 2 adultos (3 dias)',
    price: 'R$ 255,00',
    onToggle: action('onToggle'),
    onEdit: action('onEdit'),
    onContinue: action('onContinue'),
  },
  parameters: { layout: 'centered' },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 375 }}>
        <Story />
      </View>
    ),
  ],
};

export const Expandido = { args: { expanded: true } };

export const Recolhido = { args: { expanded: false } };
