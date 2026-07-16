import type { TextStyle } from 'react-native';

/**
 * Tipografia do Community. Fonte "Satoshi" (registrada nativamente pelo app;
 * aqui só referenciamos o nome, não os arquivos da fonte).
 */
export const fontFamily = 'Satoshi';

export const fontWeight = {
  regular: '400',
  medium: '500',
  bold: '700',
} as const;

export const fontSize = {
  xs: 12,
  sm: 13,
  md: 14,
  lg: 16,
  xl: 20,
  xxl: 24,
} as const;

/**
 * Presets de texto prontos (combinam família + tamanho + peso + line-height +
 * letter-spacing). Adicionar novos presets aqui conforme os componentes
 * precisarem, para manter o estilo de texto centralizado nos tokens.
 */
export const textVariant = {
  badge: { fontFamily, fontSize: fontSize.xs, fontWeight: fontWeight.medium, lineHeight: 16 },
  actionLabel: { fontFamily, fontSize: fontSize.xs, fontWeight: fontWeight.bold, lineHeight: 16 },
  caption: { fontFamily, fontSize: fontSize.xs, fontWeight: fontWeight.medium, lineHeight: 16 },
  // "Paragrafo MD - App" do Figma (Satoshi Medium 14 / lh20 / 2%). Texto de corpo
  // dominante nas telas de Pedidos (título do produto, nº do pedido, viajantes,
  // datas, selo de situação). Para a variante em negrito, some `font-bold`.
  paragraphMd: {
    fontFamily,
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    lineHeight: 20,
    letterSpacing: 0.28,
  },
  authorName: {
    fontFamily,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    lineHeight: 17,
    letterSpacing: 0.28,
  },
  bodyText: {
    fontFamily,
    fontSize: fontSize.md,
    fontWeight: fontWeight.regular,
    lineHeight: 17,
    letterSpacing: 0.28,
  },
  roteiroTitle: {
    fontFamily,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    lineHeight: 17,
    letterSpacing: 0.28,
  },
  // título de campo de formulário (Input) — line-height 100% no Figma
  inputLabel: {
    fontFamily,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    lineHeight: 14,
  },
  // mensagem de erro do Input — paridade com o app antigo (Typography md + medium)
  inputError: {
    fontFamily,
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    lineHeight: 17,
  },
  heading: {
    fontFamily,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    lineHeight: 24,
    letterSpacing: 0.48,
  },
  bodyMd: {
    fontFamily,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.medium,
    lineHeight: 16,
    letterSpacing: 0.32,
  },
  avatarFallback: {
    fontFamily,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    lineHeight: 24,
    letterSpacing: 0.32,
    textAlign: 'center',
  },
  cardTitle: {
    fontFamily,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    lineHeight: 16,
    letterSpacing: 0.32,
  },
  buttonLabel: {
    fontFamily,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    lineHeight: 20,
    letterSpacing: 0.28,
  },
  buttonLabelLg: {
    fontFamily,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    lineHeight: 24,
    letterSpacing: 0.32,
  },
  sectionTitle: {
    fontFamily,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    lineHeight: 20,
  },
} as const satisfies Record<string, TextStyle>;

/** Objeto agregado — acesso ergonômico único (`typography.family`, `typography.textVariant.heading`). */
export const typography = {
  family: fontFamily,
  weight: fontWeight,
  size: fontSize,
  textVariant,
} as const;

export type Typography = typeof typography;
