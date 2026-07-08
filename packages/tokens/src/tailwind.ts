import { colors } from './colors';
import { spacing } from './spacing';
import { radii } from './radii';
import { typography } from './typography';

/** Converte uma escala numérica (px) em strings com unidade (`16` → `'16px'`). */
const px = <T extends Record<string, number>>(obj: T): Record<keyof T, string> =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, `${value}px`]),
  ) as Record<keyof T, string>;

/**
 * Preset Tailwind gerado a partir dos tokens do Zupper.
 *
 * Fonte ÚNICA da ponte tokens → utilitários. É compartilhado por:
 *  - `@zupper/ui-native` (Storybook/jest — `tailwind.config.js` da lib);
 *  - o `tailwind.config.js` do **zupper-app** (que soma este preset ao seu).
 *
 * Não depende de `nativewind` — o consumidor soma `nativewind/preset` por cima.
 * Nomes de classe que este preset habilita:
 *   cores    → `bg-primary`, `text-fg-strong`, `bg-surface-card`, `bg-feedback-success`, `text-like` …
 *   spacing  → `p-md`, `px-sm`, `gap-lg` …
 *   radius   → `rounded-pill`, `rounded-md` …
 *   fonte    → `font-sans`, `text-caption`, `font-medium` …
 */
export const tailwindPreset = {
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        'on-primary': colors.onPrimary,
        like: colors.like,
        fg: colors.text, // text-fg-strong / text-fg-muted / text-fg-inverse
        surface: colors.surface, // bg-surface-base / bg-surface-card / border-surface-border
        feedback: colors.feedback, // bg-feedback-success / -danger / -warning
      },
      spacing: px(spacing),
      borderRadius: px(radii),
      fontFamily: { sans: [typography.family] },
      fontSize: px(typography.size),
      fontWeight: typography.weight,
      lineHeight: typography.lineHeight as Record<string, number>,
    },
  },
};

export type TailwindPreset = typeof tailwindPreset;
