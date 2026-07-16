import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { PasswordResetErrorSheet } from './PasswordResetErrorSheet';

export default {
  title: 'Organisms/PasswordResetErrorSheet',
  component: PasswordResetErrorSheet,
  args: { onPressRetry: action('onPressRetry'), onDismiss: action('onDismiss') },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 375, height: 500 }}>
        <Story />
      </View>
    ),
  ],
};

export const Default = {};
