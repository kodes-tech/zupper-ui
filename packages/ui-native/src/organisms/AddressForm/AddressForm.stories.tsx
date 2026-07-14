import { action } from '@storybook/addon-actions';
import { AddressForm } from './AddressForm';

export default {
  title: 'Organisms/AddressForm',
  component: AddressForm,
  args: {
    onChangeZipCode: action('onChangeZipCode'),
    onPressZipCodeHelp: action('onPressZipCodeHelp'),
    onChangeStreet: action('onChangeStreet'),
    onChangeNeighborhood: action('onChangeNeighborhood'),
    onChangeNumber: action('onChangeNumber'),
    onChangeComplement: action('onChangeComplement'),
    onPressState: action('onPressState'),
    onPressCity: action('onPressCity'),
    onToggleSameAsProfile: action('onToggleSameAsProfile'),
  },
};

export const Vazio = {
  args: { title: 'Endereço da fatura do cartão' },
};

export const Preenchido = {
  args: {
    title: 'Endereço da fatura do cartão',
    zipCode: '01310-100',
    street: 'Avenida Paulista',
    neighborhood: 'Bela Vista',
    number: '1000',
    complement: 'Apto 101',
    state: 'SP',
    city: 'São Paulo',
    showSameAsProfileOption: true,
    sameAsProfile: true,
  },
};

export const ComErros = {
  args: {
    title: 'Endereço da fatura do cartão',
    zipCodeError: 'Campo obrigatório',
    streetError: 'Campo obrigatório',
    stateError: 'Campo obrigatório',
  },
};
