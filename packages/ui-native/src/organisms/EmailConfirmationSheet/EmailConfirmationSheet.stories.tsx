import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { EmailConfirmationSheet } from './EmailConfirmationSheet';

export default {
  title: 'Organisms/EmailConfirmationSheet',
  component: EmailConfirmationSheet,
  args: {
    onPressResend: action('onPressResend'),
    onPressChangeEmail: action('onPressChangeEmail'),
    onDismiss: action('onDismiss'),
  },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 375, height: 600 }}>
        <Story />
      </View>
    ),
  ],
};

export const Default = {};
