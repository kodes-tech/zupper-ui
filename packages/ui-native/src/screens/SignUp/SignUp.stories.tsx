import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { SignUp } from './SignUp';

export default {
  title: 'Screens/SignUp',
  component: SignUp,
  args: {
    onChangeEmail: action('onChangeEmail'),
    onSubmit: action('onSubmit'),
    onPressFacebook: action('onPressFacebook'),
    onPressGoogle: action('onPressGoogle'),
    onPressApple: action('onPressApple'),
    onPressLogin: action('onPressLogin'),
    onPressTerms: action('onPressTerms'),
    onPressPrivacyPolicy: action('onPressPrivacyPolicy'),
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
  args: { emailValue: 'johnmayer@zupper.com.br', canSubmit: true },
};
