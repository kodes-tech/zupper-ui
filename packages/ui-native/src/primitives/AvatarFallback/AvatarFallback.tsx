import React from 'react';
import { Text, View } from 'react-native';

export type AvatarFallbackSize = 'sm' | 'md' | 'lg';

/** Contrato próprio — não estende `ViewProps` (regra de ouro do wrapper). */
export type AvatarFallbackProps = {
  /** sm = 28px (autor do post) · md = 44px (header de conteúdo/conta) · lg = 64px (saudação). */
  size?: AvatarFallbackSize;
  /** Iniciais mostradas quando não há foto, ex.: "HN". */
  initials: string;
  accessibilityLabel?: string;
};

// Lados vêm do token `avatarSize` (sm 28 · md 44 · lg 64) — os mesmos slots do `Avatar`,
// já que a versão com foto e a de iniciais ocupam exatamente o mesmo espaço.
const containerClassBySize: Record<AvatarFallbackSize, string> = {
  sm: 'w-avatar-sm h-avatar-sm rounded-pill',
  md: 'w-avatar-md h-avatar-md rounded-pill',
  lg: 'w-avatar-lg h-avatar-lg rounded-pill',
};

// Razões do Figma (avatar de 64px -> iniciais 16pt / line-height 24) já calculadas
// para cada tamanho confirmado. Como `size` é um enum fixo, vira classe estática.
// (7px em `sm` está fora da escala — ver design-tokens-gaps.md, pendente designer.)
// `md`: o Figma não tem essa variante desenhada. Em vez de inventar um valor, usamos o
// degrau existente da escala (`text-xs` = 12) com o mesmo leading 16 que TODOS os presets
// de 12px dos tokens usam (`badge`/`caption`/`actionLabel`). Provisório até o designer
// oficializar — ver docs/design-tokens-gaps.md.
const labelClassBySize: Record<AvatarFallbackSize, string> = {
  sm: 'text-[7px] leading-[11px]',
  md: 'text-xs leading-[16px]',
  lg: 'text-[16px] leading-[24px]',
};

/**
 * AvatarFallback — iniciais mostradas quando o usuário não tem foto.
 * Átomo separado do `Avatar` (que só cuida da imagem).
 */
export const AvatarFallback = ({
  size = 'lg',
  initials,
  accessibilityLabel,
}: AvatarFallbackProps): React.ReactElement => (
  <View
    testID="avatar-fallback"
    accessibilityLabel={accessibilityLabel}
    className={`items-center justify-center overflow-hidden bg-surface-default ${containerClassBySize[size]}`}
  >
    <Text
      className={`text-center font-sans font-bold text-fg-muted tracking-[0.32px] ${labelClassBySize[size]}`}
    >
      {initials}
    </Text>
  </View>
);
