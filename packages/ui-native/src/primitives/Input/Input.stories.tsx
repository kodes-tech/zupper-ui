import { action } from '@storybook/addon-actions';
import { Input } from './Input';

// CSF (Component Story Format) — compatível com Storybook.
export default {
  title: 'Primitives/Input',
  component: Input,
  // Instrumenta os callbacks de interação p/ o painel "Actions".
  args: {
    onChangeText: action('onChangeText'),
    onSubmit: action('onSubmit'),
  },
};

export const Default = {
  args: {
    label: 'Título do roteiro',
    placeholder: 'Digite o título da sua dica',
  },
};

export const SemLabel = {
  args: { placeholder: 'Digite o título da sua dica' },
};

export const Preenchido = {
  args: {
    label: 'Título do roteiro',
    defaultValue: 'Fim de semana em Ilhabela',
  },
};

export const ComErro = {
  args: {
    label: 'Título do roteiro',
    placeholder: 'Digite o título da sua dica',
    error: 'O título é obrigatório',
  },
};

export const Desabilitado = {
  args: {
    label: 'Título do roteiro',
    defaultValue: 'Fim de semana em Ilhabela',
    disabled: true,
  },
};

export const Email = {
  args: {
    label: 'E-mail',
    placeholder: 'seuemail@exemplo.com',
    type: 'email',
  },
};

export const Senha = {
  args: {
    label: 'Senha',
    placeholder: 'Sua senha',
    type: 'password',
  },
};
