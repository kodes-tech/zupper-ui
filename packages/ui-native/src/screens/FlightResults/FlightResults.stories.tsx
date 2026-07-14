import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { FlightResults } from './FlightResults';
import type { FlightCardProps } from '../../organisms/FlightCard';

const outboundFlight: FlightCardProps = {
  airline: 'LATAM',
  origin: { code: 'GRU', city: 'São Paulo' },
  destination: { code: 'REC', city: 'Recife' },
  departureTime: '23:30',
  arrivalTime: '02:30',
  arrivalDayOffset: 1,
  duration: '3h00',
  baggage: { personalItem: true, checkedBaggage: false, carryOn: true },
  selected: true,
};

const returnFlight: FlightCardProps = {
  airline: 'Azul',
  origin: { code: 'REC', city: 'Recife' },
  destination: { code: 'CGH', city: 'São Paulo' },
  departureTime: '03:05',
  arrivalTime: '06:25',
  duration: '3h20',
  baggage: { personalItem: true, checkedBaggage: false, carryOn: true },
  selected: true,
};

export default {
  title: 'Screens/FlightResults',
  component: FlightResults,
  args: {
    originCode: 'SAO',
    destinationCode: 'REC',
    originLabel: 'Sao Paulo, SP',
    destinationLabel: 'Recife, PE',
    period: '15 de julho - 28 de julho',
    travelers: '1 Viajante',
    resultsCount: 127,
    sortFilter: 'cheapest',
    outboundDate: 'Qua, 15 De Julho 2026',
    outboundFlight,
    returnDate: 'Ter, 28 De Julho 2026',
    returnFlight,
    fareTitle: 'Melhor preço',
    showBestPriceBadge: true,
    fareRows: [
      { label: 'Tarifa por adulto', value: 'R$ 1.963,27', bold: true, withDivider: true },
      { label: '1 adulto', value: 'R$ 1.963,27' },
      { label: 'Taxas e impostos', value: 'R$ 199,49', withDivider: true },
      { label: 'TOTAL A PAGAR', value: 'R$ 2.162,76', bold: true },
    ],
    onBack: action('onBack'),
    onEdit: action('onEdit'),
    onShare: action('onShare'),
    onOpenFilters: action('onOpenFilters'),
    onChangeSort: action('onChangeSort'),
  },
  parameters: { layout: 'centered' },
  decorators: [
    (Story: React.ComponentType) => (
      <View
        style={{
          width: 390,
          height: 844,
          borderRadius: 24,
          overflow: 'hidden',
          borderWidth: 8,
          borderColor: '#1a1a1a',
        }}
      >
        <Story />
      </View>
    ),
  ],
};

/** Estado do screenshot: ida e volta com o melhor preço do grupo já selecionado. */
export const IdaEVolta = {};

export const SoIda = {
  args: {
    returnDate: undefined,
    returnFlight: undefined,
  },
};

export const VoosMaisRapidos = {
  args: {
    sortFilter: 'fastest',
  },
};
