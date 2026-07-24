# Convenção — Design Tokens (`@zupper/tokens`)

## O que é
Valores **agnósticos de framework** (só JS/TS puro): cores, spacing, tipografia,
radius, elevação. Sem `dependencies` e sem `peerDependencies`. Consumido por RN,
React web, Angular — qualquer coisa.

## Origem: Figma (Dev Mode)
Os valores **vêm do Figma do Community** (Dev Mode). Hoje os arquivos em
`packages/tokens/src` têm valores **PLACEHOLDER** marcados com `TODO(Figma)` —
substituir pelos reais. Não inventar valores fora do design.

## Estrutura
```
packages/tokens/src/
├── colors.ts · spacing.ts · typography.ts · radii.ts · elevation.ts
├── tailwind.ts   # preset Tailwind gerado dos tokens (@zupper/tokens/tailwind)
└── index.ts      # reexporta tudo + objeto agregado `tokens`
```
Cada arquivo exporta um objeto `as const` (tipos estreitos) + o `type`.
O build é **CJS** de propósito: `tailwind.config.js` (Node puro) precisa dar
`require('@zupper/tokens/tailwind')`.

## Como usar num componente
Via **NativeWind** (padrão — ADR 0006): as classes saem do preset
`@zupper/tokens/tailwind`:
```tsx
<View className="bg-surface-tag p-md rounded-pill" />
```
Mapa: cores → `bg-brand-strong`, `text-fg-primary`, `bg-surface-tag`, `bg-partner-cardSurface` ·
spacing → `p-md`, `px-sm`, `gap-lg`, `p-screenMargin` · radius → `rounded-pill`, `rounded-md` ·
fonte → `font-sans`, `text-xs`, `font-medium`, presets compostos `text-heading`, `text-authorName`.

> Gradientes (`colors.gradient.*`) ficam **fora** do preset (arrays não são cor Tailwind) —
> consumir via import JS direto (ex.: `LinearGradient`). NativeWind é a **única** estilização
> (sem styled-components — ADR 0007).

## Regras
1. **Nunca hardcode** no componente — sempre um token.
2. **Não importar tokens do `@zupper/app-ui`** (é o design antigo, do Travel). Este é
   o design novo, isolado.
3. Token é **valor**, não componente — nada de JSX aqui.
4. Mudou valor de token = **versão nova** do pacote (semver) → consumidores dão
   `npm update`. Ver `known-issues` sobre propagação.

## Theming
`@kodes-tech/tokens` expõe **múltiplos temas** — hoje `default` (light) e `dark`
(provisório, `TODO(Figma)`). Sazonais (ex.: Natal) entram como novos temas no mesmo
molde. Ver [ADR 0005](../decisions/0005-seasonal-theming-remote-flag.md).

**Como funciona (mecanismo: CSS variables):**
- `colors.ts` segue sendo o **hex canônico** (= tema `default`). `themes.ts` guarda cada
  tema em hex (`themes`, `getTheme(name)`) e **deriva** dali as variáveis CSS
  (`themeVars`, formato `R G B`) — fonte única, sem CSS escrito à mão.
- O **preset Tailwind** não emite mais hex fixo: cada cor resolve
  `rgb(var(--color-<grupo>-<chave>) / <alpha-value>)`. Então `bg-surface-default`,
  `text-fg-primary` etc. seguem a variável do tema ativo.
- O build dos tokens gera **`@kodes-tech/tokens/theme.css`**: `:root` com o tema
  `default` (baseline) e um bloco `[data-theme="<nome>"]` por tema.

**Trocar de tema:**
- **`ThemeProvider` (mecanismo, web + native):** `@kodes-tech/ui-native` exporta
  `<ThemeProvider theme={name}>` que aplica `vars(themeVars[name])` na subárvore — as
  classes `rgb(var(--color-…))` resolvem o tema ativo. Também expõe `useTheme()` (nome do
  tema + cores hex para os consumidores JS). Providers aninhados criam "ilhas" (ex.:
  ConfirmDialog sempre claro).
- **Web / Storybook:** o `theme.css` traz `:root` (default) + `[data-theme="<nome>"]`;
  setar `data-theme` no `<html>` serve de baseline/atalho no web (o toggle da toolbar faz
  isso), mas o caminho canônico é o `ThemeProvider`.
- **Ativação:** qual tema ligar é do **app consumidor**, com precedência
  `sazonal (data/flag) > escolha do usuário (persistida) > Appearance do SO > default`.
  Ver [ADR 0011](../decisions/0011-theming-architecture.md) (arquitetura + precedência) e
  [ADR 0005](../decisions/0005-seasonal-theming-remote-flag.md) (flag sazonal).

**Limites atuais:**
- `scrim` segue literal (`rgba(0,0,0,0.45)`) no preset — não-temável por ora.
- Cores lidas em **JS** (gradientes `colors.gradient.*`; `selectionColor`) só acompanham o
  tema quando o componente está sob um `ThemeProvider` (lê `useTheme().colors`); fora dele,
  caem no `default`.
