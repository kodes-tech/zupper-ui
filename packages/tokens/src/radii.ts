/** Border radius. TODO(Figma): confirmar os raios do Community. */
export const radii = {
  none: 0,
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
} as const;

export type Radii = typeof radii;
