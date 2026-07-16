import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { PasswordResetSuccess } from './PasswordResetSuccess';

export default {
  title: 'Screens/PasswordResetSuccess',
  component: PasswordResetSuccess,
  args: { onPressLogin: action('onPressLogin') },
  parameters: { layout: 'centered' },
  decorators: [
    (Story: React.ComponentType) => (
      <View
        style={{
          width: 390,
          height: 844,
          borderRadius: 24,
          overflow: 'hidden',
          borderWidth: 8,
          borderColor: '#1a1a1a',
        }}
      >
        <Story />
      </View>
    ),
  ],
};

export const Default = {};
