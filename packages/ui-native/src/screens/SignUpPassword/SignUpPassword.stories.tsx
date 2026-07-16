import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { SignUpPassword } from './SignUpPassword';

export default {
  title: 'Screens/SignUpPassword',
  component: SignUpPassword,
  args: {
    onChangePassword: action('onChangePassword'),
    onTogglePasswordVisibility: action('onTogglePasswordVisibility'),
    onSubmit: action('onSubmit'),
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

const requirementsUnmet = [
  { label: 'Letra maiúscula', met: false },
  { label: 'Letra minúscula', met: false },
  { label: '8 caracteres', met: false },
  { label: 'Número e símbolo', met: false },
];

export const Vazio = { args: { requirements: requirementsUnmet } };

export const RequisitosParciais = {
  args: {
    passwordValue: 'Senha123',
    requirements: [
      { label: 'Letra maiúscula', met: true },
      { label: 'Letra minúscula', met: true },
      { label: '8 caracteres', met: true },
      { label: 'Número e símbolo', met: false },
    ],
  },
};

export const Valido = {
  args: {
    passwordValue: 'Senha123!',
    canSubmit: true,
    requirements: requirementsUnmet.map((r) => ({ ...r, met: true })),
  },
};
