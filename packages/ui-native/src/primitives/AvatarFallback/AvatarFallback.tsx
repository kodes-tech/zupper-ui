import React from 'react';
import { Text, View } from 'react-native';

export type AvatarFallbackSize = 'sm' | 'lg';

/** Contrato próprio — não estende `ViewProps` (regra de ouro do wrapper). */
export type AvatarFallbackProps = {
  /** sm = 28px (autor do post) · lg = 64px (saudação) — únicos tamanhos confirmados no Figma. */
  size?: AvatarFallbackSize;
  /** Iniciais mostradas quando não há foto, ex.: "HN". */
  initials: string;
  accessibilityLabel?: string;
};

const containerClassBySize: Record<AvatarFallbackSize, string> = {
  sm: 'w-[28px] h-[28px] rounded-pill',
  lg: 'w-[64px] h-[64px] rounded-pill',
};

// Razões do Figma (avatar de 64px -> iniciais 16pt / line-height 24) já calculadas
// para cada tamanho confirmado. Como `size` é um enum fixo, vira classe estática.
// (7px em `sm` está fora da escala — ver design-tokens-gaps.md, pendente designer.)
const labelClassBySize: Record<AvatarFallbackSize, string> = {
  sm: 'text-[7px] leading-[11px]',
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
