import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { HotelNearbyCard } from './HotelNearbyCard';

export default {
  title: 'Organisms/HotelNearbyCard',
  component: HotelNearbyCard,
  args: { onSeeMap: action('onSeeMap') },
  decorators: [(Story: React.ComponentType) => <View style={{ width: 390 }}><Story /></View>],
};

export const Padrao = {
  args: {
    points: [
      { name: 'Parque Ibirapuera', address: 'Av. Ibirapuera, 2927 - Ibirapuera', distance: '5km do Centro', hasMap: true },
      { name: 'Av. Paulista', address: 'Av. Paulista, 1000 - Bela Vista', distance: '8km do Centro', hasMap: true },
      { name: 'Aeroporto de Congonhas', address: 'Av. Washington Luís, s/n', distance: '3km do hotel', hasMap: true },
    ],
  },
};
