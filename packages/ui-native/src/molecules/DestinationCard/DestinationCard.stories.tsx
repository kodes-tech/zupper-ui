import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { DestinationCard } from './DestinationCard';

const cardDestino = require('../../_figma/assets/photos/card-destino.jpg');

export default {
  title: 'Molecules/DestinationCard',
  component: DestinationCard,
  args: { onPress: action('onPress') },
  decorators: [(Story: React.ComponentType) => <View style={{ padding: 8 }}><Story /></View>],
};

export const Default = { args: { name: 'Recife', image: cardDestino } };
