import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { ResetPassword } from './ResetPassword';

export default {
  title: 'Screens/ResetPassword',
  component: ResetPassword,
  args: {
    onBack: action('onBack'),
    onChangePassword: action('onChangePassword'),
    onChangeConfirmPassword: action('onChangeConfirmPassword'),
    onTogglePasswordVisibility: action('onTogglePasswordVisibility'),
    onToggleConfirmPasswordVisibility: action('onToggleConfirmPasswordVisibility'),
    onSubmit: action('onSubmit'),
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
  args: { passwordValue: 'NovaSenha123!', confirmPasswordValue: 'NovaSenha123!', canSubmit: true },
};

export const SenhasNaoCoincidem = {
  args: {
    passwordValue: 'NovaSenha123!',
    confirmPasswordValue: 'OutraSenha456!',
    confirmPasswordError: 'As senhas não coincidem',
  },
};
