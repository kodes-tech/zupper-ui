import React from 'react';
import { View } from 'react-native';
import { AccountGreeting } from './AccountGreeting';

const viajante = require('../../_figma/assets/photos/avatar-viajante.jpg');
const parceiro = require('../../_figma/assets/photos/avatar-parceiro.jpg');

export default {
  title: 'Molecules/AccountGreeting',
  component: AccountGreeting,
  decorators: [(Story: React.ComponentType) => <View style={{ width: 390, paddingVertical: 16 }}><Story /></View>],
};

export const Viajante = {
  args: { name: 'Olá, Carlos!', subtitle: '@carlosviaja', avatar: viajante, role: 'traveler' },
};

export const SemViagem = {
  args: { name: 'Olá, Carlos!', subtitle: 'contato@dominio.com.br', avatar: viajante },
};

export const Parceiro = {
  args: {
    name: 'Olá, Ana!',
    subtitle: '@anasilvatrip',
    avatar: parceiro,
    role: 'partner',
    badgeLabel: 'Zupper Parceiro',
  },
};
