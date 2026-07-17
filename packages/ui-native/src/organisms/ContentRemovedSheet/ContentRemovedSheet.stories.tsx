import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { ContentRemovedSheet } from './ContentRemovedSheet';

export default {
  title: 'Organisms/ContentRemovedSheet',
  component: ContentRemovedSheet,
  args: {
    reason: 'informação incorreta sobre o destino',
    onContest: action('onContest'),
    onClose: action('onClose'),
    onDismiss: action('onDismiss'),
  },
  parameters: { layout: 'centered' },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 390, height: 700, backgroundColor: '#F5F5F5' }}>
        <Story />
      </View>
    ),
  ],
};

export const Padrao = {};
