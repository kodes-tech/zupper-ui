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
<View className="bg-surface-card p-md rounded-pill" />
```
Mapa: cores → `bg-primary`, `text-fg-strong`, `bg-feedback-success`, `text-like` ·
spacing → `p-md`, `px-sm`, `gap-lg` · radius → `rounded-pill` · fonte → `font-sans`,
`text-caption`, `font-medium`.

Em componente **legado** (styled-components, ainda não migrado):
```ts
import { colors, spacing, radii } from '@zupper/tokens';
background-color: ${colors.surface.card};
padding: ${spacing.md}px;
border-radius: ${radii.pill}px;
```

## Regras
1. **Nunca hardcode** no componente — sempre um token.
2. **Não importar tokens do `@zupper/app-ui`** (é o design antigo, do Travel). Este é
   o design novo, isolado.
3. Token é **valor**, não componente — nada de JSX aqui.
4. Mudou valor de token = **versão nova** do pacote (semver) → consumidores dão
   `npm update`. Ver `known-issues` sobre propagação.

## Theming (futuro)
Evoluir para **temas**: `themes = { default, christmas, … }` + `getTheme(name)`.
A ativação de um tema (ex.: Natal) vem de **flag remota**, não hardcoded.
Ver [ADR 0005](../decisions/0005-seasonal-theming-remote-flag.md).
