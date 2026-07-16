import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { SocialAccountPickerSheet } from './SocialAccountPickerSheet';

export default {
  title: 'Organisms/SocialAccountPickerSheet',
  component: SocialAccountPickerSheet,
  args: {
    onSelectAccount: action('onSelectAccount'),
    onUseAnotherAccount: action('onUseAnotherAccount'),
    onPressPrivacyPolicy: action('onPressPrivacyPolicy'),
    onPressTermsOfService: action('onPressTermsOfService'),
    onDismiss: action('onDismiss'),
  },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 375, height: 600 }}>
        <Story />
      </View>
    ),
  ],
};

export const Google = {
  args: {
    title: 'Fazer login com o Google',
    provider: 'Google',
    accounts: [
      { id: '1', name: 'Nome do usuário', email: 'usuario@gmail.com', initials: 'ZV' },
      { id: '2', name: 'Nome do usuário', email: 'usuario@gmail.com', initials: 'NU' },
    ],
  },
};
