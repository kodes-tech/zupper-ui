import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { HotelTestimonialsCard } from './HotelTestimonialsCard';

const quote =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dolor nibh, lacinia sed aliquam a, eleifend eget lorem.';

export default {
  title: 'Organisms/HotelTestimonialsCard',
  component: HotelTestimonialsCard,
  args: { onSeeAll: action('onSeeAll') },
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
    testimonials: [
      { id: '1', name: 'Jéssica M.', initials: 'JM', flag: '🇧🇷', quote },
      { id: '2', name: 'Carlos S.', initials: 'CS', flag: '🇧🇷', quote },
    ],
  },
};
