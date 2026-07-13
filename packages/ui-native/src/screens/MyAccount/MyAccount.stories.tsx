import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { MyAccount } from './MyAccount';

const viajante = require('../../_figma/assets/photos/avatar-viajante.jpg');
const parceiro = require('../../_figma/assets/photos/avatar-parceiro.jpg');

export default {
  title: 'Screens/MyAccount',
  component: MyAccount,
  args: {
    onBack: action('onBack'),
    onRowPress: action('onRowPress'),
    onLogin: action('onLogin'),
    onLogout: action('onLogout'),
    onNavigate: action('onNavigate'),
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

export const LogadoViajante = {
  args: {
    state: 'traveler',
    user: { name: 'Olá, Carlos!', subtitle: '@carlosviaja', avatar: viajante },
  },
};

export const LogadoSemViagem = {
  args: {
    state: 'no-trip',
    user: { name: 'Olá, Carlos!', subtitle: 'contato@dominio.com.br', avatar: viajante },
  },
};

export const LogadoParceiro = {
  args: {
    state: 'partner',
    user: { name: 'Olá, Ana!', subtitle: '@anasilvatrip', avatar: parceiro },
  },
};

export const Deslogado = {
  args: { state: 'logged-out' },
};
