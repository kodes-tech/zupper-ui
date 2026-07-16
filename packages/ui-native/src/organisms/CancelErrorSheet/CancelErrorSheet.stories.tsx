import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { CancelErrorSheet } from './CancelErrorSheet';

export default {
  title: 'Organisms/CancelErrorSheet',
  component: CancelErrorSheet,
  args: {
    onRetry: action('onRetry'),
    onContactSupport: action('onContactSupport'),
    onDismiss: action('onDismiss'),
  },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 375, height: 500 }}>
        <Story />
      </View>
    ),
  ],
};

export const Default = {};
