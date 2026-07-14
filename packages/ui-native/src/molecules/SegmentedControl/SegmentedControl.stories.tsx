import { action } from '@storybook/addon-actions';
import { SegmentedControl } from './SegmentedControl';

export default {
  title: 'Molecules/SegmentedControl',
  component: SegmentedControl,
  args: {
    options: [
      { key: 'CPF', label: 'Pessoa Física' },
      { key: 'CNPJ', label: 'Pessoa Jurídica' },
    ],
    onChange: action('onChange'),
  },
};

export const PessoaFisica = { args: { selectedKey: 'CPF' } };
export const PessoaJuridica = { args: { selectedKey: 'CNPJ' } };
