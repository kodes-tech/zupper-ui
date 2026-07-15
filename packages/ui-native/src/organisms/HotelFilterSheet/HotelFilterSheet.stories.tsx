import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { HotelFilterSheet } from './HotelFilterSheet';

export default {
  title: 'Organisms/HotelFilterSheet',
  component: HotelFilterSheet,
  args: {
    selectedStars: [3, 4],
    price: { min: 0, max: 2000, values: [300, 1400] },
    formatPrice: (v: number) => `R$ ${v}`,
    amenities: [
      { id: 'wifi', label: 'Wi-Fi Grátis', selected: true },
      { id: 'pool', label: 'Piscina' },
      { id: 'parking', label: 'Estacionamento', selected: true },
      { id: 'gym', label: 'Academia' },
      { id: 'restaurant', label: 'Restaurante' },
    ],
    districts: [
      { id: 'centro', label: 'Centro', selected: true },
      { id: 'boa-viagem', label: 'Boa Viagem' },
      { id: 'pina', label: 'Pina' },
    ],
    onToggleStar: action('onToggleStar'),
    onToggleAmenity: action('onToggleAmenity'),
    onToggleDistrict: action('onToggleDistrict'),
    onApply: action('onApply'),
    onClear: action('onClear'),
    onDismiss: action('onDismiss'),
  },
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 390, height: 844, backgroundColor: '#e5e5e5' }}><Story /></View>
    ),
  ],
};

export const Default = {};
