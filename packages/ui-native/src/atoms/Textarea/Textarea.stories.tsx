import { action } from '@storybook/addon-actions';
import { Textarea } from './Textarea';

export default {
  title: 'Atoms/Textarea',
  component: Textarea,
  args: { onChangeText: action('onChangeText') },
};

export const Default = {
  args: { label: 'Sua dica', placeholder: 'Escreva sua dica...' },
};

export const Preenchido = {
  args: {
    label: 'Legenda',
    defaultValue: 'Curtindo o sol radiante e a vibe incrível da praia de Recife!',
  },
};

export const Resumo = {
  args: {
    label: 'Resumo',
    minHeight: 72,
    defaultValue:
      'Descubra Recife em 7 dias explorando seu centro histórico vibrante e suas praias deslumbrantes.',
  },
};

export const ComErro = {
  args: { label: 'Sua dica', placeholder: 'Escreva sua dica...', error: 'A dica é obrigatória' },
};
