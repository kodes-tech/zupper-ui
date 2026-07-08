/** Border radius do Community (valores unitless para React Native). */
export const radii = {
  none: 0,
  xs: 2, // tags (TypeTag / RoleBadge)
  sm: 4, // cards de conteúdo (PostCard)
  md: 8, // grupos com borda (RoteiroMeta "preview-rota")
  lg: 12,
  xl: 16,
  xxl: 24, // quick-action cards
  pill: 999, // cápsula completa
} as const;

export type Radii = typeof radii;
