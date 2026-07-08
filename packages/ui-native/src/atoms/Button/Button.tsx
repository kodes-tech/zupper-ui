import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Pressable, Text, View } from 'react-native';
import type { PressableProps } from 'react-native';
import { colors, radii, spacing } from '@zupper/tokens';

export type ButtonVariant = 'primary' | 'secondary';

export type ButtonProps = PressableProps & {
  /** Texto do botão. Opcional — um botão só de ícone (ex.: fechar o FAB) não tem label. */
  label?: string;
  /** Ícone opcional, fornecido pelo consumidor (ainda não há um sistema de ícone no design system). */
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  /**
   * `primary` (padrão) — pill com gradiente, usado no FAB de Publicar.
   * `secondary` — pill outline, usado em ações como "Iniciar sessão".
   */
  variant?: ButtonVariant;
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

const secondaryClassName =
  'flex-row items-center justify-center gap-md rounded-pill border border-brand-zupper px-screenMargin py-md';

/**
 * Button — botão base do design system, no padrão pill.
 * `primary` corresponde ao "Botão LG primario normal" do Figma (gradiente,
 * usado no FAB de Publicar/Dica/Foto/Roteiro/fechar). `secondary` corresponde
 * ao "Secundary button - App" (outline, ex.: "Iniciar sessão").
 *
 * `ghost` (só texto) entra como prop deste mesmo componente numa PR seguinte,
 * não como componente novo.
 */
export const Button = ({
  label,
  icon,
  iconPosition = 'right',
  variant = 'primary',
  ...rest
}: ButtonProps) => {
  const content = (
    <>
      {icon && iconPosition === 'left' ? icon : null}
      {label ? (
        <Text
          className={
            variant === 'primary'
              ? 'font-sans text-buttonLabel text-fg-inverse'
              : 'font-sans text-buttonLabelLg text-brand-zupper'
          }
        >
          {label}
        </Text>
      ) : null}
      {icon && iconPosition === 'right' ? icon : null}
    </>
  );

  if (variant === 'secondary') {
    return (
      <Pressable testID="button" {...rest}>
        <View testID="button-outline" className={secondaryClassName}>
          {content}
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable testID="button" {...rest}>
      <LinearGradient
        testID="button-gradient"
        colors={[...colors.gradient.button]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={gradientStyle}
      >
        {content}
      </LinearGradient>
    </Pressable>
  );
};
