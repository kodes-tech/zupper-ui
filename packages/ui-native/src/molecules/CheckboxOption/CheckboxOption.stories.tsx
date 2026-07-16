import { action } from '@storybook/addon-actions';
import { CheckboxOption } from './CheckboxOption';

export default {
  title: 'Molecules/CheckboxOption',
  component: CheckboxOption,
  args: {
    label: 'Aceito receber o status do meu pedido por SMS',
    onPress: action('onPress'),
  },
};

export const Desmarcado = { args: { checked: false } };
export const Marcado = { args: { checked: true } };
