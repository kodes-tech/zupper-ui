import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { PreferenceTile } from './PreferenceTile';

const tileEconomica = require('../../_figma/assets/photos/preferencias-viagem/tile-economica.jpg');

export default {
  title: 'Molecules/PreferenceTile',
  component: PreferenceTile,
  args: { onPress: action('onPress') },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 166, padding: 8 }}>
        <Story />
      </View>
    ),
  ],
};

export const Default = { args: { label: 'Econômica', image: tileEconomica } };
export const Selected = { args: { label: 'Econômica', image: tileEconomica, selected: true } };
export const Muted = { args: { label: 'Econômica', image: tileEconomica, muted: true } };
