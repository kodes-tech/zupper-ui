import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { CancelSuccessSheet } from './CancelSuccessSheet';

export default {
  title: 'Organisms/CancelSuccessSheet',
  component: CancelSuccessSheet,
  args: {
    onNewSearch: action('onNewSearch'),
    onDismiss: action('onDismiss'),
  },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 375, height: 460 }}>
        <Story />
      </View>
    ),
  ],
};

export const Default = {};
