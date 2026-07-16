import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '../../atoms/Icon';

export type PasswordResetSuccessProps = {
  onPressLogin?: () => void;
};

/**
 * PasswordResetSuccess — tela "Senha redefinida": confirmação em tela cheia
 * exibida após o usuário concluir a redefinição em `ResetPassword`.
 * Apresentacional. Segue "Senha - Redefinida" do Figma.
 */
export const PasswordResetSuccess = ({
  onPressLogin,
}: PasswordResetSuccessProps): React.ReactElement => (
  <View className="flex-1 items-center justify-center gap-xxl bg-surface-default px-xxl">
    <Icon name="password-reset-success" width={72} height={72} />
    <View className="items-center gap-lg">
      <Text className="text-center font-sans text-[22px] font-bold tracking-[0.44px] text-fg-secondary">
        Senha redefinida
      </Text>
      <Text className="text-center font-sans text-bodyMd text-fg-subtle">
        Sua senha foi redefinida com sucesso. Você já pode fazer login com a nova senha.
      </Text>
    </View>
    <Pressable accessibilityRole="button" onPress={onPressLogin}>
      <Text className="font-sans text-caption text-fg-action underline">Ir para login</Text>
    </Pressable>
  </View>
);
