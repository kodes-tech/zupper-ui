import React from 'react';
import { View } from 'react-native';
import { HotelBenefitItem } from './HotelBenefitItem';

export default {
  title: 'Molecules/HotelBenefitItem',
  component: HotelBenefitItem,
  decorators: [(Story: React.ComponentType) => <View style={{ width: 320, padding: 16, gap: 8 }}><Story /></View>],
};

export const Cancelamento = {
  args: { icon: 'hotel-circle-check', text: 'Cancelamento grátis', tone: 'success' },
};

export const Cafe = {
  args: { icon: 'amenity-coffee', text: 'Café da manhã incluído', tone: 'success' },
};

export const SemCancelamento = {
  args: { icon: 'hotel-circle-check', text: 'Sem cancelamento grátis', tone: 'warning' },
};
