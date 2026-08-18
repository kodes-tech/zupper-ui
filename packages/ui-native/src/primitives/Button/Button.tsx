import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { radii, spacing } from '@kodes-tech/tokens';
import { useTheme } from '../../theme/ThemeProvider';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
/**
 * Par de cor de `secondary`/`ghost`. `brand` (padrão do `secondary`) é o teal
 * de marca (Iniciar sessão); `highlight` é o teal/border mais claro dos CTAs
 * de baixa ênfase dos sheets de denúncia (Cancelar, Fechar, Entenda as regras).
 * `ghost` sem `tone` mantém o vermelho destrutivo atual (Sair da minha conta).
 */
export type ButtonTone = 'brand' | 'highlight';

/**
 * Contrato PRÓPRIO — não estende `PressableProps` nem repassa props cruas do RN.
 * O Pressable/gesto é detalhe interno (regra de ouro do wrapper).
 */
export type ButtonProps = {
  /** Texto do botão. Opcional — um botão só de ícone (ex.: fechar o FAB) não tem label. */
  label?: string;
  /** Ícone opcional, fornecido pelo consumidor (via `<Icon />`). */
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
  disabled?: boolean;
  /**
   * Estado "Loading" (eixo State do Button no Figma) — a ação está em curso.
   *
   * **Não é `disabled`, e a diferença é o ponto de existir:** desabilitado comunica
   * "não pode" (formulário incompleto) e por isso fica neutro/apagado; carregando
   * comunica "estou trabalhando", então o botão **mantém a aparência da variante** e
   * troca o conteúdo por um indicador. Usar o cinza de disabled nos dois casos era o
   * que tornava "enviando" indistinguível de "faltou preencher".
   *
   * Bloqueia o toque **por dentro**: o guard é do primitivo, não confiança no chamador
   * (KSA-448).
   */
  loading?: boolean;
  onPress?: () => void;
  /** Nome acessível — obrigatório na prática p/ botões só-ícone (sem `label`). */
  accessibilityLabel?: string;
  testID?: string;
};

// LinearGradient é ortogonal ao NativeWind (mesma exceção documentada do
// RoleBadge) — layout via style computado a partir dos tokens, não className.
// O gradiente é o FUNDO absoluto, não o container de layout: na New Architecture
// o react-native-linear-gradient mede errado quando é o container flex com
// borderRadius grande (o conteúdo colapsa pro rodapé e some).
//
// SEM `overflow: 'hidden'` aqui de propósito: no Android (New Architecture) um
// container com `overflow: hidden` e `borderRadius` muito maior que a própria
// altura (radii.pill = 999 num pill de ~64px) recorta TODO o conteúdo — o
// gradiente e o label somem e sobra só a área tocável do Pressable. O raio do
// pill vai no próprio gradiente (que o Android clampa ao desenhar o fundo).
const gradientStyle = {
  flexDirection: 'row' as const,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
  gap: spacing.md,
  borderRadius: radii.pill,
  padding: spacing.lg,
};

