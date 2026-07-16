import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { AuthTextField } from '../../molecules/AuthTextField';
import { SocialLoginButton } from '../../molecules/SocialLoginButton';
import { Button } from '../../atoms/Button';

export type LoginProps = {
  emailValue?: string;
  onChangeEmail?: (value: string) => void;
  passwordValue?: string;
  onChangePassword?: (value: string) => void;
  /** Alterna a máscara da senha (o app controla o estado; o ícone segue `passwordVisible`). */
  passwordVisible?: boolean;
  onTogglePasswordVisibility?: () => void;
  /** Mensagem de erro da senha (ex.: "Senha incorreta"). */
  passwordError?: string;
  onPressForgotPassword?: () => void;
  /** Habilita "Fazer login" — o app decide com base na validade do formulário. */
  canSubmit?: boolean;
  onSubmit?: () => void;
  onPressFacebook?: () => void;
  onPressGoogle?: () => void;
  onPressApple?: () => void;
  onPressSignUp?: () => void;
  /**
   * Camada sobreposta à tela — o sheet aberto no momento (escolha de conta
   * social, sucesso/erro). Quem controla qual sheet está aberto é o app.
   */
  overlay?: React.ReactNode;
};

const OrDivider = () => (
  <View className="w-full flex-row items-center gap-lg">
    <View className="h-px flex-1 bg-border-subtle" />
    <Text className="font-sans text-paragraphMd text-fg-subtle">ou</Text>
    <View className="h-px flex-1 bg-border-subtle" />
  </View>
);

/**
 * Login — tela "Fazer login": email + senha, "Esqueceu sua senha?", CTA
 * (desabilitado até o formulário ser válido), login social (Facebook/Google/
 * AppleID) e o atalho para o cadastro. Apresentacional: dados, validação e
 * navegação entram por props. Segue "Login - Default/Active/Error" do Figma.
 */
export const Login = ({
  emailValue,
  onChangeEmail,
  passwordValue,
  onChangePassword,
  passwordVisible = false,
  onTogglePasswordVisibility,
  passwordError,
  onPressForgotPassword,
  canSubmit = false,
  onSubmit,
  onPressFacebook,
  onPressGoogle,
  onPressApple,
  onPressSignUp,
  overlay,
}: LoginProps): React.ReactElement => (
  <View className="flex-1 bg-surface-tag">
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="border-b border-border-subtle bg-surface-tag px-xxl pb-lg pt-[28px]">
        <Text className="font-sans text-authTitle text-fg-secondary">Fazer login</Text>
      </View>

      <View className="gap-xs px-xxl pt-xl">
        <AuthTextField
          label="Email"
          icon="email"
          placeholder="Seu email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={emailValue}
          onChangeText={onChangeEmail}
        />
        <AuthTextField
          label="Senha"
          icon="lock"
          placeholder="Sua senha"
          secureTextEntry={!passwordVisible}
          trailingIcon={passwordVisible ? 'eye' : 'eye-slash'}
          onPressTrailingIcon={onTogglePasswordVisibility}
          error={passwordError}
          value={passwordValue}
          onChangeText={onChangePassword}
        />
        <Pressable accessibilityRole="button" onPress={onPressForgotPassword} className="items-end">
          <Text className="font-sans text-caption text-fg-linkAccent underline">Esqueceu sua senha?</Text>
        </Pressable>
      </View>

      <View className="items-center gap-xl px-xxl py-xxl">
        <Button label="Fazer login" fullWidth disabled={!canSubmit} onPress={onSubmit} />
        <OrDivider />
        <SocialLoginButton provider="facebook" label="Acessar com Facebook" onPress={onPressFacebook} />
        <SocialLoginButton provider="google" label="Acessar com Google" onPress={onPressGoogle} />
        <SocialLoginButton provider="apple" label="Acessar com AppleID" onPress={onPressApple} />
      </View>

      <Text className="px-xxl pb-xxl text-center font-sans text-paragraphMd text-fg-subtle">
        Não tem uma conta?
        <Text className="text-fg-action" onPress={onPressSignUp}>
          {' Cadastre-se'}
        </Text>
      </Text>
    </ScrollView>

    {overlay}
  </View>
);
