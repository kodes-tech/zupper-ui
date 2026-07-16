import React from 'react';
import { View } from 'react-native';
import { FlightLegCard } from './FlightLegCard';

export default {
  title: 'Organisms/FlightLegCard',
  component: FlightLegCard,
  decorators: [(Story: React.ComponentType) => <View style={{ width: 375, padding: 16 }}><Story /></View>],
};

const base = {
  dateLabel: 'Qua, 24 de maio 2024',
  airline: {
    name: 'Gol airlines',
    operatedByName: 'Latam Airlines',
  },
  flightNumber: 'LA522',
  flightClass: 'Econômica',
  aircraftModel: 'Boeing 747',
  departure: { time: '11:30', dateLabel: 'Qua, 24 maio', city: 'Florianópolis, SC', code: 'FLN', name: 'Aeroporto Internacional Hercílio Luz' },
  arrival: { time: '12:55', dateLabel: 'Qua, 24 maio', city: 'Congonhas, SP', code: 'CGH', name: 'Aeroporto Internacional de Congonhas' },
  duration: '1h50',
  locator: 'SWOK2A',
  eTicket: 'SWOK2A',
};

export const Ida = {
  args: {
    ...base,
    direction: 'ida',
    flexible: {
      cancelPolicy: 'Não permite cancelamento',
      farePolicy: 'Alterações a partir de R$ 478,00',
    },
  },
};

export const Volta = {
  args: { ...base, direction: 'volta' },
};

export const ComConexao = {
  args: { ...base, direction: 'ida', stopsLabel: '1 parada' },
};
