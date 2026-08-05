import type { Config } from 'tailwindcss';
import { colors } from './colors';
import { colorVarRefs } from './themes';
import { spacing } from './spacing';
import { radii } from './radii';
import { typography } from './typography';
import { sizes, avatarSize } from './sizes';

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
 * Escala do avatar em chaves **planas** (`avatar-sm`/`avatar-md`/`avatar-lg`), NÃO
 * aninhada sob `avatar`. O Tailwind v3 só achata objeto aninhado em `colors` (via
 * `flattenColorPalette`); em `width`/`height` o objeto vaza pro CSS como seletor
 * malformado (`.w-avatar width { sm: 28px; … }`) e nenhum `w-avatar-lg` chega a ser
 * gerado — o container do avatar fica sem dimensão e colapsa em todo consumidor.
 * O `satisfies Partial<Config>` abaixo é o que impede a regressão voltar.
 */
const avatarScale = Object.fromEntries(
  Object.entries(avatarSize).map(([key, value]) => [`avatar-${key}`, `${value}px`]),
) as Record<`avatar-${keyof typeof avatarSize}`, string>;

/**
 * Preset Tailwind gerado a partir dos tokens do Zupper (valores reais do
 * Figma "Zupper 2.0" — Community).
 *
 * Fonte ÚNICA da ponte tokens → utilitários. É compartilhado por:
 *  - `@kodes-tech/ui-native` (Storybook/jest — `tailwind.config.js` da lib);
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
 *   dimensão → `h-control` (campos de formulário) · `w-avatar-md`/`h-avatar-md` (avatares) …
 *
 * THEMING: as cores NÃO são hex fixos — cada uma resolve `rgb(var(--color-…) / <alpha>)`
 * (ver `colorVarRefs` em `themes.ts`). O valor da variável vem do tema ativo
 * (`theme.css` gerado dos tokens; troca via `[data-theme]` no web / `vars()` no app).
 * `scrim` segue literal (não-temável por ora) — evita refatorar as classes `bg-scrim`.
 */
const themedColors = colorVarRefs();

export const tailwindPreset = {
  theme: {
    extend: {
      colors: {
        brand: themedColors.brand,
        partner: themedColors.partner,
        fg: themedColors.fg, // bg-fg-primary / text-fg-muted / text-fg-inverse …
        surface: themedColors.surface, // bg-surface-default / bg-surface-tag
        border: themedColors.border, // border-border-default
        feedback: themedColors.feedback, // border-feedback-danger / text-feedback-danger
        scrim: colors.scrim, // bg-scrim — véu de bottom sheet / diálogo modal (literal, não-temável)
      },
      spacing: px(spacing),
      height: { ...px(sizes), ...avatarScale },
      minHeight: px(sizes),
      width: avatarScale,
      borderRadius: px(radii),
      fontFamily: { sans: [typography.family] },
      fontSize: { ...px(typography.size), ...composedFontSize },
      fontWeight: typography.weight,
    },
  },
} satisfies Partial<Config>;

export type TailwindPreset = typeof tailwindPreset;