// Fundo do pill: preenche o container e leva o raio, dispensando o clip do pai.
const gradientBackgroundStyle = {
  position: 'absolute' as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  borderRadius: radii.pill,
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

// Estado "Disabled" (eixo State do Button no Figma) — mesma aparência neutra
// independente da variante, por isso sobrepõe borda/texto em vez de compor.
// Fundo branco explícito (bg-surface-default): sem ele o botão fica
// transparente e herda o cinza da tela por trás.
const disabledContainerClass =
  'flex-row items-center justify-center gap-md rounded-pill border border-border-default bg-surface-default px-screenMargin py-md';

const disabledLabelClass = 'font-sans text-buttonLabel text-fg-muted';

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
 * Cor do indicador de carregamento: a mesma do rótulo que ele substitui.
 *
 * Lida em JS porque `ActivityIndicator` recebe `color` por prop e não acompanha a
 * cascata do NativeWind — mesma exceção do gradiente, logo acima.
 */
const spinnerColorByVariant = (
  variant: ButtonVariant,
  tone: ButtonTone,
  colors: ReturnType<typeof useTheme>['colors'],
): string => {
  if (variant === 'primary' || variant === 'danger') return colors.text.inverse;
  if (variant === 'secondary') return tone === 'highlight' ? colors.brand.strong : colors.brand.zupper;
  // `ghost` sem tone é o vermelho destrutivo; com `highlight`, o teal de baixa ênfase.
  return tone === 'highlight' ? colors.brand.strong : colors.feedback.danger;
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
  disabled,
  loading = false,
  onPress,
  accessibilityLabel,
  testID = 'button',
}: ButtonProps) => {
  // Gradiente é lido em JS (não acompanha a cascata de classes) — pega do tema ativo.
  const { colors } = useTheme();
  // Carregando também não é tocável, mas por outro motivo que `disabled` (ver a prop):
  // a aparência segue a da variante, só o toque morre.
  const isPressBlocked = Boolean(disabled) || loading;
  /**
   * `key` do container — conserto do bug 🔴 do gradiente, movido para DENTRO do primitivo.
   *
   * O `react-native-linear-gradient` mede errado na New Architecture quando o container
   * troca de moldura (outline do disabled) para gradiente **no mesmo mount**: o conteúdo
   * colapsa e o botão desaparece. Até aqui, cada tela contornava remontando o `Button`
   * com um `key` externo (`personal-data.tsx`, `address.tsx`, `change-password.tsx`,
   * `ChangePhotoModal.tsx`) — e as quatro telas de auth, que não conheciam o truque,
   * ficavam com o bug.
   *
   * Chave que muda na borda disabled↔habilitado = mount novo do container e do gradiente,
   * medidos do zero. Sai de graça para o chamador, que é onde isso deveria estar desde o
   * começo: o gesto e o desenho são detalhe interno do primitivo (ADR 0010).
   *
   * ⚠️ Só o aparelho prova: é bug de medição nativa, invisível em teste unitário.
   */
  const visualState = disabled ? 'disabled' : variant;
  /**
   * Retorno do toque (KSA-446) — a regra por superfície mora em
   * `docs/conventions/interaction-states.md`: preenchida = véu forte por cima;
   * clara/outline = fundo sutil; só-texto = opacidade.
   *
   * Estado interno em vez da variante `active:` do NativeWind: aqui quem pinta é o
   * CONTAINER (filho), e o `active:` só acompanha o elemento que recebe o gesto (o
   * Pressable). Nos primitivos em que o className mora no próprio Pressable, a
   * variante resolve — ver FilterChip/SheetOption.
   */
  const [isPressed, setIsPressed] = useState(false);
  const handlePressIn = () => setIsPressed(true);
  const handlePressOut = () => setIsPressed(false);
  // Véu do state layer — pinta o próprio raio (mesma regra do gradiente: nada de
  // overflow hidden no pai). `pointerEvents="none"`: o véu nunca rouba o toque.
  const pressedOverlay =
    isPressed && !disabled ? (
      <View
        pointerEvents="none"
        testID="button-pressed-overlay"
        className="absolute inset-0 rounded-pill bg-state-pressedStrong"
      />
    ) : null;
  const pressedContainerClass =
    !isPressed || disabled
      ? ''
      : variant === 'ghost'
        ? 'opacity-pressed'
        : variant === 'secondary'
          ? 'bg-state-pressedSubtle'
          : '';
  const content = loading ? (
    // O spinner OCUPA o lugar do conteúdo, no mesmo slot — mesmo princípio do
    // ResultModal do app, onde ele vira o ícone em vez de aparecer ao lado.
    <ActivityIndicator
      testID="button-spinner"
      accessibilityLabel="Carregando"
      color={spinnerColorByVariant(variant, tone, colors)}
    />
  ) : (
    <>
      {icon && iconPosition === 'left' ? icon : null}
      {label ? (
        <Text className={disabled ? disabledLabelClass : labelClassByVariant(variant, tone)}>
          {label}
        </Text>
      ) : null}
      {icon && iconPosition === 'right' ? icon : null}
    </>
  );

  if (disabled || variant === 'secondary' || variant === 'ghost' || variant === 'danger') {
    return (
      <Pressable
        testID={testID}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityState={{ disabled: isPressBlocked, busy: loading }}
        className={fullWidth ? 'w-full' : undefined}
        disabled={isPressBlocked}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View
          key={visualState}
          testID="button-container"
          className={`${disabled ? disabledContainerClass : containerClassByVariant(variant as 'secondary' | 'ghost' | 'danger', tone)} ${fullWidth ? 'w-full' : ''} ${pressedContainerClass}`}
        >
          {/* Véu ANTES do conteúdo: o state layer fica entre a superfície e o label (Material). */}
          {variant === 'danger' ? pressedOverlay : null}
          {content}
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: isPressBlocked, busy: loading }}
      className={fullWidth ? 'w-full' : undefined}
      disabled={isPressBlocked}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <View
        key={visualState}
        testID="button-container"
        style={fullWidth ? { ...gradientStyle, width: '100%' } : gradientStyle}
      >
        <LinearGradient
          testID="button-gradient"
          colors={[...colors.gradient.button]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={gradientBackgroundStyle}
        />
        {/* Véu entre o gradiente e o conteúdo — o label não é tingido pelo state layer. */}
        {pressedOverlay}
        {content}
      </View>
    </Pressable>
  );
};
