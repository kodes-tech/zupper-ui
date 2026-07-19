import React from 'react';
import { Text as RNText } from 'react-native';

/**
 * Variante de texto — mapeia 1:1 os presets `textVariant` dos `@kodes-tech/tokens`.
 * Passar por aqui (em vez de `className="text-[18px]"`) garante que o texto nunca
 * saia da escala tipográfica.
 */
export type TextVariant =
  | 'heading'
  | 'sectionTitle'
  | 'cardTitle'
  | 'bodyText'
  | 'bodyMd'
  | 'caption'
  | 'authorName'
  | 'buttonLabel'
  | 'buttonLabelLg'
  | 'badge'
  | 'actionLabel'
  | 'roteiroTitle'
  | 'inputLabel'
  | 'inputError'
  | 'avatarFallback';

/** Cor do texto — mapeia os tokens de cor de texto (nunca hex cru). */
export type TextColor =
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'inverse'
  | 'link'
  | 'heading'
  | 'body'
  | 'label'
  | 'subtle'
  | 'danger';

/**
 * Contrato PRÓPRIO — não estende `TextProps` do RN nem repassa props cruas.
 * O RN `Text` é detalhe interno (regra de ouro do wrapper).
 */
export type TextProps = {
  children: React.ReactNode;
  /** Preset tipográfico (token). Default: `bodyText`. */
  variant?: TextVariant;
  /** Cor do texto (token). Default: `primary`. */
  color?: TextColor;
  align?: 'left' | 'center' | 'right';
  numberOfLines?: number;
  testID?: string;
};

// NativeWind não detecta `text-${x}` dinâmico — as classes precisam ser LITERAIS.
const VARIANT_CLASS: Record<TextVariant, string> = {
  heading: 'text-heading',
  sectionTitle: 'text-sectionTitle',
  cardTitle: 'text-cardTitle',
  bodyText: 'text-bodyText',
  bodyMd: 'text-bodyMd',
  caption: 'text-caption',
  authorName: 'text-authorName',
  buttonLabel: 'text-buttonLabel',
  buttonLabelLg: 'text-buttonLabelLg',
  badge: 'text-badge',
  actionLabel: 'text-actionLabel',
  roteiroTitle: 'text-roteiroTitle',
  inputLabel: 'text-inputLabel',
  inputError: 'text-inputError',
  avatarFallback: 'text-avatarFallback',
};

const COLOR_CLASS: Record<TextColor, string> = {
  primary: 'text-fg-primary',
  secondary: 'text-fg-secondary',
  muted: 'text-fg-muted',
  inverse: 'text-fg-inverse',
  link: 'text-fg-link',
  heading: 'text-fg-heading',
  body: 'text-fg-body',
  label: 'text-fg-label',
  subtle: 'text-fg-subtle',
  danger: 'text-feedback-danger',
};

const ALIGN_CLASS: Record<NonNullable<TextProps['align']>, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

/**
 * Text — texto do design system. Aplica família + preset tipográfico + cor a
 * partir dos tokens (via NativeWind). Apresentacional e não-interativo (para
 * texto clicável use `Button`/`IconButton`).
 */
export const Text = ({
  children,
  variant = 'bodyText',
  color = 'primary',
  align,
  numberOfLines,
  testID,
}: TextProps): React.ReactElement => (
  <RNText
    numberOfLines={numberOfLines}
    testID={testID}
    className={`font-sans ${VARIANT_CLASS[variant]} ${COLOR_CLASS[color]}${
      align ? ` ${ALIGN_CLASS[align]}` : ''
    }`}
  >
    {children}
  </RNText>
);
