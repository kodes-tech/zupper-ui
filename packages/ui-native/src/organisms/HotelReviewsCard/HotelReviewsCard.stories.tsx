import React from 'react';
import { View } from 'react-native';
import { HotelReviewsCard } from './HotelReviewsCard';

export default {
  title: 'Organisms/HotelReviewsCard',
  component: HotelReviewsCard,
  parameters: { layout: 'centered' },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 375 }}>
        <Story />
      </View>
    ),
  ],
};

export const Default = {
  args: {
    stars: 3,
    ratingLabel: 'Bom 7,0',
    categories: [
      { label: 'Comodidades', value: 7 },
      { label: 'Conforto', value: 7 },
      { label: 'Limpeza', value: 7 },
      { label: 'Localização', value: 7 },
      { label: 'Wi-Fi', value: 7 },
    ],
  },
};
