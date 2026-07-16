import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { AuthTextField } from '../../molecules/AuthTextField';
import { PasswordRequirementsList } from '../../molecules/PasswordRequirementsList';
import type { PasswordRequirement } from '../../molecules/PasswordRequirementsList';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';

export type ResetPasswordProps = {
  onBack?: () => void;
  passwordValue?: string;
  onChangePassword?: (value: string) => void;
  passwordVisible?: boolean;
  onTogglePasswordVisibility?: () => void;
  confirmPasswordValue?: string;
  onChangeConfirmPassword?: (value: string) => void;
  confirmPasswordVisible?: boolean;
  onToggleConfirmPasswordVisibility?: () => void;
  /** Mensagem de erro (ex.: "As senhas não coincidem"). */
  confirmPasswordError?: string;
  /** Regras de senha (ex.: "Letra maiúscula", "8 caracteres") com o estado atendido/não atendido. */
  requirements: PasswordRequirement[];
  /** Habilita "Redefinir senha" — o app decide com base na validade do formulário. */
  canSubmit?: boolean;
  onSubmit?: () => void;
  overlay?: React.ReactNode;
};

/**
 * ResetPassword — tela "Redefinir senha": nova senha + confirmação, chegada
 * a partir do link de redefinição enviado por email. Apresentacional: dados,
 * validação e navegação entram por props. Segue "Senha - Default/Active"
 * (variante de redefinição) do Figma.
 */
export const ResetPassword = ({
  onBack,
  passwordValue,
  onChangePassword,
  passwordVisible = false,
  onTogglePasswordVisibility,
  confirmPasswordValue,
  onChangeConfirmPassword,
  confirmPasswordVisible = false,
  onToggleConfirmPasswordVisibility,
  confirmPasswordError,
  requirements,
  canSubmit = false,
  onSubmit,
  overlay,
}: ResetPasswordProps): React.ReactElement => (
  <View className="flex-1 bg-surface-tag">
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="gap-xxl border-b border-border-subtle bg-surface-tag pb-lg">
        <View className="px-xxl pt-[40px]">
          <Pressable accessibilityRole="button" accessibilityLabel="Voltar" onPress={onBack}>
            <Icon name="back-arrow" size={24} />
          </Pressable>
        </View>
        <View className="gap-lg px-xxl">
          <Text className="font-sans text-authTitle text-fg-secondary">Redefinir senha</Text>
          <Text className="font-sans text-bodyMd text-fg-subtle">
            Crie uma nova senha para acessar sua conta Zupper.
          </Text>
        </View>
      </View>

      <View className="gap-xs px-xxl pt-xl">
        <AuthTextField
          label="Senha"
          icon="lock"
          placeholder="Digite sua nova senha"
          secureTextEntry={!passwordVisible}
          trailingIcon={passwordVisible ? 'eye' : 'eye-slash'}
          onPressTrailingIcon={onTogglePasswordVisibility}
          value={passwordValue}
          onChangeText={onChangePassword}
        />
        <AuthTextField
          label="Confirmar senha"
          icon="lock"
          placeholder="Confirme sua senha"
          secureTextEntry={!confirmPasswordVisible}
          trailingIcon={confirmPasswordVisible ? 'eye' : 'eye-slash'}
          onPressTrailingIcon={onToggleConfirmPasswordVisibility}
          error={confirmPasswordError}
          value={confirmPasswordValue}
          onChangeText={onChangeConfirmPassword}
        />
      </View>

      <View className="px-xxl pt-md">
        <PasswordRequirementsList requirements={requirements} />
      </View>

      <View className="px-xxl py-xxl">
        <Button label="Redefinir senha" fullWidth disabled={!canSubmit} onPress={onSubmit} />
      </View>
    </ScrollView>

    {overlay}
  </View>
);
