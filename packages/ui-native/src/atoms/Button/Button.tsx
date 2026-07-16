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

// Estado "Disabled" (eixo State do Button no Figma) — mesma aparência neutra
// independente da variante, por isso sobrepõe borda/texto em vez de compor.
// Fundo branco explícito (bg-surface-default): sem ele o botão fica
// transparente e herda o cinza da tela por trás.
const disabledContainerClass =
  'flex-row items-center justify-center gap-md rounded-pill border border-border-default bg-surface-default px-screenMargin py-md';

// `buttonLabel`/`buttonLabelLg` (tokens) são Bold, mas o rótulo do botão no
// Figma é sempre Satoshi:Medium (Avançar, Concluir, Publicar, Continuar
// respondendo…) — compõe direto em vez do preset pra não herdar o peso errado.
const LABEL_BASE = 'font-sans text-lg font-medium leading-[24px] tracking-[0.32px]';
const disabledLabelClass = `${LABEL_BASE} text-fg-muted`;

const labelClassByVariant: Record<ButtonVariant, string> = {
  primary: `${LABEL_BASE} text-fg-inverse`,
  secondary: `${LABEL_BASE} text-brand-zupper`,
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
  disabled,
  ...rest
}: ButtonProps) => {
  const content = (
    <>
      {icon && iconPosition === 'left' ? icon : null}
      {label ? (
        <Text className={disabled ? disabledLabelClass : labelClassByVariant[variant]}>
          {label}
        </Text>
      ) : null}
      {icon && iconPosition === 'right' ? icon : null}
    </>
  );

  if (disabled || variant === 'secondary' || variant === 'ghost') {
    return (
      <Pressable
        testID="button"
        className={fullWidth ? 'w-full' : undefined}
        disabled={disabled}
        {...rest}
      >
        <View
          testID="button-container"
          className={`${disabled ? disabledContainerClass : containerClassByVariant[variant as 'secondary' | 'ghost']} ${fullWidth ? 'w-full' : ''}`}
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
