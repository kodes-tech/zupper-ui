import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Pressable, Text, View } from 'react-native';
import type { PressableProps } from 'react-native';
import { colors, radii, spacing } from '@kodes-tech/tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export type ButtonProps = PressableProps & {
  /** Texto do botão. Opcional — um botão só de ícone (ex.: fechar o FAB) não tem label. */
  label?: string;
  /** Ícone opcional, fornecido pelo consumidor (ainda não há um sistema de ícone no design system). */
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  /**
   * `primary` (padrão) — pill com gradiente, usado no FAB de Publicar.
   * `secondary` — pill outline, usado em ações como "Iniciar sessão".
   * `ghost` — só texto, sem fundo/borda, usado em ações destrutivas (ex.: "Sair da minha conta").
   */
  variant?: ButtonVariant;
  /** Ocupa a largura do container (ex.: botão "Publicar" do formulário). */
  fullWidth?: boolean;
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

const containerClassByVariant = {
  secondary:
    'flex-row items-center justify-center gap-md rounded-pill border border-brand-zupper px-screenMargin py-md',
  ghost: 'flex-row items-center justify-center gap-md rounded-pill px-screenMargin py-lg',
} as const;

const labelClassByVariant: Record<ButtonVariant, string> = {
  primary: 'font-sans text-buttonLabel text-fg-inverse',
  secondary: 'font-sans text-buttonLabelLg text-brand-zupper',
  ghost: 'font-sans text-buttonLabel text-feedback-danger',
};

/**
 * Button — botão base do design system, no padrão pill.
 * `primary` corresponde ao "Botão LG primario normal" do Figma (gradiente,
 * usado no FAB de Publicar/Dica/Foto/Roteiro/fechar). `secondary` corresponde
 * ao "Secundary button - App" (outline, ex.: "Iniciar sessão"). `ghost`
 * corresponde ao "Primary button - App" (só texto, ex.: "Sair da minha conta").
 */
export const Button = ({
  label,
  icon,
  iconPosition = 'right',
  variant = 'primary',
  fullWidth = false,
  ...rest
}: ButtonProps) => {
  const content = (
    <>
      {icon && iconPosition === 'left' ? icon : null}
      {label ? <Text className={labelClassByVariant[variant]}>{label}</Text> : null}
      {icon && iconPosition === 'right' ? icon : null}
    </>
  );

  if (variant === 'secondary' || variant === 'ghost') {
    return (
      <Pressable testID="button" className={fullWidth ? 'w-full' : undefined} {...rest}>
        <View
          testID="button-container"
          className={`${containerClassByVariant[variant]} ${fullWidth ? 'w-full' : ''}`}
        >
          {content}
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable testID="button" className={fullWidth ? 'w-full' : undefined} {...rest}>
      <LinearGradient
        testID="button-gradient"
        colors={[...colors.gradient.button]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={fullWidth ? { ...gradientStyle, width: '100%' } : gradientStyle}
      >
        {content}
      </LinearGradient>
    </Pressable>
  );
};
