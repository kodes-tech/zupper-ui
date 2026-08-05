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

// `md` (44px) espelha exatamente o container do `Avatar` — mesmo tamanho já confirmado no
// Figma pra essa variante (avatar com foto e avatar sem foto ocupam o mesmo slot).
const containerClassBySize: Record<AvatarFallbackSize, string> = {
  sm: 'w-[28px] h-[28px] rounded-pill',
  md: 'w-[44px] h-[44px] rounded-pill',
  lg: 'w-[64px] h-[64px] rounded-pill',
};

// Razões do Figma (avatar de 64px -> iniciais 16pt / line-height 24) já calculadas
// para cada tamanho confirmado. Como `size` é um enum fixo, vira classe estática.
// (7px em `sm` está fora da escala — ver design-tokens-gaps.md, pendente designer.)
// `md`: SEM valor confirmado no Figma ainda — interpolado entre sm/lg (44px está entre 28
// e 64) e arredondado pra escala existente de fontSize (12 = xs). Placeholder até o designer
// confirmar; ver docs/design-tokens-gaps.md.
const labelClassBySize: Record<AvatarFallbackSize, string> = {
  sm: 'text-[7px] leading-[11px]',
  md: 'text-[12px] leading-[16px]',
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
