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
  args: {
    amenities: [
      { label: '1 cama de casal grande', icon: 'amenity-bed' },
      { label: 'Tamanho 41m²', icon: 'amenity-size' },
      { label: 'Wi-Fi Grátis', icon: 'amenity-wifi' },
      { label: 'Café da manhã', icon: 'amenity-coffee' },
      { label: 'Ar-condicionado', icon: 'amenity-ac' },
      { label: 'Estacionamento', icon: 'amenity-parking' },
      { label: 'Restaurante', icon: 'amenity-restaurant' },
      { label: 'Aceita pets', icon: 'amenity-pets' },
      { label: 'Academia', icon: 'amenity-gym' },
      { label: 'Piscina', icon: 'amenity-pool' },
      { label: 'Televisão', icon: 'amenity-tv' },
      { label: 'Secador de cabelo', icon: 'amenity-hairdryer' },
      { label: 'Lavanderia', icon: 'amenity-laundry' },
    ],
  },
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
