import React from 'react';
import { Text, View } from 'react-native';
import type { ViewProps } from 'react-native';

export type AvatarFallbackSize = 'sm' | 'lg';

export type AvatarFallbackProps = ViewProps & {
  /** sm = 28px (autor do post) · lg = 64px (saudação) — únicos tamanhos confirmados no Figma. */
  size?: AvatarFallbackSize;
  /** Iniciais mostradas quando não há foto, ex.: "HN". */
  initials: string;
};

const containerClassBySize: Record<AvatarFallbackSize, string> = {
  sm: 'w-[28px] h-[28px] rounded-[14px]',
  lg: 'w-[64px] h-[64px] rounded-[32px]',
};

// Razões do Figma (avatar de 64px -> iniciais 16pt / line-height 24) já calculadas
// para cada tamanho confirmado. Como `size` é um enum fixo (não um número livre),
// o resultado vira classe estática — não precisa computar nada em runtime.
const labelClassBySize: Record<AvatarFallbackSize, string> = {
  sm: 'text-[7px] leading-[11px]',
  lg: 'text-[16px] leading-[24px]',
};

/**
 * AvatarFallback — iniciais mostradas quando o usuário não tem foto.
 * Átomo separado do `Avatar` (que só cuida da imagem) em vez de ramificar
 * dentro de um único componente.
 */
export const AvatarFallback = ({ size = 'lg', initials, ...rest }: AvatarFallbackProps) => (
  <View
    testID="avatar-fallback"
    className={`items-center justify-center overflow-hidden bg-surface-default ${containerClassBySize[size]}`}
    {...rest}
  >
    <Text
      className={`text-center font-sans font-bold text-fg-muted tracking-[0.32px] ${labelClassBySize[size]}`}
    >
      {initials}
    </Text>
  </View>
);
