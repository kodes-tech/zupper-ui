import React from 'react';
import { Image, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';

export type AvatarSize = 'sm' | 'md' | 'lg';

/** Contrato próprio — não estende `ViewProps` (regra de ouro do wrapper). */
export type AvatarProps = {
  /** sm = 28px (autor do post) · md = 44px (header do conteúdo) · lg = 64px (saudação) — tamanhos confirmados no Figma. */
  size?: AvatarSize;
  source: ImageSourcePropType;
  /** Texto alternativo da imagem (a11y). */
  accessibilityLabel?: string;
};

const containerClassBySize: Record<AvatarSize, string> = {
  sm: 'w-[28px] h-[28px] rounded-[14px]',
  md: 'w-[44px] h-[44px] rounded-[22px]',
  lg: 'w-[64px] h-[64px] rounded-[32px]',
};

/**
 * Avatar — foto do usuário. Quando não há foto, usar `AvatarFallback`
 * (iniciais) em vez de ramificar dentro deste componente.
 *
 * `size` é um enum fixo (não um número livre): como só existem tamanhos
 * confirmados no Figma, dá pra expressar tudo como `className` estático.
 */
export const Avatar = ({
  size = 'lg',
  source,
  accessibilityLabel,
}: AvatarProps): React.ReactElement => (
  <View
    testID="avatar-container"
    className={`overflow-hidden bg-surface-default ${containerClassBySize[size]}`}
  >
    <Image
      testID="avatar-image"
      source={source}
      accessibilityLabel={accessibilityLabel}
      className="w-full h-full"
      resizeMode="cover"
    />
  </View>
);
