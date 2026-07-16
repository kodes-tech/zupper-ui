import React from 'react';
import { View } from 'react-native';
import { StatusMessage } from '../../molecules/StatusMessage';
import { Button } from '../../atoms/Button';
import { BottomSheet } from '../BottomSheet';

export type PasswordResetErrorSheetProps = {
  /** "Voltar e tentar novamente". */
  onPressRetry?: () => void;
  onDismiss?: () => void;
};

/**
 * PasswordResetErrorSheet — erro ao solicitar o link de redefinição de senha
 * em `ForgotPassword`: sem cabeçalho com título, só o ícone de fechar.
 * Apresentacional. Segue "Senha - Erro" do Figma.
 */
export const PasswordResetErrorSheet = ({
  onPressRetry,
  onDismiss,
}: PasswordResetErrorSheetProps): React.ReactElement => (
  <BottomSheet onClose={onDismiss} onDismiss={onDismiss}>
    <View className="items-center gap-xxl px-xxl py-xl">
      <StatusMessage
        tone="warning"
        title="Ops!... Não foi possível enviar o link para seu e-mail."
        description="Clique no botão abaixo e tente novamente."
      />
    </View>
    <View className="w-full px-xxl">
      <Button variant="secondary" label="Voltar e tentar novamente" onPress={onPressRetry} fullWidth />
    </View>
  </BottomSheet>
);
