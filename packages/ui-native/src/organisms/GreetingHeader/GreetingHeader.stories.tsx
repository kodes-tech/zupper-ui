import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { GreetingHeader } from './GreetingHeader';

const avatarViajante = require('../../_figma/assets/photos/avatar-viajante.jpg');
const avatarParceiro = require('../../_figma/assets/photos/avatar-parceiro.jpg');

export default {
  title: 'Organisms/GreetingHeader',
  component: GreetingHeader,
  args: { onCtaPress: action('onCtaPress') },
  decorators: [(Story: React.ComponentType) => <View style={{ width: 390 }}><Story /></View>],
};

export const Visitante = {
  args: { title: 'Olá, viajante', subtitle: 'seja bem-vindo', role: 'guest', initials: 'HN', ctaLabel: 'Fazer login' },
};
export const Viajante = {
  args: { title: 'Olá, Carlos', subtitle: '@carlosviaja', role: 'traveler', avatar: avatarViajante, ctaLabel: 'Meu perfil' },
};
export const Parceiro = {
  args: { title: 'Olá, Ana', subtitle: '@anasilvatrip', role: 'partner', avatar: avatarParceiro, ctaLabel: 'Meu perfil' },
};
