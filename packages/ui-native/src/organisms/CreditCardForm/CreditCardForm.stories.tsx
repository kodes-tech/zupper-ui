import { action } from '@storybook/addon-actions';
import { CreditCardForm } from './CreditCardForm';

export default {
  title: 'Organisms/CreditCardForm',
  component: CreditCardForm,
  args: {
    onChangeCardNumber: action('onChangeCardNumber'),
    onChangeCardName: action('onChangeCardName'),
    onChangeExpiration: action('onChangeExpiration'),
    onChangeCvv: action('onChangeCvv'),
    onPressInstallments: action('onPressInstallments'),
    onToggleIsCardOwner: action('onToggleIsCardOwner'),
    onChangeHolderName: action('onChangeHolderName'),
    onChangeHolderDocument: action('onChangeHolderDocument'),
    onChangeHolderContactMethod: action('onChangeHolderContactMethod'),
    onChangeHolderPhone: action('onChangeHolderPhone'),
  },
};

export const Vazio = {};

export const Preenchido = {
  args: {
    cardNumber: '4111 1111 1111 1111',
    cardName: 'ANA SILVA',
    expiration: '12/28',
    cvv: '123',
    installmentsLabel: '3x Sem juros',
    isCardOwner: true,
    holderName: 'Ana Silva',
    holderDocument: '123.456.789-00',
    holderPhone: '(11) 98888-7777',
  },
};
