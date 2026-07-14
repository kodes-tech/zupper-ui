import React from 'react';
import { View } from 'react-native';
import { HotelLocationCard } from './HotelLocationCard';

export default {
  title: 'Organisms/HotelLocationCard',
  component: HotelLocationCard,
  decorators: [(Story: React.ComponentType) => <View style={{ width: 390 }}><Story /></View>],
};

export const Padrao = {
  args: { address: 'Av. Boa Viagem, 1500 - Recife, PE' },
};
