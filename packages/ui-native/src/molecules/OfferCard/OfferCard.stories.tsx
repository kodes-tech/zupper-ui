import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { OfferCard } from './OfferCard';

export default {
  title: 'Molecules/OfferCard',
  component: OfferCard,
  args: { onPress: action('onPress') },
  decorators: [(Story: React.ComponentType) => <View style={{ padding: 16 }}><Story /></View>],
};

export const Passagens = {
  args: {
    title: 'Passagens aéreas',
    icon: 'oferta-passagens',
    priceLabel: 'Voos a partir',
    price: 'R$ 1.086',
    dateRange: 'Jul 12 – Jul 19',
    ctaLabel: 'Ver passagens',
  },
};

export const Hospedagens = {
  args: {
    title: 'Hospedagens',
    icon: 'oferta-hospedagens',
    priceLabel: 'Diárias a partir',
    price: 'R$ 390',
    dateRange: 'Jul 12 – Jul 19',
    ctaLabel: 'Ver hospedagens',
  },
};

export const Pacotes = {
  args: {
    title: 'Pacotes',
    icon: 'oferta-pacotes',
    priceLabel: 'Pacotes a partir',
    price: 'R$ 3.626',
    dateRange: 'Jul 12 – Jul 19',
    ctaLabel: 'Ver pacotes',
  },
};
