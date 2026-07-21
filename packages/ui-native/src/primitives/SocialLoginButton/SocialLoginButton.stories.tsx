import { action } from '@storybook/addon-actions';
import { SocialLoginButton } from './SocialLoginButton';

export default {
  title: 'Primitives/SocialLoginButton',
  // draft — primitivo novo de auth, pendente de avaliação do designer.
  tags: ['draft'],
  component: SocialLoginButton,
  args: { onPress: action('onPress') },
};

export const Facebook = { args: { provider: 'facebook', label: 'Acessar com Facebook' } };

export const Google = { args: { provider: 'google', label: 'Acessar com Google' } };

export const Apple = { args: { provider: 'apple', label: 'Acessar com AppleID' } };

export const Cadastro = { args: { provider: 'facebook', label: 'Criar conta com Facebook' } };

export const Desabilitado = {
  args: { provider: 'facebook', label: 'Acessar com Facebook', disabled: true },
};
