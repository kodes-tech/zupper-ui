import React from 'react';
import { Text, View } from 'react-native';

export type BadgeTone = 'neutral' | 'success' | 'danger';

export type BadgeProps = {
  label: string;
  tone?: BadgeTone;
};

// Classes vindas dos tokens (ver @zupper/tokens/tailwind): cores, radius, spacing e tipografia.
const containerByTone: Record<BadgeTone, string> = {
  neutral: 'bg-surface-card',
  success: 'bg-feedback-success',
  danger: 'bg-feedback-danger',
};

const labelByTone: Record<BadgeTone, string> = {
  neutral: 'text-fg-strong',
  success: 'text-fg-inverse',
  danger: 'text-fg-inverse',
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
    <Text className={`font-sans text-caption font-medium ${labelByTone[tone]}`}>{label}</Text>
  </View>
);
