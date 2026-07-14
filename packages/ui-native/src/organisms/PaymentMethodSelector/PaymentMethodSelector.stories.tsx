import { action } from '@storybook/addon-actions';
import { PaymentMethodSelector } from './PaymentMethodSelector';

export default {
  title: 'Organisms/PaymentMethodSelector',
  component: PaymentMethodSelector,
  args: { onChange: action('onChange') },
};

export const NadaSelecionado = {};

export const CartaoSelecionado = { args: { selected: 'creditCard' } };

export const PixSelecionado = { args: { selected: 'pix' } };

export const ComErro = { args: { error: 'Selecione o tipo de pagamento' } };
