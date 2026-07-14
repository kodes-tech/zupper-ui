import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Text, View } from 'react-native';
import type { ViewProps } from 'react-native';
import { colors, radii, spacing } from '@kodes-tech/tokens';

export type RoleBadgeVariant = 'guest' | 'traveler' | 'partner';

export type RoleBadgeProps = ViewProps & {
  variant: RoleBadgeVariant;
  /** Sobrescreve o label padrão da variante (guest → "Visitante", traveler → "Viajante", partner → "Parceiro"). */
  label?: string;
};

const defaultLabelByVariant: Record<RoleBadgeVariant, string> = {
  guest: 'Visitante',
  traveler: 'Viajante',
  partner: 'Parceiro',
};

const containerClassByVariant: Record<'guest' | 'traveler', string> = {
  guest: 'bg-surface-default',
  traveler: 'bg-brand-chipSurface',
};

// fontSize/lineHeight em valor arbitrário (12px/16px, igual ao Figma) porque o
// peso varia por variante — o preset composto `text-badge` fixa weight medium
// para todo mundo, o que não serve pro traveler/partner (bold).
const labelClassByVariant: Record<RoleBadgeVariant, string> = {
  guest: 'text-[12px] leading-[16px] font-medium text-fg-primary',
  traveler: 'text-[12px] leading-[16px] font-bold text-brand-strong',
  partner: 'text-[12px] leading-[16px] font-bold text-fg-inverse',
};

const containerBaseClassName = 'self-start overflow-hidden rounded-xs px-md py-xs';

// LinearGradient é ortogonal ao NativeWind — layout via style computado a
// partir dos tokens (ver plano de migração, exceção documentada p/ gradientes).
const gradientStyle = {
  alignSelf: 'flex-start' as const,
  borderRadius: radii.xs,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.xs,
};

/**
 * RoleBadge — selo do papel do usuário no header do feed (Visitante/Viajante/Parceiro).
 * `guest`/`traveler` usam `className` (tokens); `partner` é gradiente, então
 * consome os tokens de cor via JS diretamente.
 */
export const RoleBadge = ({
  variant,
  label,
  style,
  ...rest
}: RoleBadgeProps): React.ReactElement => {
  const text = label ?? defaultLabelByVariant[variant];

  if (variant === 'partner') {
    return (
      <LinearGradient
        testID="role-badge"
        colors={[...colors.gradient.partner]}
        start={{ x: 0, y: 0.15 }}
        end={{ x: 1, y: 0.85 }}
        style={[gradientStyle, style]}
        {...rest}
      >
        <Text className={labelClassByVariant.partner}>{text}</Text>
      </LinearGradient>
    );
  }

  return (
    <View
      testID="role-badge"
      className={`${containerBaseClassName} ${containerClassByVariant[variant]}`}
      style={style}
      {...rest}
    >
      <Text className={labelClassByVariant[variant]}>{text}</Text>
    </View>
  );
};
