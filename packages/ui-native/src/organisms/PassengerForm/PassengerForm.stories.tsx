import { action } from '@storybook/addon-actions';
import { PassengerForm } from './PassengerForm';

export default {
  title: 'Organisms/PassengerForm',
  component: PassengerForm,
  args: {
    title: 'Adulto 1',
    onToggleExpanded: action('onToggleExpanded'),
    onChangeFirstName: action('onChangeFirstName'),
    onChangeLastName: action('onChangeLastName'),
    onChangeBirthDate: action('onChangeBirthDate'),
    onChangeDocument: action('onChangeDocument'),
    onChangeGender: action('onChangeGender'),
  },
};

export const Expandido = { args: { expanded: true } };

export const Recolhido = { args: { expanded: false } };

export const Preenchido = {
  args: {
    firstName: 'Ana',
    lastName: 'Silva',
    birthDate: '10/05/1990',
    document: '123.456.789-00',
    gender: 'female',
  },
};

export const ComErros = {
  args: {
    firstNameError: 'Campo obrigatório',
    birthDateError: 'A data de nascimento não corresponde ao tipo de viajante.',
    genderError: 'Campo obrigatório',
  },
};
