import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Pressable, Text, View } from 'react-native';
import type { PressableProps } from 'react-native';
import { colors, radii, spacing } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';
import type { IconName } from '../../atoms/Icon';

/** Ícones de selo válidos para o card de oferta. */
export type OfferIcon = Extract<
  IconName,
  'oferta-passagens' | 'oferta-hospedagens' | 'oferta-pacotes'
>;

export type OfferCardProps = PressableProps & {
  /** Selo da oferta (ex.: "Passagens aéreas"). */
  title: string;
  /** Ícone do selo. */
  icon: OfferIcon;
  /** Rótulo do preço (ex.: "Voos a partir"). */
  priceLabel: string;
  /** Valor destacado (ex.: "R$ 1.086"). */
  price: string;
  /** Intervalo de datas (ex.: "Jul 12 – Jul 19"). */
  dateRange: string;
  /** Texto do CTA (ex.: "Ver passagens"). */
  ctaLabel: string;
  /** Ocupa a largura do container (linha com `flex`). Padrão: largura fixa de 160px (carrossel). */
  fill?: boolean;
};

// LinearGradient é ortogonal ao NativeWind (mesma exceção do Button/RoleBadge):
// layout do CTA via style computado a partir dos tokens, não className.
const ctaStyle = {
  width: '100%' as const,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
  borderRadius: radii.pill,
  paddingVertical: spacing.lg,
  paddingHorizontal: spacing.md,
};

/**
 * OfferCard — card-oferta de "Detalhes do destino": selo (título + ícone),
 * preço a partir de, intervalo de datas e CTA com gradiente da marca.
 * Apresentacional: dados por props; ação por onPress.
 */
export const OfferCard = ({
  title,
  icon,
  priceLabel,
  price,
  dateRange,
  ctaLabel,
  fill = false,
  ...rest
}: OfferCardProps): React.ReactElement => (
  <Pressable
    accessibilityRole="button"
    className={`gap-lg rounded-xxl border border-border-default bg-surface-default p-lg ${
      fill ? 'flex-1' : 'w-[160px]'
    }`}
    {...rest}
  >
    <View className="w-full flex-row items-center justify-between rounded-pill bg-brand-cardSurface px-md py-xs">
      <Text className="font-sans text-badge text-brand-strong">{title}</Text>
      <Icon name={icon} size={16} />
    </View>

    <View className="w-full">
      <Text className="font-sans text-bodyMd text-fg-primary">{priceLabel}</Text>
      <Text className="font-sans text-lg text-fg-primary">
        de <Text className="font-bold">{price}</Text>
      </Text>
    </View>

    <View className="w-full flex-row items-center gap-xs">
      <Icon name="calendar" size={16} />
      <Text className="font-sans text-caption text-fg-muted">{dateRange}</Text>
    </View>

    <LinearGradient
      testID="offer-cta-gradient"
      colors={[...colors.gradient.brand]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={ctaStyle}
    >
      <Text className="font-sans text-buttonLabel text-fg-inverse">{ctaLabel}</Text>
    </LinearGradient>
  </Pressable>
);
