import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { HotelAmenitiesCard } from './HotelAmenitiesCard';

export default {
  title: 'Organisms/HotelAmenitiesCard',
  component: HotelAmenitiesCard,
  args: { onSeeAll: action('onSeeAll') },
  decorators: [(Story: React.ComponentType) => <View style={{ width: 390 }}><Story /></View>],
};

export const Padrao = {
  args: { amenities: ['Wi-Fi', 'Piscina', 'Estacionamento', 'Ar-condicionado'] },
};

export const ComVerTodas = {
  args: {
    limit: 4,
    amenities: [
      'Wi-Fi', 'Piscina', 'Estacionamento', 'Ar-condicionado', 'Academia',
      'Spa', 'Restaurante', 'Bar', 'Room service', 'Aceita pets',
    ],
  },
};
