import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { SliceDetails } from './SliceDetails';
import type { FlightSegmentDetailProps } from '../../organisms/FlightSegmentDetail';

const outbound: FlightSegmentDetailProps = {
  direction: 'ida',
  date: 'Quarta-feira, 15 de julho de 2026',
  airline: 'LATAM',
  flightNumber: 'LA3456',
  fareClass: 'Econômica',
  aircraftModel: 'Airbus A320',
  origin: {
    code: 'GRU',
    description: 'Aeroporto Internacional de Guarulhos',
    city: 'São Paulo, SP',
    weekday: 'Qua, 15 Jul',
    time: '23:30',
  },
  destination: {
    code: 'REC',
    description: 'Aeroporto Internacional do Recife',
    city: 'Recife, PE',
    weekday: 'Qui, 16 Jul',
    time: '02:30',
  },
  duration: '3h00',
  arrivalDayOffset: 1,
  stopsLabel: 'Direto',
  hasRefund: true,
  refundText: 'Permite cancelamento com reembolso de até 80%',
};

export default {
  title: 'Screens/SliceDetails',
  component: SliceDetails,
  args: {
    onBack: action('onBack'),
    onShare: action('onShare'),
    onPressCancellationPolicy: action('onPressCancellationPolicy'),
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

export const Direto = {
  args: {
    segments: [outbound],
    baggage: { schoolbag: true, suitcase: true, handbag: false },
  },
};

export const ComConexao = {
  args: {
    segments: [
      outbound,
      {
        ...outbound,
        origin: { ...outbound.destination, weekday: 'Qui, 16 Jul', time: '05:10' },
        destination: {
          code: 'GIG',
          description: 'Aeroporto Internacional do Galeão',
          city: 'Rio de Janeiro, RJ',
          weekday: 'Qui, 16 Jul',
          time: '06:40',
        },
        airline: 'Azul',
        flightNumber: 'AD4210',
        duration: '1h30',
        arrivalDayOffset: undefined,
        hasRefund: false,
      },
    ],
    connections: [{ waitTime: '2h15', destination: 'Recife', hasAircraftChange: true }],
    baggage: { schoolbag: true, suitcase: true, handbag: false },
  },
};

export const SemBagagemDespachada = {
  args: {
    segments: [outbound],
    baggage: { schoolbag: true, suitcase: false, handbag: false },
  },
};
