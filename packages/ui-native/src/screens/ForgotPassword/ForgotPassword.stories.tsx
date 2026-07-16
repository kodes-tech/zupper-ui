import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { ForgotPassword } from './ForgotPassword';

export default {
  title: 'Screens/ForgotPassword',
  component: ForgotPassword,
  args: {
    onBack: action('onBack'),
    onChangeEmail: action('onChangeEmail'),
    onSubmit: action('onSubmit'),
    onPressBackToLogin: action('onPressBackToLogin'),
  },
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

export const Vazio = { args: {} };

export const Preenchido = {
  args: { emailValue: 'johnmayer@gmail.com', canSubmit: true },
};
