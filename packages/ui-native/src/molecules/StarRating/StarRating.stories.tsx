import React from 'react';
import { View } from 'react-native';
import { StarRating } from './StarRating';

export default {
  title: 'Molecules/StarRating',
  component: StarRating,
  decorators: [(Story: React.ComponentType) => <View style={{ padding: 16 }}><Story /></View>],
};

export const Cinco = { args: { rating: 5 } };
export const Tres = { args: { rating: 3 } };
