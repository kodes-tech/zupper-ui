import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { AccountRow } from './AccountRow';

export default {
  title: 'Molecules/AccountRow',
  component: AccountRow,
  args: { onPress: action('onPress') },
  decorators: [(Story: React.ComponentType) => <View style={{ width: 390, padding: 24 }}><Story /></View>],
};

export const Completo = {
  args: {
    icon: 'account-personal-data',
    title: 'Dados pessoais',
    cta: 'Editar',
    subtitle: 'Nome, e-mail, data nasc...',
    status: { label: 'Completo', tone: 'success' },
  },
};

export const Pendente = {
  args: {
    icon: 'account-address',
    title: 'Endereço',
    cta: 'Editar',
    subtitle: 'CEP, Rua, Cidade, UF',
    status: { label: 'Pendente', tone: 'warning' },
  },
};

export const SemStatus = {
  args: {
    icon: 'account-password',
    title: 'Senha',
    cta: 'Editar',
    subtitle: 'Redefinir senha',
  },
};

export const EmLinha = {
  args: { icon: 'account-help', title: 'Central de ajuda', cta: 'Ir agora', boxed: false },
};
