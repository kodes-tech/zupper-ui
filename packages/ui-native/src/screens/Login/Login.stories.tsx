import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { Login } from './Login';

export default {
  title: 'Screens/Login',
  component: Login,
  args: {
    onChangeEmail: action('onChangeEmail'),
    onChangePassword: action('onChangePassword'),
    onTogglePasswordVisibility: action('onTogglePasswordVisibility'),
    onPressForgotPassword: action('onPressForgotPassword'),
    onSubmit: action('onSubmit'),
    onPressFacebook: action('onPressFacebook'),
    onPressGoogle: action('onPressGoogle'),
    onPressApple: action('onPressApple'),
    onPressSignUp: action('onPressSignUp'),
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
  args: {
    emailValue: 'johnmayer@zupper.com.br',
    passwordValue: '12345678',
    canSubmit: true,
  },
};

export const Erro = {
  args: {
    emailValue: 'johnmayer@zupper.com.br',
    passwordValue: '12345678',
    passwordError: 'Senha incorreta',
    canSubmit: true,
  },
};
