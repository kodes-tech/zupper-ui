import React from 'react';
import { Pressable, Text } from 'react-native';
import type { PressableProps } from 'react-native';
import { Icon } from '../../atoms/Icon';
import type { IconName } from '../../atoms/Icon';

export type SocialProvider = 'facebook' | 'google' | 'apple';

export type SocialLoginButtonProps = PressableProps & {
  provider: SocialProvider;
  /** Texto completo do botão (ex.: "Acessar com Facebook" / "Criar conta com Google"). */
  label: string;
};

// Cores de marca de terceiros (Facebook/Apple) — fixas, não são tokens do
// design system. Google não leva ícone no Figma, só o texto neutro.
const borderClassByProvider: Record<SocialProvider, string> = {
  facebook: 'border-[#0866FF]',
  google: 'border-border-focus',
  apple: 'border-fg-secondary',
};

const textClassByProvider: Record<SocialProvider, string> = {
  facebook: 'text-[#0866FF]',
  google: 'text-fg-secondary',
  apple: 'text-fg-secondary',
};

const iconByProvider: Partial<Record<SocialProvider, IconName>> = {
  facebook: 'facebook-logo',
  apple: 'apple-logo',
};

/**
 * SocialLoginButton — botão pill outline de login/cadastro social (Facebook,
 * Google, AppleID). Apresentacional: rótulo entra por props para variar entre
 * "Acessar com" (Login) e "Criar conta com" (Cadastro). Segue "Social button
 * - App" do Figma.
 */
export const SocialLoginButton = ({
  provider,
  label,
  ...rest
}: SocialLoginButtonProps): React.ReactElement => {
  const icon = iconByProvider[provider];
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      className={`w-full flex-row items-center justify-center gap-md rounded-pill border bg-surface-default px-xxl py-md ${borderClassByProvider[provider]}`}
      {...rest}
    >
      {icon ? <Icon name={icon} size={24} /> : null}
      <Text className={`font-sans text-buttonLabelLg ${textClassByProvider[provider]}`}>{label}</Text>
    </Pressable>
  );
};
