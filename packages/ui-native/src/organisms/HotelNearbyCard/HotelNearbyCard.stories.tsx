import React from 'react';
import { View } from 'react-native';
import { HotelNearbyCard } from './HotelNearbyCard';

export default {
  title: 'Organisms/HotelNearbyCard',
  component: HotelNearbyCard,
  decorators: [(Story: React.ComponentType) => <View style={{ width: 390 }}><Story /></View>],
};

export const Padrao = {
  args: {
    points: [
      { name: 'Praia de Boa Viagem', distance: '0.2 km' },
      { name: 'Marco Zero', distance: '5.4 km' },
      { name: 'Aeroporto do Recife', distance: '8.1 km' },
    ],
  },
};
