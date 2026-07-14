import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { HotelCard } from './HotelCard';

const image = require('../../_figma/assets/photos/card-destino.jpg');

export default {
  title: 'Organisms/HotelCard',
  component: HotelCard,
  args: { onSeeOffer: action('onSeeOffer'), onSeeMap: action('onSeeMap') },
  decorators: [(Story: React.ComponentType) => <View style={{ width: 390, padding: 16 }}><Story /></View>],
};

export const Completo = {
  args: {
    hotel: {
      name: 'Hotel Boa Viagem Praia',
      image,
      starRating: 4,
      address: 'Av. Boa Viagem, 1500 - Recife, PE',
      hasMap: true,
      breakfast: true,
      cancellation: { text: 'Cancelamento grátis até 08/09', tone: 'success' },
      amenities: ['Wi-Fi', 'Piscina', 'Estacionamento', 'Ar-condicionado'],
      priceLabel: 'Preço para 10 diárias',
      price: 'R$ 3.480',
      taxNote: 'Taxas incluídas',
      installments: 'em até 10x',
    },
  },
};

/** Sem imagem (placeholder), sem café e cancelamento com aviso. */
export const SemImagem = {
  args: {
    hotel: {
      name: 'Pousada Recife Antigo',
      starRating: 3,
      address: 'Rua do Bom Jesus, 120 - Recife, PE',
      cancellation: { text: 'Sem cancelamento grátis', tone: 'warning' },
      amenities: ['Wi-Fi', 'Café da manhã'],
      priceLabel: 'Preço para 10 diárias',
      price: 'R$ 2.150',
      taxNote: 'Taxas incluídas',
      installments: 'em até 6x',
    },
  },
};
