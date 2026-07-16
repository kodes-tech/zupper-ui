import React from 'react';
import { View } from 'react-native';
import { StatusMessage } from '../../molecules/StatusMessage';
import { Button } from '../../atoms/Button';

export type AccountCreatedProps = {
  onPressEnter?: () => void;
};

/**
 * AccountCreated — tela "Conta criada com sucesso": exibida em tela cheia
 * após o cadastro por email (sem sheet/overlay). Apresentacional. Segue
 * "Conta criada com sucesso" do Figma.
 */
export const AccountCreated = ({ onPressEnter }: AccountCreatedProps): React.ReactElement => (
  <View className="flex-1 items-center justify-center gap-[52px] bg-surface-default px-xxl">
    <StatusMessage
      tone="success"
      title="Conta criada com sucesso"
      description="Seja bem-vindo ao Zupper, para continuar acesse o botão abaixo e aproveite!"
    />
    <Button variant="secondary" label="Entrar na minha conta" onPress={onPressEnter} fullWidth />
  </View>
);
