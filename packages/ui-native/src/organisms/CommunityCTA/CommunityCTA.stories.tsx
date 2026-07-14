import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { CommunityCTA } from './CommunityCTA';

export default {
  title: 'Organisms/CommunityCTA',
  component: CommunityCTA,
  args: { onDica: action('onDica'), onFoto: action('onFoto'), onRoteiro: action('onRoteiro') },
  decorators: [(Story: React.ComponentType) => <View style={{ width: 358 }}><Story /></View>],
};

export const Viajante = {
  args: {
    variant: 'traveler',
    title: 'Bem-vindo de volta do Recife',
    description:
      'Sua experiência pode ajudar outros viajantes. Publique e faça parte da nossa comunidade!',
  },
};

export const Parceiro = {
  args: {
    variant: 'partner',
    title: 'Sua audiência quer te ver viajando',
    description:
      'Como Zupper Parceiro, você publica suas experiências sem limites e inspira a comunidade Zupper.',
  },
};
