/**
 * Escala de espaçamento do Community (grid de 8pt no Figma).
 * Valores unitless (density-independent pixels no React Native).
 */
export const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  xxxl: 32,
  /** margem horizontal de tela/seção (BottomNav, seções de destinos/comunidade). */
  screenMargin: 20,
} as const;

export type Spacing = typeof spacing;
