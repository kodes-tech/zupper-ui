import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { TravelSearchHistory } from './TravelSearchHistory';

const cardDestino = require('../../_figma/assets/photos/card-destino.jpg');

export default {
  title: 'Organisms/TravelSearchHistory',
  component: TravelSearchHistory,
  args: {
    onPressItem: action('onPressItem'),
  },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 390 }}>
        <Story />
      </View>
    ),
  ],
};

export const ComHistorico = {
  args: {
    items: [
      { id: 'rec', type: 'voo', destination: 'Recife', dates: '10 set - 20 set', image: cardDestino },
      { id: 'ssa', type: 'hospedagem', destination: 'Salvador', dates: '02 out - 08 out' },
      { id: 'gig', type: 'pacote', destination: 'Rio de Janeiro', dates: 'Multidestinos' },
    ],
  },
};

export const UmItem = {
  args: {
    items: [{ id: 'rec', type: 'voo', destination: 'Recife', dates: '10 set - 20 set' }],
  },
};
