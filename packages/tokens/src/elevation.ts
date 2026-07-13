/**
 * Elevação neutra (agnóstica). Cada plataforma interpreta:
 * RN → shadow* (iOS) ou elevation (Android); web → box-shadow. TODO(Figma): calibrar.
 */
export const elevation = {
  none: 0,
  low: 1,
  medium: 3,
  high: 6,
} as const;

export type Elevation = typeof elevation;
