import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { HotelLocationSheet } from './HotelLocationSheet';

export default {
  title: 'Organisms/HotelLocationSheet',
  component: HotelLocationSheet,
  args: {
    hotelName: 'Hotel Zupper Copacabana',
    address: 'Av. Atlântica, 1500 — Copacabana, Rio de Janeiro - RJ',
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
