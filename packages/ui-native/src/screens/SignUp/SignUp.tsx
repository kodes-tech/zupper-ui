import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { AuthTextField } from '../../molecules/AuthTextField';
import { SocialLoginButton } from '../../molecules/SocialLoginButton';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';

export type SignUpProps = {
  emailValue?: string;
  onChangeEmail?: (value: string) => void;
  /** Habilita "Criar conta" — o app decide com base na validade do email. */
  canSubmit?: boolean;
  onSubmit?: () => void;
  onPressFacebook?: () => void;
  onPressGoogle?: () => void;
  onPressApple?: () => void;
  onPressLogin?: () => void;
  onPressTerms?: () => void;
  onPressPrivacyPolicy?: () => void;
};

const OrDivider = () => (
  <View className="w-full flex-row items-center gap-lg">
    <View className="h-px flex-1 bg-border-subtle" />
    <Text className="font-sans text-paragraphMd text-fg-subtle">ou</Text>
    <View className="h-px flex-1 bg-border-subtle" />
  </View>
);

/**
 * SignUp — tela "Crie sua conta": email, CTA (desabilitado até o formulário
 * ser válido), login social (Facebook/Google/AppleID), atalho para o login e
 * os termos de aceite. Apresentacional: dados, validação e navegação entram
 * por props. Segue "Cadastro 01 - Default" do Figma.
 */
export const SignUp = ({
  emailValue,
  onChangeEmail,
  canSubmit = false,
  onSubmit,
  onPressFacebook,
  onPressGoogle,
  onPressApple,
  onPressLogin,
  onPressTerms,
  onPressPrivacyPolicy,
}: SignUpProps): React.ReactElement => (
  <View className="flex-1 bg-surface-tag">
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="border-b border-border-subtle bg-surface-tag px-xxl pb-lg pt-[28px]">
        <Text className="font-sans text-authTitle text-fg-secondary">Crie sua conta</Text>
      </View>

      <View className="px-xxl pt-xl">
        <AuthTextField
          label="Email"
          icon="email"
          placeholder="Digite seu email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={emailValue}
          onChangeText={onChangeEmail}
        />
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
  </View>
);
