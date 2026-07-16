import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { FlightResults } from './FlightResults';
import type { FlightCardProps } from '../../organisms/FlightCard';
import type { FareFamily } from '../../organisms/FareFamilySelection';

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

const fareFamilies: FareFamily[] = [
  {
    id: 'light',
    title: 'LIGHT',
    price: 'R$ 2.259,98',
    headerColor: '#769d28',
    benefits: [
      { label: 'Bagagem', included: false },
      { label: 'Marcação de Assento', included: false },
      { label: 'Reembolso', included: false },
    ],
  },
  {
    id: 'standard',
    title: 'STANDARD',
    price: '+ R$ 200,95',
    headerColor: '#008d87',
    benefits: [
      { label: 'Bagagem (01 peça)', included: true },
      { label: 'Marcação de Assento', included: false },
      { label: 'Reembolso', included: false },
    ],
  },
  {
    id: 'full',
    title: 'FULL',
    price: '+ R$ 309,00',
    headerColor: '#ba19a1',
    benefits: [
      { label: 'Bagagem (01 peça)', included: true },
      { label: 'Marcação de Assento', included: true },
      { label: 'Reembolso Integral', included: true },
    ],
  },
  {
    id: 'premium-economy',
    title: 'PREMIUM ECONOMY',
    price: '+ R$ 337,92',
    headerColor: '#008d87',
    benefits: [
      { label: 'Bagagem (01 peça)', included: true },
      { label: 'Marcação de Assento', included: true },
      { label: 'Reembolso Integral', included: true },
    ],
  },
];

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
    fareFamilies,
    selectedFareFamilyId: 'light',
    fareTitle: 'Sua compra',
    showBestPriceBadge: false,
    fareRows: [
      { label: 'Tarifa por adulto', value: 'R$ 2.165,79', bold: true, withDivider: true },
      { label: '1 adulto', value: 'R$ 2.165,79' },
      { label: 'Taxas e impostos', value: 'R$ 94,19', withDivider: true },
      { label: 'TOTAL A PAGAR', value: 'R$ 2.259,98', bold: true },
    ],
    onBack: action('onBack'),
    onEdit: action('onEdit'),
    onShare: action('onShare'),
    onOpenFilters: action('onOpenFilters'),
    onChangeSort: action('onChangeSort'),
    onSelectFareFamily: action('onSelectFareFamily'),
    onPressFareDetails: action('onPressFareDetails'),
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

/** Estado do screenshot: ida e volta, LIGHT selecionada na grade de tarifas. */
export const IdaEVolta = {};

export const FamiliaStandardSelecionada = {
  args: {
    selectedFareFamilyId: 'standard',
    fareTitle: 'Melhor preço',
    showBestPriceBadge: true,
    fareRows: [
      { label: 'Tarifa por adulto', value: 'R$ 2.366,74', bold: true, withDivider: true },
      { label: '1 adulto', value: 'R$ 2.366,74' },
      { label: 'Taxas e impostos', value: 'R$ 94,19', withDivider: true },
      { label: 'TOTAL A PAGAR', value: 'R$ 2.460,93', bold: true },
    ],
  },
};

/** Sem famílias tarifárias (ex.: cia sem tarifas segmentadas) — seção some. */
export const SemFamiliaTarifaria = {
  args: {
    fareFamilies: undefined,
    selectedFareFamilyId: undefined,
  },
};

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
