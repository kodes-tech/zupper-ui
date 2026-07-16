import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { SignUp } from './SignUp';
import { SocialAccountPickerSheet } from '../../organisms/SocialAccountPickerSheet';
import { SocialLoginFeedbackSheet } from '../../organisms/SocialLoginFeedbackSheet';

export default {
  title: 'Screens/SignUp',
  component: SignUp,
  args: {
    onChangeEmail: action('onChangeEmail'),
    onSubmit: action('onSubmit'),
    onPressFacebook: action('onPressFacebook'),
    onPressGoogle: action('onPressGoogle'),
    onPressApple: action('onPressApple'),
    onPressLogin: action('onPressLogin'),
    onPressTerms: action('onPressTerms'),
    onPressPrivacyPolicy: action('onPressPrivacyPolicy'),
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

export const Vazio = { args: {} };

export const Preenchido = {
  args: { emailValue: 'johnmayer@zupper.com.br', canSubmit: true },
};

export const EscolherContaGoogle = {
  args: {
    overlay: (
      <SocialAccountPickerSheet
        title="Fazer login com o Google"
        provider="Google"
        accounts={[
          { id: '1', name: 'Nome do usuário', email: 'usuario@gmail.com', initials: 'ZV' },
          { id: '2', name: 'Nome do usuário', email: 'usuario@gmail.com', initials: 'NU' },
        ]}
        onSelectAccount={action('onSelectAccount')}
        onUseAnotherAccount={action('onUseAnotherAccount')}
        onPressPrivacyPolicy={action('onPressPrivacyPolicy')}
        onPressTermsOfService={action('onPressTermsOfService')}
        onDismiss={action('onDismiss')}
      />
    ),
  },
};

export const ContaCriadaComSucesso = {
  args: {
    overlay: (
      <SocialLoginFeedbackSheet
        headerTitle="Fazer login com o Google"
        tone="success"
        title="Conta criada com sucesso"
        description="Seja bem-vindo ao Zupper, para continuar acesse o botão abaixo e aproveite!"
        ctaLabel="Entrar na minha conta"
        onPressCta={action('onPressCta')}
        onDismiss={action('onDismiss')}
      />
    ),
  },
};

export const ErroLoginSocial = {
  args: {
    overlay: (
      <SocialLoginFeedbackSheet
        headerTitle="Fazer login com o Google"
        tone="warning"
        title="Não foi possível fazer o login"
        description="Tente novamente mais tarde ou escolha outra opção de cadastro."
        ctaLabel="Voltar e tentar novamente"
        onPressCta={action('onPressCta')}
        onDismiss={action('onDismiss')}
      />
    ),
  },
};
