import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { Destinations } from './Destinations';
import type { Destination } from './Destinations';

const img = require('../../_figma/assets/photos/card-destino.jpg');

const names = [
  'Recife',
  'Noronha',
  'Porto Alegre',
  'Rio de Janeiro',
  'Salvador',
  'Florianópolis',
  'Fortaleza',
  'Natal',
  'Curitiba',
  'Manaus',
  'Gramado',
  'Maceió',
];

const destinations: Destination[] = names.map((name, i) => ({
  id: String(i),
  name,
  image: img,
}));

export default {
  title: 'Screens/Destinations',
  component: Destinations,
  args: {
    destinations,
    onBack: action('onBack'),
    onPressDestination: action('onPressDestination'),
    onNavigate: action('onNavigate'),
  },
  parameters: { layout: 'centered' },
  decorators: [
    (Story: React.ComponentType) => (
      <View
        style={{
          width: 390,
          height: 844,
          borderRadius: 24,
          overflow: 'hidden',
          borderWidth: 8,
          borderColor: '#1a1a1a',
        }}
      >
        <Story />
      </View>
    ),
  ],
};

export const VerTodos = { args: {} };
