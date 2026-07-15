import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { HotelPolicyRow } from './HotelPolicyRow';

export default {
  title: 'Molecules/HotelPolicyRow',
  component: HotelPolicyRow,
  args: { onPress: action('onPress') },
  parameters: { layout: 'centered' },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 375 }}>
        <Story />
      </View>
    ),
  ],
};

export const InformacoesRelevantes = {
  args: { title: 'Informações relevantes' },
};

export const Politicas = {
  args: { title: 'Políticas de acomodações' },
};
