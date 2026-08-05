/** Dimensões fixas do Community (valores unitless para React Native). */
export const sizes = {
  /** altura de campos de formulário (Input) — touch target confortável */
  control: 44,
  /** altura do SearchInput — Figma Community (maior que o control padrão). */
  controlLg: 56,
} as const;

export type Sizes = typeof sizes;

/**
 * Lado do avatar (container quadrado, sempre `rounded-pill`). Mesmos slots para
 * a versão com foto (`Avatar`) e a de iniciais (`AvatarFallback`) — as duas
 * ocupam exatamente o mesmo espaço na tela.
 *   sm = autor do post · md = header de conteúdo/conta · lg = saudação.
 */
export const avatarSize = {
  sm: 28,
  md: 44,
  lg: 64,
} as const;

export type AvatarSizeScale = typeof avatarSize;

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
