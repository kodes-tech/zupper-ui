import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { PackageRoomCard } from './PackageRoomCard';

const cardDestino = require('../../_figma/assets/photos/card-destino.jpg');

export default {
  title: 'Organisms/PackageRoomCard',
  component: PackageRoomCard,
  args: { onSeeAll: action('onSeeAll') },
  parameters: { layout: 'centered' },
  decorators: [(Story: React.ComponentType) => <View style={{ width: 375 }}><Story /></View>],
};

export const Default = {
  args: {
    room: {
      title: 'Quarto 1',
      image: cardDestino,
      cancellation: 'Cancelamento grátis até 00/00/0000',
      amenities: ['Tamanho 41m²', 'Televisão', 'Wi-Fi Grátis', 'Secador de cabelo'],
    },
  },
};
