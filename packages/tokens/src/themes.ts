/**
 * Temas do design system.
 *
 * Objetivo (ADR 0005): `@kodes-tech/tokens` define **múltiplos temas** e a ativação
 * (ligar o dark, ou um tema sazonal como Natal) vem de uma flag remota lida pelo app.
 * Aqui ficam só os **valores**; a ativação é responsabilidade de cada consumidor.
 *
 * `colors.ts` continua sendo o hex canônico (= tema `default`). Cada tema guarda hex
 * (legível, alinhável ao Figma e usável direto em JS via `getTheme`). As **variáveis
 * CSS** (`--color-…`, formato `R G B` exigido pelo `<alpha-value>` do Tailwind) e as
 * referências do preset são DERIVADAS daqui — fonte única, sem CSS escrito à mão.
 *
 * ⚠️ Valores do `dark` são PROVISÓRIOS (`TODO(Figma)`) — não há paleta dark no Figma
 * do Community ainda. Trocar pelos reais quando existirem (mesmo status dos demais tokens).
 */
import { colors, type Colors } from './colors';

/**
 * `Colors` com os literais de string alargados para `string` — cada tema traz os
 * MESMOS campos, mas com valores próprios (o `as const` de `colors` fixaria o hex do
 * `default`). Tuplas (`gradient`) e `scrim` (string) são preservadas.
 */
type Widen<T> = T extends string
  ? string
  : T extends readonly unknown[]
    ? T
    : { [K in keyof T]: Widen<T[K]> };
export type ThemeColors = Widen<Colors>;

/**
 * Grupos de cor que viram utilitários temáveis (variável CSS + classe Tailwind).
 * Renomeia `text`→`fg` (nome exposto no preset: `text-fg-primary`). Ficam de fora:
 * `gradient` (arrays — consumidos em JS via `LinearGradient`) e `scrim` (literal no
 * preset, não-temável por ora).
 */
const toColorGroups = (c: ThemeColors) => ({
  brand: c.brand,
  partner: c.partner,
  fg: c.text,
  surface: c.surface,
  border: c.border,
  feedback: c.feedback,
});

/** `#RGB` | `#RRGGBB` | `#RRGGBBAA` → `"R G B"` (triplet exigido por `rgb(... / <alpha>)`). */
export const hexToTriplet = (hex: string): string => {
  let h = hex.replace('#', '').trim();
  if (h.length === 3) h = h.split('').map((ch) => ch + ch).join('');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `${r} ${g} ${b}`;
};

/** Achata os grupos de cor num mapa `{ '--color-<grupo>-<chave>': 'R G B' }`. */
export const flattenColors = (c: ThemeColors): Record<string, string> => {
  const out: Record<string, string> = {};
  for (const [group, entries] of Object.entries(toColorGroups(c))) {
    for (const [key, value] of Object.entries(entries as Record<string, string>)) {
      out[`--color-${group}-${key}`] = hexToTriplet(value);
    }
  }
  return out;
};

/**
 * Referências de variável CSS no formato de grupos do preset — mesma estrutura de
 * `toColorGroups`, mas cada valor é `rgb(var(--color-…) / <alpha-value>)`. Consumido
 * pelo `tailwind.ts` para que as classes (`bg-surface-default`, `text-fg-primary`…)
 * resolvam a variável ativa do tema em vez de um hex fixo.
 */
export const colorVarRefs = () => {
  const groups = toColorGroups(colors); // só as CHAVES importam aqui
  const mapped = {} as Record<string, Record<string, string>>;
  for (const [group, entries] of Object.entries(groups)) {
    mapped[group] = {};
    for (const key of Object.keys(entries)) {
      mapped[group][key] = `rgb(var(--color-${group}-${key}) / <alpha-value>)`;
    }
  }
  return mapped as { [G in keyof ReturnType<typeof toColorGroups>]: Record<string, string> };
};

/**
 * Tema DARK — fundo de tela teal da marca + superfícies/texto escuros nos componentes.
 * PROVISÓRIO (`TODO(Figma)`): não há paleta dark no Figma ainda. O ConfirmDialog é uma
 * exceção deliberada — fica claro via `ThemeProvider theme="default"` no próprio
 * componente (ilha), não por token.
 */
