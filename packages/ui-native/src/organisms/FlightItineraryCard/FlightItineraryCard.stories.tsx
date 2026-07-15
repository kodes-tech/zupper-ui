import React from 'react';
import { View } from 'react-native';
import { FlightItineraryCard } from './FlightItineraryCard';

const ida = {
  direction: 'ida' as const,
  headerDate: 'Qua, 24 de maio 2024',
  airline: 'Gol airlines',
  airlineCode: 'G3',
  airlineIcon: 'airline-gol',
  operatedBy: 'Latam Airlines',
  flightNumber: 'LA522',
  travelClass: 'Econômica',
  aircraft: 'Boeing 747',
  departureTime: '11:30',
  departureCity: 'Florianópolis, SC',
  departureDate: 'Qua, 24 maio',
  arrivalTime: '12:55',
  arrivalCity: 'Congonhas, SP',
  arrivalDate: 'Qua, 24 maio',
  stopsLabel: 'Direto',
  duration: '1h50',
  originCode: 'FLN',
  originAirport: 'Aeroporto Internacional Hercílio Luz',
  destinationCode: 'CGH',
  destinationAirport: 'Aeroporto Internacional de Congonhas',
};

export default {
  title: 'Organisms/FlightItineraryCard',
  component: FlightItineraryCard,
  parameters: { layout: 'centered' },
  decorators: [(Story: React.ComponentType) => <View style={{ width: 375 }}><Story /></View>],
};

export const Ida = {
  args: {
    itinerary: ida,
    disclaimer:
      'O Zupper se preocupa com a transparência e, cumprindo a Resolução ANAC 218, disponibiliza os relatórios da ANAC sobre cancelamentos de voos no Brasil.',
  },
};

export const Volta = {
  args: {
    itinerary: {
      ...ida,
      direction: 'volta',
      headerDate: 'Dom, 28 de maio 2024',
      departureCity: 'Congonhas, SP',
      arrivalCity: 'Florianópolis, SC',
      originCode: 'CGH',
      originAirport: 'Aeroporto Internacional de Congonhas',
      destinationCode: 'FLN',
      destinationAirport: 'Aeroporto Internacional Hercílio Luz',
    },
  },
};
