/** Dimensões fixas do Community (valores unitless para React Native). */
export const sizes = {
  /** altura de campos de formulário (Input) — touch target confortável */
  control: 44,
} as const;

export type Sizes = typeof sizes;

/**
 * Escala de tamanho de ícone (passada ao `size` do `@kodes-tech/icons`).
 * Derivada do uso real nos componentes: `lg` (24) é o default. Glifos grandes de
 * ilustração/empty-state (40/48/72) NÃO entram aqui — não são ícones de UI.
 * TODO(Figma): validar a escala com o designer.
 */
export const iconSize = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
} as const;

export type IconSize = typeof iconSize;
