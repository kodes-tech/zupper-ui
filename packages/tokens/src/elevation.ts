/**
 * Elevação neutra (agnóstica). Cada plataforma interpreta:
 * RN → props de shadow e elevation; web → box-shadow. TODO(Figma): calibrar.
 */
export const elevation = {
  none: 0,
  low: 1,
  medium: 3,
  high: 6,
} as const;

export type Elevation = typeof elevation;
