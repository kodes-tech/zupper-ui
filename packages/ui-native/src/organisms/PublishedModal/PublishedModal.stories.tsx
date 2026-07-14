import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { PublishedModal } from './PublishedModal';

export default {
  title: 'Organisms/PublishedModal',
  component: PublishedModal,
  args: { onDismiss: action('onDismiss') },
  parameters: { layout: 'centered' },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 390, height: 500, backgroundColor: '#F5F5F5' }}>
        <Story />
      </View>
    ),
  ],
};

export const Foto = { args: { type: 'foto' } };
export const Dica = { args: { type: 'dica' } };
export const Roteiro = { args: { type: 'roteiro' } };
