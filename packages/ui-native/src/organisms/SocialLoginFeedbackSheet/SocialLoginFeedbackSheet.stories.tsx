import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { SocialLoginFeedbackSheet } from './SocialLoginFeedbackSheet';

export default {
  title: 'Organisms/SocialLoginFeedbackSheet',
  component: SocialLoginFeedbackSheet,
  args: { onPressCta: action('onPressCta'), onDismiss: action('onDismiss') },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 375, height: 500 }}>
        <Story />
      </View>
    ),
  ],
};

export const Sucesso = {
  args: {
    headerTitle: 'Fazer login com o Google',
    tone: 'success',
    title: 'Conta criada com sucesso',
    description: 'Seja bem-vindo ao Zupper, para continuar acesse o botão abaixo e aproveite!',
    ctaLabel: 'Entrar na minha conta',
  },
};

export const Erro = {
  args: {
    headerTitle: 'Fazer login com o Google',
    tone: 'warning',
    title: 'Não foi possível fazer o login',
    description: 'Tente novamente mais tarde ou escolha outra opção de cadastro.',
    ctaLabel: 'Voltar e tentar novamente',
  },
};
