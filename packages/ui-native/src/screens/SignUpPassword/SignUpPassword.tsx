import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';

import { AuthTextField } from '../../molecules/AuthTextField';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';

export type PasswordRequirement = {
  label: string;
  met: boolean;
};

export type SignUpPasswordProps = {
  passwordValue?: string;
  onChangePassword?: (value: string) => void;
  passwordVisible?: boolean;
  onTogglePasswordVisibility?: () => void;
  /** Regras de senha (ex.: "Letra maiúscula", "8 caracteres") com o estado atendido/não atendido. */
  requirements: PasswordRequirement[];
  /** Habilita "Cadastrar" — o app decide com base na validade da senha. */
  canSubmit?: boolean;
  onSubmit?: () => void;
  onPressTerms?: () => void;
  onPressPrivacyPolicy?: () => void;
  overlay?: React.ReactNode;
};

/**
 * SignUpPassword — tela "Crie sua senha": segundo passo do cadastro (depois
 * do email em `SignUp`). Senha + checklist de requisitos + CTA (desabilitado
 * até a senha ser válida) + termos de aceite. Apresentacional: dados,
 * validação e navegação entram por props. Segue "Cadastro Senha 01 - Active"
 * do Figma.
 */
export const SignUpPassword = ({
  passwordValue,
  onChangePassword,
  passwordVisible = false,
  onTogglePasswordVisibility,
  requirements,
  canSubmit = false,
  onSubmit,
  onPressTerms,
  onPressPrivacyPolicy,
  overlay,
}: SignUpPasswordProps): React.ReactElement => (
  <View className="flex-1 bg-surface-tag">
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="border-b border-border-subtle bg-surface-tag px-xxl pb-lg pt-[28px]">
        <Text className="font-sans text-authTitle text-fg-secondary">Crie sua senha</Text>
      </View>

      <View className="gap-md px-xxl pt-xl">
        <AuthTextField
          label="Senha"
          icon="lock"
          placeholder="Digite sua senha"
          secureTextEntry={!passwordVisible}
          trailingIcon={passwordVisible ? 'eye' : 'eye-slash'}
          onPressTrailingIcon={onTogglePasswordVisibility}
          value={passwordValue}
          onChangeText={onChangePassword}
        />

        <View className="flex-row flex-wrap gap-x-xxl gap-y-md rounded-sm border border-border-subtle bg-surface-default px-md py-lg">
          {requirements.map((requirement) => (
            <View key={requirement.label} className="flex-row items-center gap-xs">
              <Icon
                name={requirement.met ? 'success-check' : 'close-circle'}
                size={24}
                color={requirement.met ? colors.feedback.success : colors.feedback.danger}
              />
              <Text className="font-sans text-caption text-fg-body">{requirement.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="items-center gap-lg px-xxl py-xxl">
        <Button label="Cadastrar" fullWidth disabled={!canSubmit} onPress={onSubmit} />
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
