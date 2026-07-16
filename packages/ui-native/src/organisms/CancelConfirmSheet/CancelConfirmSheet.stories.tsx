import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { CancelConfirmSheet } from './CancelConfirmSheet';

export default {
  title: 'Organisms/CancelConfirmSheet',
  component: CancelConfirmSheet,
  args: {
    onConfirm: action('onConfirm'),
    onGoBack: action('onGoBack'),
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
