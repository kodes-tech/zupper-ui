export * from './colors';
export * from './spacing';
export * from './typography';
export * from './radii';
export * from './elevation';
export * from './sizes';
export { themes, getTheme, themeVars, type ThemeName, type ThemeColors } from './themes';

import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';
import { radii } from './radii';
import { elevation } from './elevation';
import { sizes, iconSize } from './sizes';

/** Objeto único com todos os tokens (acesso agregado ergonômico). */
export const tokens = {
  colors,
  spacing,
  typography,
  radii,
  elevation,
  sizes,
  iconSize,
} as const;

export type Tokens = typeof tokens;
