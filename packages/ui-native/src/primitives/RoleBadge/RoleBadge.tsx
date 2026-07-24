import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Text, View } from 'react-native';
import { radii, spacing } from '@kodes-tech/tokens';
import { useTheme } from '../../theme/ThemeProvider';

export type RoleBadgeVariant = 'guest' | 'traveler' | 'partner';

/** Contrato próprio — não estende `ViewProps` (regra de ouro do wrapper). */
export type RoleBadgeProps = {
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

// fontSize/lineHeight arbitrário (12px/16px, igual ao Figma) porque o peso varia
// por variante — o preset `text-badge` fixa weight medium, o que não serve pro
// traveler/partner (bold).
const labelClassByVariant: Record<RoleBadgeVariant, string> = {
  guest: 'text-badge font-medium text-fg-primary',
  traveler: 'text-badge font-bold text-brand-strong',
  partner: 'text-badge font-bold text-fg-inverse',
};

const containerBaseClassName = 'self-start overflow-hidden rounded-xs px-md py-xs';

// LinearGradient é ortogonal ao NativeWind — layout via style computado dos tokens.
const gradientStyle = {
  alignSelf: 'flex-start' as const,
  borderRadius: radii.xs,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.xs,
};

/**
 * RoleBadge — selo do papel do usuário no header do feed (Visitante/Viajante/Parceiro).
 * `guest`/`traveler` usam `className` (tokens); `partner` é gradiente (tokens via JS).
 */
export const RoleBadge = ({ variant, label }: RoleBadgeProps): React.ReactElement => {
  const text = label ?? defaultLabelByVariant[variant];
  // Gradiente é lido em JS (não acompanha a cascata de classes) — pega do tema ativo.
  const { colors } = useTheme();

  if (variant === 'partner') {
    return (
      <LinearGradient
        testID="role-badge"
        colors={[...colors.gradient.partner]}
        start={{ x: 0, y: 0.15 }}
        end={{ x: 1, y: 0.85 }}
        style={gradientStyle}
      >
        <Text className={labelClassByVariant.partner}>{text}</Text>
      </LinearGradient>
    );
  }

  return (
    <View
      testID="role-badge"
      className={`${containerBaseClassName} ${containerClassByVariant[variant]}`}
    >
      <Text className={labelClassByVariant[variant]}>{text}</Text>
    </View>
  );
};
