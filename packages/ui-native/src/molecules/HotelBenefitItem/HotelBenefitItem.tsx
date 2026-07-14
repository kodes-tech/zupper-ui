import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';
import type { IconName } from '../../atoms/Icon';

/**
 * Tom do benefício. `success` = verde (cancelamento grátis, café);
 * `warning` = aviso (sem cancelamento / consultar política) — nesse caso o
 * ícone é dourado e o texto fica neutro, como no app.
 */
export type HotelBenefitTone = 'success' | 'warning' | 'neutral';

export type HotelBenefitItemProps = {
  icon: IconName;
  text: string;
  tone?: HotelBenefitTone;
  /** Tamanho do ícone; padrão 20 (como nos cards de hotel). */
  iconSize?: number;
};

const iconColorByTone: Record<HotelBenefitTone, string> = {
  success: colors.feedback.success, // #44BA68
  warning: colors.feedback.warning, // #EAB308
  neutral: colors.text.subtle, // #737373
};

// No tom warning o app deixa o texto neutro (só o ícone é dourado).
const textColorClassByTone: Record<HotelBenefitTone, string> = {
  success: 'text-feedback-success',
  warning: 'text-fg-subtle',
  neutral: 'text-fg-subtle',
};

/**
 * HotelBenefitItem — linha de benefício (ícone + texto) usada em cancelamento,
 * café da manhã e afins nos cards de hotel/quarto. Extraído de HotelBenefitItem
 * do zupper-app; as cores por tom vêm de getHotelCancellationDisplay.
 */
export const HotelBenefitItem = ({
  icon,
  text,
  tone = 'success',
  iconSize = 20,
}: HotelBenefitItemProps): React.ReactElement => (
  <View className="flex-row items-center gap-xs">
    <Icon name={icon} size={iconSize} color={iconColorByTone[tone]} />
    <Text className={`flex-1 font-sans text-xs font-medium ${textColorClassByTone[tone]}`}>{text}</Text>
  </View>
);
