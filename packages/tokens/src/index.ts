export * from './colors';
export * from './spacing';
export * from './typography';
export * from './radii';
export * from './elevation';

import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';
import { radii } from './radii';
import { elevation } from './elevation';

/** Objeto único com todos os tokens (útil como theme de styled-components). */
export const tokens = {
  colors,
  spacing,
  typography,
  radii,
  elevation,
} as const;

export type Tokens = typeof tokens;
