import React from 'react';
import { View } from 'react-native';
import { OrderTripSummary } from './OrderTripSummary';

export default {
  title: 'Molecules/OrderTripSummary',
  component: OrderTripSummary,
  decorators: [(Story: React.ComponentType) => <View style={{ padding: 16 }}><Story /></View>],
};

const base = {
  destination: 'Recife, Pernambuco',
  people: '2 adultos · 1 criança',
  dates: '12 jul - 19 jul',
};

export const ComImagem = {
  args: { ...base, imageUrl: 'https://images.unsplash.com/photo-1519046904884-53103b34b206' },
};

export const SemImagem = { args: base };

export const SemMiniatura = { args: { ...base, hideImage: true } };
