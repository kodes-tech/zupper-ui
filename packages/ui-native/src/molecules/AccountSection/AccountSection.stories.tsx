import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { AccountSection } from './AccountSection';
import type { AccountSectionRow } from './AccountSection';

const perfilRows: AccountSectionRow[] = [
  {
    id: 'personal-data',
    icon: 'account-personal-data',
    title: 'Dados pessoais',
    cta: 'Editar',
    subtitle: 'Nome, e-mail, data nasc...',
    status: { label: 'Completo', tone: 'success' },
    onPress: action('personal-data'),
  },
  {
    id: 'address',
    icon: 'account-address',
    title: 'Endereço',
    cta: 'Editar',
    subtitle: 'CEP, Rua, Cidade, UF',
    status: { label: 'Pendente', tone: 'warning' },
    onPress: action('address'),
  },
  {
    id: 'password',
    icon: 'account-password',
    title: 'Senha',
    cta: 'Editar',
    subtitle: 'Redefinir senha',
    onPress: action('password'),
  },
];

const ajudaRows: AccountSectionRow[] = [
  { id: 'help', icon: 'account-help', title: 'Central de ajuda', cta: 'Ir agora', boxed: false },
  { id: 'about', icon: 'account-about-zupper', title: 'Sobre o Zupper', cta: 'Ir agora', boxed: false },
];

export default {
  title: 'Molecules/AccountSection',
  component: AccountSection,
  decorators: [(Story: React.ComponentType) => <View style={{ width: 390, paddingVertical: 16 }}><Story /></View>],
};

export const MeuPerfil = { args: { title: 'Meu perfil', rows: perfilRows } };
export const Ajuda = { args: { title: 'Ajuda', rows: ajudaRows } };
