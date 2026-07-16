import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { PasswordResetEmailSentSheet } from './PasswordResetEmailSentSheet';

export default {
  title: 'Organisms/PasswordResetEmailSentSheet',
  component: PasswordResetEmailSentSheet,
  args: { onPressLogin: action('onPressLogin'), onDismiss: action('onDismiss') },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 375, height: 500 }}>
        <Story />
      </View>
    ),
  ],
};

export const Default = {};
