import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Pressable, Text } from 'react-native';
import type { PressableProps } from 'react-native';
import { colors, radii, spacing } from '@zupper/tokens';

export type ButtonProps = PressableProps & {
  /** Texto do botão. Opcional — um botão só de ícone (ex.: fechar o FAB) não tem label. */
  label?: string;
  /** Ícone opcional, fornecido pelo consumidor (ainda não há um sistema de ícone no design system). */
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
};

// LinearGradient é ortogonal ao NativeWind (mesma exceção documentada do
// RoleBadge) — layout via style computado a partir dos tokens, não className.
const gradientStyle = {
  flexDirection: 'row' as const,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
  gap: spacing.md,
  borderRadius: radii.pill,
  padding: spacing.lg,
};

/**
 * Button — botão base do design system, no padrão pill com gradiente.
 * Corresponde ao "Botão LG primario normal" do Figma, usado no FAB de
 * Publicar (Publicar/Dica/Foto/Roteiro/fechar).
 *
 * Este é o único variant hoje; `secondary` (outline) e `ghost` (só texto)
 * entram como props deste mesmo componente em PRs seguintes, não como
 * componentes novos.
 */
export const Button = ({ label, icon, iconPosition = 'right', ...rest }: ButtonProps) => (
  <Pressable testID="button" {...rest}>
    <LinearGradient
      testID="button-gradient"
      colors={[...colors.gradient.button]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={gradientStyle}
    >
      {icon && iconPosition === 'left' ? icon : null}
      {label ? <Text className="font-sans text-buttonLabel text-fg-inverse">{label}</Text> : null}
      {icon && iconPosition === 'right' ? icon : null}
    </LinearGradient>
  </Pressable>
);
