import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { PackageOrderHotelCard } from './PackageOrderHotelCard';

const cardDestino = require('../../_figma/assets/photos/card-destino.jpg');

export default {
  title: 'Organisms/PackageOrderHotelCard',
  component: PackageOrderHotelCard,
  args: {
    onSeeDescription: action('onSeeDescription'),
    onSeeAllAmenities: action('onSeeAllAmenities'),
  },
  parameters: { layout: 'centered' },
  decorators: [(Story: React.ComponentType) => <View style={{ width: 375 }}><Story /></View>],
};

export const Default = {
  args: {
    name: 'Bourbon São Paulo Ibirapuera Convention Hotel',
    image: cardDestino,
    starRating: 3,
    address: 'Av. Ibirapuera, 2927 - Ibirapuera - São Paulo',
    distance: '5km do Centro',
    benefits: [
      { icon: 'hotel-circle-check', text: 'Cancelamento grátis', tone: 'success' },
      { icon: 'amenity-coffee', text: 'Café da manhã grátis', tone: 'success' },
    ],
    amenities: [
      { label: 'Conectividade', icon: 'amenity-wifi' },
      { label: 'Alimentação', icon: 'amenity-restaurant' },
      { label: 'Lazer', icon: 'amenity-pool' },
      { label: 'Bem-estar', icon: 'amenity-gym' },
      { label: 'Conforto', icon: 'amenity-ac' },
      { label: 'Serviços', icon: 'amenity-laundry' },
    ],
    checkIn: 'Qua, 28 Dez 2024 - 00h00',
    checkOut: 'Qua, 02 Jan 2024 - 00h00',
    guestsSummary: '1 quarto, 2 adultos',
  },
};
