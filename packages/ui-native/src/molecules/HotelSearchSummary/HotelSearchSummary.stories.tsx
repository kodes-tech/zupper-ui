import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { HotelSearchSummary } from './HotelSearchSummary';

export default {
  title: 'Molecules/HotelSearchSummary',
  component: HotelSearchSummary,
  args: { onEdit: action('onEdit') },
  decorators: [(Story: React.ComponentType) => <View style={{ width: 390, padding: 16 }}><Story /></View>],
};

export const Padrao = {
  args: { destination: 'Recife - PE', details: '10 set - 20 set · 2 hóspedes' },
};
