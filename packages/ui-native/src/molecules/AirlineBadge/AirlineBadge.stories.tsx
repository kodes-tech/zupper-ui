import React from 'react';
import { View } from 'react-native';
import { AirlineBadge } from './AirlineBadge';

export default {
  title: 'Molecules/AirlineBadge',
  component: AirlineBadge,
  parameters: { layout: 'centered' },
  decorators: [(Story: React.ComponentType) => <View style={{ flexDirection: 'row', gap: 12 }}><Story /></View>],
};

/** Gol — com logo, sobre o laranja da marca. */
export const Gol = { args: { code: 'G3', icon: 'airline-gol', color: '#F97316' } };

/** Latam — sem logo, sigla sobre o índigo da marca. */
export const Latam = { args: { code: 'LA', color: '#1B0088' } };

/** Azul — sem logo, sigla sobre o azul da marca. */
export const Azul = { args: { code: 'AD', color: '#003DA5' } };

/** Fallback neutro (sem cor de marca). */
export const Neutro = { args: { code: 'XX' } };
