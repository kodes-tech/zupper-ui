import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { NewsBanner } from './NewsBanner';

const bannerDestino = require('../../_figma/assets/photos/banner-destino.jpg');
const cardDestino = require('../../_figma/assets/photos/card-destino.jpg');

export default {
  title: 'Organisms/NewsBanner',
  component: NewsBanner,
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 390, paddingVertical: 16 }}>
        <Story />
      </View>
    ),
  ],
};

export const Varios = {
  args: {
    banners: [
      { id: 'a', image: bannerDestino, onPress: action('banner-a') },
      { id: 'b', image: cardDestino, onPress: action('banner-b') },
      { id: 'c', image: bannerDestino, onPress: action('banner-c') },
    ],
    activeIndex: 0,
  },
};

export const Unico = {
  args: {
    banners: [{ id: 'a', image: bannerDestino, onPress: action('banner-a') }],
  },
};
