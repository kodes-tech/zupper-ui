import { colors } from './colors';
import { spacing } from './spacing';
import { radii } from './radii';
import { typography } from './typography';

/** Converte uma escala numérica (px) em strings com unidade (`16` → `'16px'`). */
const px = <T extends Record<string, number>>(obj: T): Record<keyof T, string> =>
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, `${value}px`])) as Record<
    keyof T,
    string
  >;

/**
 * `fontSize` no formato tuple do Tailwind para os presets de texto compostos
 * (tamanho + altura de linha + tracking + peso), um por `textVariant`.
 * ⚠️ Validar no smoke-test da fundação se o NativeWind propaga o `fontWeight`
 * do tuple pro `Text` do RN; se não vier limpo, cai pra utility custom via plugin.
 */
const composedFontSize = Object.fromEntries(
  Object.entries(typography.textVariant).map(([name, preset]) => [
    name,
    [
      `${preset.fontSize}px`,
      {
        lineHeight: `${preset.lineHeight}px`,
        ...('letterSpacing' in preset ? { letterSpacing: `${preset.letterSpacing}px` } : {}),
        fontWeight: preset.fontWeight,
      },
    ],
  ]),
);

/**
 * Preset Tailwind gerado a partir dos tokens do Zupper (valores reais do
 * Figma "Zupper 2.0" — Community).
 *
 * Fonte ÚNICA da ponte tokens → utilitários. É compartilhado por:
 *  - `@zupper/ui-native` (Storybook/jest — `tailwind.config.js` da lib);
 *  - o `tailwind.config.js` do **zupper-app** (que soma este preset ao seu).
 *
 * Não depende de `nativewind` — o consumidor soma `nativewind/preset` por cima.
 * `gradient.*` fica de fora (arrays não são cor válida pro Tailwind) — gradientes
 * seguem consumindo os tokens direto via import JS (ver `LinearGradient`).
 * Nomes de classe que este preset habilita:
 *   cores    → `bg-brand-strong`, `text-fg-primary`, `bg-surface-tag`, `bg-partner-cardSurface` …
 *   spacing  → `p-md`, `px-sm`, `gap-lg`, `p-screenMargin` …
 *   radius   → `rounded-pill`, `rounded-md` …
 *   fonte    → `font-sans`, `text-xs`, `font-medium`, presets compostos `text-heading`, `text-authorName` …
 */
export const tailwindPreset = {
  theme: {
    extend: {
      colors: {
        brand: colors.brand,
        partner: colors.partner,
        fg: colors.text, // bg-fg-primary / text-fg-muted / text-fg-inverse …
        surface: colors.surface, // bg-surface-default / bg-surface-tag
        border: colors.border, // border-border-default
        feedback: colors.feedback, // text-feedback-danger
      },
      spacing: px(spacing),
      borderRadius: px(radii),
      fontFamily: { sans: [typography.family] },
      fontSize: { ...px(typography.size), ...composedFontSize },
      fontWeight: typography.weight,
    },
  },
};

export type TailwindPreset = typeof tailwindPreset;
