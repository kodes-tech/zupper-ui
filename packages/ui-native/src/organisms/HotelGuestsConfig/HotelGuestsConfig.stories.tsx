import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { HotelGuestsConfig } from './HotelGuestsConfig';

export default {
  title: 'Organisms/HotelGuestsConfig',
  component: HotelGuestsConfig,
  args: {
    onIncrementAdults: action('onIncrementAdults'),
    onDecrementAdults: action('onDecrementAdults'),
    onIncrementChildren: action('onIncrementChildren'),
    onDecrementChildren: action('onDecrementChildren'),
    onPressChildAge: action('onPressChildAge'),
    onRemoveRoom: action('onRemoveRoom'),
    onAddRoom: action('onAddRoom'),
    onApply: action('onApply'),
    onClose: action('onClose'),
  },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 390, height: 700, position: 'relative' }}>
        <Story />
      </View>
    ),
  ],
};

/** Estado inicial real do app: 1 quarto, 1 adulto, sem crianças. */
export const Padrao = {
  args: { rooms: [{ adultQty: 1, childAges: [] }] },
};

export const ComCrianca = {
  args: { rooms: [{ adultQty: 2, childAges: [8] }] },
};

/** Dois quartos — mostra o botão "Remover quarto" e "Adicionar quarto". */
export const DoisQuartos = {
  args: {
    rooms: [
      { adultQty: 2, childAges: [] },
      { adultQty: 1, childAges: [0] },
    ],
  },
};

export const ComErro = {
  args: {
    rooms: [{ adultQty: 1, childAges: [] }],
    error: 'Selecione ao menos 1 hóspede',
  },
};
