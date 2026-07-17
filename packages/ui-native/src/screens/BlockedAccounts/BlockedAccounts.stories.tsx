import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { BlockedAccounts } from './BlockedAccounts';

const viajante = require('../../_figma/assets/photos/avatar-viajante.jpg');
const parceiro = require('../../_figma/assets/photos/avatar-parceiro.jpg');

export default {
  title: 'Screens/BlockedAccounts',
  component: BlockedAccounts,
  args: {
    onBack: action('onBack'),
    onPressAccount: action('onPressAccount'),
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

export const Default = {
  args: {
    accounts: [
      {
        id: '1',
        name: 'Carlos Souza',
        handle: '@carlosviaja',
        avatar: viajante,
        action: 'unblock',
      },
      { id: '2', name: 'Ana Silva', handle: '@anasilvatrip', avatar: parceiro, action: 'unblock' },
      { id: '3', name: 'Bruno Lima', handle: '@brunolima', avatar: viajante, action: 'block' },
    ],
  },
};

export const Empty = {
  args: { accounts: [] },
};
