import React from 'react';
import { View } from 'react-native';
import { AuthTextField } from './AuthTextField';

export default {
  title: 'Molecules/AuthTextField',
  component: AuthTextField,
  decorators: [(Story: React.ComponentType) => <View style={{ width: 330, padding: 16 }}><Story /></View>],
};

export const EmailVazio = { args: { label: 'Email', icon: 'email', placeholder: 'Seu email' } };

export const EmailPreenchido = {
  args: { label: 'Email', icon: 'email', value: 'johnmayer@zupper.com.br' },
};

export const Senha = {
  args: {
    label: 'Senha',
    icon: 'lock',
    trailingIcon: 'eye-slash',
    placeholder: 'Sua senha',
    secureTextEntry: true,
  },
};

export const SenhaComErro = {
  args: {
    label: 'Senha',
    icon: 'lock',
    trailingIcon: 'eye-slash',
    value: '••••••••',
    error: 'Senha incorreta',
  },
};
