import { action } from '@storybook/addon-actions';
import { InvoiceDocumentForm } from './InvoiceDocumentForm';

export default {
  title: 'Organisms/InvoiceDocumentForm',
  component: InvoiceDocumentForm,
  args: {
    onChangePersonType: action('onChangePersonType'),
    onChangeName: action('onChangeName'),
    onChangeDocument: action('onChangeDocument'),
    onToggleMunicipalRegistration: action('onToggleMunicipalRegistration'),
    onChangeMunicipalRegistration: action('onChangeMunicipalRegistration'),
  },
};

export const PessoaFisica = { args: { personType: 'CPF' } };

export const PessoaJuridica = { args: { personType: 'CNPJ' } };

export const PessoaJuridicaComInscricao = {
  args: { personType: 'CNPJ', hasMunicipalRegistration: true },
};
