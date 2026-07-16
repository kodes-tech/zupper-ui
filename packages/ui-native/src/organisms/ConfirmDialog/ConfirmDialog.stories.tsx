import React from 'react';
import { Text, View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { ConfirmDialog } from './ConfirmDialog';

export default {
  title: 'Organisms/ConfirmDialog',
  component: ConfirmDialog,
  args: { onDismiss: action('onDismiss') },
  parameters: { layout: 'centered' },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 390, height: 700, backgroundColor: '#F5F5F5' }}>
        <Story />
      </View>
    ),
  ],
};

export const ConteudoLivre = {
  args: {
    children: (
      <View>
        <Text>O diálogo aceita qualquer conteúdo — título, corpo, botões.</Text>
      </View>
    ),
  },
};
