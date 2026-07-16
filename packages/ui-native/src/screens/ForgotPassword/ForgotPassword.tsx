import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { AuthTextField } from '../../molecules/AuthTextField';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';

export type ForgotPasswordProps = {
  onBack?: () => void;
  emailValue?: string;
  onChangeEmail?: (value: string) => void;
  /** Habilita "Solicitar nova senha" — o app decide com base na validade do email. */
  canSubmit?: boolean;
  onSubmit?: () => void;
  onPressBackToLogin?: () => void;
  /**
   * Camada sobreposta à tela — o sheet aberto no momento (instruções
   * enviadas, erro ao enviar). Quem controla qual sheet está aberto é o app.
   */
  overlay?: React.ReactNode;
};

/**
 * ForgotPassword — tela "Esqueci minha senha": email + "Solicitar nova senha"
 * (desabilitado até o email ser válido) e "Voltar para o login" (sempre
 * ativo). Apresentacional: dados, validação e navegação entram por props.
 * Segue "Senha - Default/Active" do Figma.
 */
export const ForgotPassword = ({
  onBack,
  emailValue,
  onChangeEmail,
  canSubmit = false,
  onSubmit,
  onPressBackToLogin,
  overlay,
}: ForgotPasswordProps): React.ReactElement => (
  <View className="flex-1 bg-surface-tag">
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="gap-xxl border-b border-border-subtle bg-surface-tag pb-lg">
        <View className="px-xxl pt-[40px]">
          <Pressable accessibilityRole="button" accessibilityLabel="Voltar" onPress={onBack}>
            <Icon name="back-arrow" size={24} />
          </Pressable>
        </View>
        <View className="gap-lg px-xxl">
          <Text className="font-sans text-authTitle text-fg-secondary">Esqueci minha senha</Text>
          <Text className="font-sans text-bodyMd text-fg-subtle">
            Informe o email cadastrado para receber as instruções de redefinição de senha.
          </Text>
        </View>
      </View>

      <View className="px-xxl pt-xl">
        <AuthTextField
          label="Email"
          icon="email"
          placeholder="Digite seu e-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          value={emailValue}
          onChangeText={onChangeEmail}
        />
      </View>

      <View className="gap-lg px-xxl py-xxl">
        <Button label="Solicitar nova senha" variant="secondary" fullWidth disabled={!canSubmit} onPress={onSubmit} />
        <Button label="Voltar para o login" fullWidth onPress={onPressBackToLogin} />
      </View>
    </ScrollView>

    {overlay}
  </View>
);
