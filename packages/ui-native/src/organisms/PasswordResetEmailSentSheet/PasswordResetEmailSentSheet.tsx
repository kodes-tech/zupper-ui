import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from '../../atoms/Icon';
import { Button } from '../../atoms/Button';
import { BottomSheet } from '../BottomSheet';

export type PasswordResetEmailSentSheetProps = {
  /** "Ir para login". */
  onPressLogin?: () => void;
  onDismiss?: () => void;
};

/**
 * PasswordResetEmailSentSheet — confirmação de envio do link de redefinição
 * em `ForgotPassword`: sem cabeçalho com título, só o ícone de fechar.
 * Apresentacional. Segue "Instruções - Sucesso" do Figma.
 */
export const PasswordResetEmailSentSheet = ({
  onPressLogin,
  onDismiss,
}: PasswordResetEmailSentSheetProps): React.ReactElement => (
  <BottomSheet onClose={onDismiss} onDismiss={onDismiss}>
    <View className="items-center gap-xxl px-xxl py-xl">
      <Icon name="email-sent" width={72} height={72} />
      <View className="items-center gap-lg">
        <Text className="text-center font-sans text-[22px] font-bold tracking-[0.44px] text-fg-secondary">
          Novas instruções foram enviadas para seu email
        </Text>
        <Text className="text-center font-sans text-bodyMd text-fg-subtle">
          Caso não tenha conseguido visualizar o e-mail, verifique sua lixeira e caixa de spam.
        </Text>
      </View>
    </View>
    <View className="w-full px-xxl">
      <Button variant="secondary" label="Ir para login" onPress={onPressLogin} fullWidth />
    </View>
  </BottomSheet>
);
