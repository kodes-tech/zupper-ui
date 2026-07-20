import { iconSize } from '@kodes-tech/tokens';
import { Icon } from '@kodes-tech/icons';
import type { IconName } from '@kodes-tech/icons';
import React from 'react';
import { Pressable, Text } from 'react-native';

export type SocialProvider = 'facebook' | 'google' | 'apple';

export type SocialLoginButtonProps = {
  /** Provedor social — define ícone e a cor de marca. */
  provider: SocialProvider;
  /** Texto completo do botão (ex.: "Acessar com Facebook" / "Criar conta com Google"). */
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  testID?: string;
};

// Cores de MARCA de terceiros (Facebook/Apple) — fixas e imutáveis; NÃO são
// tokens do design system (não podemos alterar a identidade de terceiros), por
// isso o hardcode aqui é proposital. Google, por decisão do Figma, não leva
// ícone — só o texto neutro.
const brandBorderClass: Record<SocialProvider, string> = {
  facebook: 'border-[#0866FF]',
  google: 'border-border-focus',
  apple: 'border-fg-secondary',
};
const brandTextClass: Record<SocialProvider, string> = {
  facebook: 'text-[#0866FF]',
  google: 'text-fg-secondary',
  apple: 'text-fg-secondary',
};
const brandIcon: Partial<Record<SocialProvider, IconName>> = {
  facebook: 'facebook-logo',
  apple: 'apple-logo',
};

/**
 * SocialLoginButton — botão pill outline de login/cadastro social (Facebook,
 * Google, AppleID). O `label` entra por props para variar entre "Acessar com…"
 * (Login) e "Criar conta com…" (Cadastro). Apresentacional. As cores de marca
 * são de terceiros — hardcode proposital, não são tokens do DS.
 */
export const SocialLoginButton = ({
  provider,
  label,
  onPress,
  disabled = false,
  testID,
}: SocialLoginButtonProps): React.ReactElement => {
  const icon = brandIcon[provider];
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      testID={testID}
      className={`w-full flex-row items-center justify-center gap-md rounded-pill border bg-surface-default px-xxl py-md ${brandBorderClass[provider]}`}
    >
      {icon ? <Icon name={icon} size={iconSize.md} /> : null}
      <Text className={`font-sans text-buttonLabelLg ${brandTextClass[provider]}`}>{label}</Text>
    </Pressable>
  );
};
