import { action } from '@storybook/addon-actions';
import { PixForm } from './PixForm';

export default {
  title: 'Organisms/PixForm',
  component: PixForm,
  args: {
    onChangePersonType: action('onChangePersonType'),
    onToggleSelfPayer: action('onToggleSelfPayer'),
    onChangeName: action('onChangeName'),
    onChangeDocument: action('onChangeDocument'),
    onChangeEmail: action('onChangeEmail'),
    onChangeContactMethod: action('onChangeContactMethod'),
    onChangePhone: action('onChangePhone'),
  },
};

export const PessoaFisica = { args: { personType: 'CPF' } };

export const PessoaJuridica = { args: { personType: 'CNPJ' } };
