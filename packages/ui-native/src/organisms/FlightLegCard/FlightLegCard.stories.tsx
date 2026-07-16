import React from 'react';
import { Text, View } from 'react-native';
import { FlightLegCard } from './FlightLegCard';

export default {
  title: 'Organisms/FlightLegCard',
  component: FlightLegCard,
  decorators: [(Story: React.ComponentType) => <View style={{ width: 375, padding: 16 }}><Story /></View>],
};

/** Monograma genérico — placeholder de demonstração (o app consumidor fornece o logo real da companhia). */
const AirlineLogo = ({ initials, size = 32 }: { initials: string; size?: number }) => (
  <View
    style={{ width: size, height: size, borderRadius: 4, backgroundColor: '#737373', alignItems: 'center', justifyContent: 'center' }}
  >
    <Text style={{ color: '#fff', fontSize: size * 0.4, fontWeight: 'bold' }}>{initials}</Text>
  </View>
);

const base = {
  dateLabel: 'Qua, 24 de maio 2024',
  airline: {
    name: 'Gol airlines',
    logo: <AirlineLogo initials="G" />,
    operatedByName: 'Latam Airlines',
    operatedByLogo: <AirlineLogo initials="L" size={16} />,
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
