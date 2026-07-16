import React from 'react';
import { View } from 'react-native';
import { StatusMessage } from './StatusMessage';

export default {
  title: 'Molecules/StatusMessage',
  component: StatusMessage,
  decorators: [(Story: React.ComponentType) => <View style={{ width: 330, padding: 16 }}><Story /></View>],
};

export const Sucesso = {
  args: {
    tone: 'success',
    title: 'Conta criada com sucesso',
    description: 'Seja bem-vindo ao Zupper, para continuar acesse o botão abaixo e aproveite!',
  },
};

export const Atencao = {
  args: {
    tone: 'warning',
    title: 'Não foi possível fazer o login',
    description: 'Tente novamente mais tarde ou escolha outra opção de cadastro.',
  },
};
