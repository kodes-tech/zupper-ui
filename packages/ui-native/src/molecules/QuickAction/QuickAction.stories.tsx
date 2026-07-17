import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { QuickAction } from './QuickAction';

export default {
  title: 'Molecules/QuickAction',
  component: QuickAction,
  args: { onPress: action('onPress') },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 120 }}>
        <Story />
      </View>
    ),
  ],
};

export const Voos = { args: { icon: 'quick-voos', label: 'Buscar Voos' } };
export const Hospedagens = { args: { icon: 'quick-hospedagens', label: 'Hospedagens' } };
export const Pacotes = { args: { icon: 'quick-pacotes', label: 'Pacotes' } };
