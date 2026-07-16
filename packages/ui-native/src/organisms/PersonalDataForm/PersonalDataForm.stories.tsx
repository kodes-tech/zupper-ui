import { action } from '@storybook/addon-actions';
import { PersonalDataForm } from './PersonalDataForm';

export default {
  title: 'Organisms/PersonalDataForm',
  component: PersonalDataForm,
  args: {
    avatar: { uri: 'https://i.pravatar.cc/128' },
    onChangePhoto: action('onChangePhoto'),
    onChangeFirstName: action('onChangeFirstName'),
    onChangeLastName: action('onChangeLastName'),
    onChangeNickname: action('onChangeNickname'),
    onChangeEmail: action('onChangeEmail'),
    onChangeBirthDate: action('onChangeBirthDate'),
    onChangeCpf: action('onChangeCpf'),
    onChangeContactType: action('onChangeContactType'),
    onChangePhone: action('onChangePhone'),
  },
};

export const Default = {};

export const Filled = {
  args: {
    firstName: 'Henrique',
    lastName: 'Souza',
    nickname: '@henriquesouza',
    email: 'henrique@exemplo.com',
    birthDate: '01/02/1990',
    cpf: '123.456.789-00',
    contactType: 'celular',
    phone: '(11) 91234-5678',
  },
};

export const NicknameUnavailable = {
  args: {
    ...Filled.args,
    nicknameError: 'Este nome está indisponível',
  },
};
