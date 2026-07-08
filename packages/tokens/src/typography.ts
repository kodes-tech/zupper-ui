/** Tipografia. TODO(Figma): confirmar família/escala do design do Community. */
export const typography = {
  family: 'Satoshi',
  size: {
    caption: 12,
    body: 14,
    label: 16,
    title: 18,
    h2: 22,
    h1: 28,
  },
  weight: {
    regular: '400',
    medium: '500',
    bold: '700',
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
} as const;

export type Typography = typeof typography;
