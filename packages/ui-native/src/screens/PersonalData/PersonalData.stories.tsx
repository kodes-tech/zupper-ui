import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { PersonalData } from './PersonalData';

const viajante = require('../../_figma/assets/photos/avatar-viajante.jpg');

export default {
  title: 'Screens/PersonalData',
  component: PersonalData,
  args: {
    avatar: viajante,
    firstName: 'Henrique',
    lastName: 'Souza',
    nickname: '@henriquesouza',
    email: 'henrique@exemplo.com',
    birthDate: '01/02/1990',
    cpf: '123.456.789-00',
    contactType: 'celular',
    phone: '(11) 91234-5678',
    onBack: action('onBack'),
    onNavigate: action('onNavigate'),
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
  parameters: { layout: 'centered' },
  decorators: [
    (Story: React.ComponentType) => (
      <View
        style={{
          width: 390,
          height: 844,
          borderRadius: 24,
          overflow: 'hidden',
          borderWidth: 8,
          borderColor: '#1a1a1a',
        }}
      >
        <Story />
      </View>
    ),
  ],
};

export const Default = {};

export const NicknameUnavailable = {
  args: { nicknameError: 'Este nome está indisponível' },
};