const darkColors: ThemeColors = {
  ...colors,
  brand: {
    chipSurface: '#0E3A3F', // TODO(Figma)
    cardSurface: '#10484F', // TODO(Figma)
    base: '#2DD4BF', // TODO(Figma) — teal mais claro p/ contraste no escuro
    strong: '#5EEAD4', // TODO(Figma)
    borderHighlight: '#2DD4BF', // TODO(Figma)
    zupper: '#2DD4BF', // TODO(Figma) — borda/texto do Button secondary
    connectorDot: '#2DD4BF', // TODO(Figma)
    connectorLine: '#155E63', // TODO(Figma)
  },
  partner: {
    surface: '#F59E0B', // TODO(Figma)
    cardSurface: '#3A2A08', // TODO(Figma) — âmbar escuro
    cardBorder: '#92400E', // TODO(Figma)
  },
  text: {
    primary: '#F5F5F5', // TODO(Figma) — texto principal sobre fundo escuro
    secondary: '#D4D4D4', // TODO(Figma)
    muted: '#9CA3AF', // TODO(Figma)
    inverse: '#0A1416', // TODO(Figma) — "inverso" agora é escuro (sobre superfícies claras/brand)
    link: '#7DD3FC', // TODO(Figma)
    heading: '#E5E7EB', // TODO(Figma)
    body: '#D4D4D4', // TODO(Figma)
    label: '#F5F5F5', // TODO(Figma)
    subtle: '#9CA3AF', // TODO(Figma)
  },
  surface: {
    default: '#0C4048', // TODO(Figma) — card/superfície elevada (teal escuro, > que o screen)
    screen: '#06343B', // TODO(Figma) — fundo de tela: teal escuro da marca (brand.strong #008C99)
    tag: '#123E45', // TODO(Figma)
    selection: '#4B5563', // TODO(Figma)
  },
  border: {
    default: '#2A5259', // TODO(Figma)
    subtle: '#1C3A40', // TODO(Figma)
    focus: '#5EEAD4', // TODO(Figma)
  },
  feedback: {
    danger: '#F87171', // TODO(Figma) — tons mais claros p/ legibilidade no escuro
    success: '#4ADE80', // TODO(Figma)
    warning: '#FACC15', // TODO(Figma)
    warningSurface: '#422006', // TODO(Figma) — âmbar escuro
    warningStrong: '#FCD34D', // TODO(Figma)
    dangerSurface: '#450A0A', // TODO(Figma) — vermelho escuro
    dangerStrong: '#FCA5A5', // TODO(Figma)
    successSurface: '#052E16', // TODO(Figma) — verde escuro
  },
};

/**
 * Todos os temas por nome. `default` = `colors` (hex canônico).
 *
 * ADICIONAR UM TEMA = criar a paleta e incluí-la AQUI. `ThemeName`, `themeVars`, o
 * `theme.css` gerado e o toggle do Storybook **derivam** desta lista — nada mais a editar.
 * `satisfies` infere as chaves (não precisa mexer numa anotação de union a cada tema).
 */
export const themes = {
  default: colors,
  dark: darkColors,
} satisfies Record<string, ThemeColors>;

export type ThemeName = keyof typeof themes;

/** Objeto de cores (hex) de um tema. Faz fallback pro `default` se o nome não existir. */
export const getTheme = (name: ThemeName = 'default'): ThemeColors => themes[name] ?? themes.default;

/**
 * Variáveis CSS por tema — `{ '--color-…': 'R G B' }`. Consumido pelo gerador de
 * `theme.css` (`scripts/gen-theme-css.mjs`). DERIVADO de `themes` — um tema novo entra
 * sozinho, sem enumerar aqui. Fonte única.
 */
export const themeVars = Object.fromEntries(
  Object.entries(themes).map(([name, palette]) => [name, flattenColors(palette)]),
) as Record<ThemeName, Record<string, string>>;
