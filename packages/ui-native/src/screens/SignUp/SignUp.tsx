import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { AuthTextField } from '../../molecules/AuthTextField';
import { PasswordRequirementsList } from '../../molecules/PasswordRequirementsList';
import type { PasswordRequirement } from '../../molecules/PasswordRequirementsList';
import { SocialLoginButton } from '../../molecules/SocialLoginButton';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';

export type SignUpProps = {
  nameValue?: string;
  onChangeName?: (value: string) => void;
  lastNameValue?: string;
  onChangeLastName?: (value: string) => void;
  emailValue?: string;
  onChangeEmail?: (value: string) => void;
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
  /** Habilita "Criar conta" — o app decide com base na validade do formulário. */
  canSubmit?: boolean;
  onSubmit?: () => void;
  onPressFacebook?: () => void;
  onPressGoogle?: () => void;
  onPressApple?: () => void;
  onPressLogin?: () => void;
  onPressTerms?: () => void;
  onPressPrivacyPolicy?: () => void;
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
 * SignUp — tela "Crie sua conta": nome, sobrenome, email, senha + confirmação
 * (com checklist de requisitos), CTA (desabilitado até o formulário ser
 * válido), login social (Facebook/Google/AppleID), atalho para o login e os
 * termos de aceite. Apresentacional: dados, validação e navegação entram por
 * props. Segue "Cadastro - Default/Active" do Figma.
 */
export const SignUp = ({
  nameValue,
  onChangeName,
  lastNameValue,
  onChangeLastName,
  emailValue,
  onChangeEmail,
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
  onPressFacebook,
  onPressGoogle,
  onPressApple,
  onPressLogin,
  onPressTerms,
  onPressPrivacyPolicy,
  overlay,
}: SignUpProps): React.ReactElement => (
  <View className="flex-1 bg-surface-tag">
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="border-b border-border-subtle bg-surface-tag px-xxl pb-lg pt-[28px]">
        <Text className="font-sans text-authTitle text-fg-secondary">Crie sua conta</Text>
      </View>

      <View className="gap-md px-xxl pt-xl">
        <AuthTextField
          label="Nome"
          icon="user"
          placeholder="Insira seu primeiro nome"
          value={nameValue}
          onChangeText={onChangeName}
        />
        <AuthTextField
          label="Sobrenome"
          icon="user"
          placeholder="Insira seu último nome"
          value={lastNameValue}
          onChangeText={onChangeLastName}
        />
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

        <PasswordRequirementsList requirements={requirements} />
      </View>

      <View className="items-center gap-xl px-xxl py-xxl">
        <Button label="Criar conta" fullWidth disabled={!canSubmit} onPress={onSubmit} />
        <OrDivider />
        <SocialLoginButton provider="facebook" label="Criar conta com Facebook" onPress={onPressFacebook} />
        <SocialLoginButton provider="google" label="Criar conta com Google" onPress={onPressGoogle} />
        <SocialLoginButton provider="apple" label="Criar conta com AppleID" onPress={onPressApple} />
      </View>

      <View className="gap-lg px-xxl pb-xxl">
        <Text className="text-center font-sans text-paragraphMd text-fg-subtle">
          Já tem uma conta?
          <Text className="text-fg-action" onPress={onPressLogin}>
            {' Faça o login'}
          </Text>
        </Text>

        <Text className="text-center font-sans text-paragraphMd text-fg-subtle">
          Ao continuar você concorda com os
          <Text className="text-fg-action" onPress={onPressTerms}>
            {' Termos de Aceite'}
          </Text>
          {' e '}
          <Text className="text-fg-action" onPress={onPressPrivacyPolicy}>
            Política de Privacidade
          </Text>
          {' do Zupper.'}
        </Text>
      </View>

      <View className="h-px w-full bg-border-subtle" />
      <View className="items-center py-xl">
        <Icon name="z-symbol" width={28} height={30} />
      </View>
    </ScrollView>

    {overlay}
  </View>
);
