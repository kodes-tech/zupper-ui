import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { SocialLoginButton } from './SocialLoginButton';

export default {
  title: 'Molecules/SocialLoginButton',
  component: SocialLoginButton,
  args: { onPress: action('onPress') },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 330, gap: 12 }}>
        <Story />
      </View>
    ),
  ],
};

export const Facebook = { args: { provider: 'facebook', label: 'Acessar com Facebook' } };
export const Google = { args: { provider: 'google', label: 'Acessar com Google' } };
export const Apple = { args: { provider: 'apple', label: 'Acessar com AppleID' } };

export const CadastroFacebook = { args: { provider: 'facebook', label: 'Criar conta com Facebook' } };
