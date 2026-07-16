import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Pressable, Text, View } from 'react-native';
import type { PressableProps } from 'react-native';
import { colors, radii, spacing } from '@kodes-tech/tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
/**
 * Par de cor de `secondary`/`ghost`. `brand` (padrão do `secondary`) é o teal
 * de marca (Iniciar sessão); `highlight` é o teal/border mais claro dos CTAs
 * de baixa ênfase dos sheets de denúncia (Cancelar, Fechar, Entenda as regras).
 * `ghost` sem `tone` mantém o vermelho destrutivo atual (Sair da minha conta).
 */
export type ButtonTone = 'brand' | 'highlight';

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
   * `danger` — pill preenchida (bg vermelho), ação destrutiva primária (ex.: "Denunciar publicação").
   */
  variant?: ButtonVariant;
  /** Ver `ButtonTone`. Só se aplica a `secondary`/`ghost`. */
  tone?: ButtonTone;
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

const secondaryBorderClassByTone: Record<ButtonTone, string> = {
  brand: 'border-brand-zupper',
  highlight: 'border-brand-borderHighlight',
};

const ghostContainerClass = 'flex-row items-center justify-center gap-md rounded-pill px-screenMargin py-lg';

const dangerContainerClass =
  'flex-row items-center justify-center gap-md rounded-pill bg-feedback-danger px-screenMargin py-md';

const containerClassByVariant = (variant: 'secondary' | 'ghost' | 'danger', tone: ButtonTone): string => {
  if (variant === 'danger') return dangerContainerClass;
  if (variant === 'ghost') return ghostContainerClass;
  return `flex-row items-center justify-center gap-md rounded-pill border ${secondaryBorderClassByTone[tone]} px-screenMargin py-md`;
};

const secondaryLabelClassByTone: Record<ButtonTone, string> = {
  brand: 'font-sans text-buttonLabelLg text-brand-zupper',
  highlight: 'font-sans text-buttonLabelLg text-brand-strong',
};

// `ghost` sem tone é a única cor original (vermelho destrutivo, "Sair da
// minha conta"); `tone="highlight"` é o link teal de baixa ênfase (Cancelar/
// Fechar) dos sheets de denúncia — mesmo token de texto do `secondary` highlight.
const ghostLabelClassByTone: Record<ButtonTone, string> = {
  brand: 'font-sans text-buttonLabel text-feedback-danger',
  highlight: 'font-sans text-buttonLabelLg text-brand-strong',
};

const labelClassByVariant = (variant: ButtonVariant, tone: ButtonTone): string => {
  if (variant === 'primary') return 'font-sans text-buttonLabel text-fg-inverse';
  if (variant === 'danger') return 'font-sans text-buttonLabel text-fg-inverse';
  if (variant === 'secondary') return secondaryLabelClassByTone[tone];
  return ghostLabelClassByTone[tone];
};

/**
 * Button — botão base do design system, no padrão pill.
 * `primary` corresponde ao "Botão LG primario normal" do Figma (gradiente,
 * usado no FAB de Publicar/Dica/Foto/Roteiro/fechar). `secondary` corresponde
 * ao "Secundary button - App" (outline, ex.: "Iniciar sessão"). `ghost`
 * corresponde ao "Primary button - App" (só texto, ex.: "Sair da minha conta").
 * `danger` é a hierarquia Danger do Figma (pill vermelha preenchida, ex.:
 * "Denunciar publicação"/"Excluir publicação"). `tone="highlight"` troca o
 * teal de `secondary`/`ghost` pelo par mais claro usado nos sheets de
 * denúncia (Cancelar, Fechar, Entenda as regras da comunidade).
 */
export const Button = ({
  label,
  icon,
  iconPosition = 'right',
  variant = 'primary',
  tone = 'brand',
  fullWidth = false,
  ...rest
}: ButtonProps) => {
  const content = (
    <>
      {icon && iconPosition === 'left' ? icon : null}
      {label ? <Text className={labelClassByVariant(variant, tone)}>{label}</Text> : null}
      {icon && iconPosition === 'right' ? icon : null}
    </>
  );

  if (variant === 'secondary' || variant === 'ghost' || variant === 'danger') {
    return (
      <Pressable testID="button" className={fullWidth ? 'w-full' : undefined} {...rest}>
        <View
          testID="button-container"
          className={`${containerClassByVariant(variant, tone)} ${fullWidth ? 'w-full' : ''}`}
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
