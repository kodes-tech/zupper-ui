import React from 'react';
import { Text, View } from 'react-native';

export type BadgeTone = 'neutral' | 'brand' | 'partner';

export type BadgeProps = {
  label: string;
  tone?: BadgeTone;
};

// Classes vindas dos tokens (ver @kodes-tech/tokens/tailwind): cores, radius, spacing e tipografia.
const containerByTone: Record<BadgeTone, string> = {
  neutral: 'bg-surface-tag',
  brand: 'bg-brand-chipSurface',
  partner: 'bg-partner-cardSurface',
};

const labelByTone: Record<BadgeTone, string> = {
  neutral: 'text-fg-primary',
  brand: 'text-brand-strong',
  partner: 'text-fg-primary',
};

/**
 * Badge — molde de referência dos componentes do Community.
 * Padrão: React Native + `className` (NativeWind) + tokens. Sem chamada de API.
 *
 * As classes ficam como string no build publicado; é o pipeline NativeWind do
 * app consumidor (babel + metro + tailwind) que as resolve em estilo.
 */
export const Badge = ({ label, tone = 'neutral' }: BadgeProps): React.ReactElement => (
  <View className={`self-start rounded-pill px-sm py-xs ${containerByTone[tone]}`}>
    <Text className={`font-sans text-xs font-medium ${labelByTone[tone]}`}>{label}</Text>
  </View>
);
