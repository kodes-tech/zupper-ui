import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { HotelSearch } from './HotelSearch';

export default {
  title: 'Screens/HotelSearch',
  component: HotelSearch,
  args: {
    onBack: action('onBack'),
    onPressDestination: action('onPressDestination'),
    onPressDates: action('onPressDates'),
    onPressTravelers: action('onPressTravelers'),
    onSearch: action('onSearch'),
  },
  parameters: { layout: 'centered' },
  decorators: [
    (Story: React.ComponentType) => (
      <View
        style={{ width: 390, height: 844, borderRadius: 24, overflow: 'hidden', borderWidth: 8, borderColor: '#1a1a1a' }}
      >
        <Story />
      </View>
    ),
  ],
};

export const Vazio = {};

export const Preenchido = {
  args: {
    destination: 'Recife - PE',
    dates: '10 Set 26 - 20 Set 26',
    travelers: '2 Adultos, 1 Quarto',
    canSearch: true,
  },
};
