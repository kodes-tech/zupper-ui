/**
 * Cores do Community.
 * TODO(Figma): substituir os valores PLACEHOLDER abaixo pelos do design real (Dev Mode).
 */
export const colors = {
  primary: '#009DAF', // placeholder — trocar pelo Figma
  onPrimary: '#FFFFFF',
  text: {
    strong: '#171717',
    muted: '#737373',
    inverse: '#FFFFFF',
  },
  surface: {
    base: '#FFFFFF',
    card: '#F5F5F5',
    border: '#E5E5E5',
  },
  feedback: {
    success: '#44BA68',
    danger: '#E5484D',
    warning: '#F5A623',
  },
  like: '#E5484D',
} as const;

export type Colors = typeof colors;
