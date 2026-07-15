import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { HotelAmenitiesSheet } from './HotelAmenitiesSheet';

export default {
  title: 'Organisms/HotelAmenitiesSheet',
  component: HotelAmenitiesSheet,
  args: {
    onChangeQuery: action('onChangeQuery'),
    onDismiss: action('onDismiss'),
    amenities: [
      'Academia',
      'Ar-condicionado',
      'Aceita pets',
      'Banheiro privativo',
      'Café da manhã',
      'Estacionamento',
      'Piscina',
      'Restaurante',
      'Secador de cabelo',
      'Televisão',
      'Wi-Fi Grátis',
    ],
  },
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 390, height: 844, backgroundColor: '#e5e5e5' }}><Story /></View>
    ),
  ],
};

export const Default = {};

export const SemResultados = { args: { amenities: [], query: 'xyz' } };
