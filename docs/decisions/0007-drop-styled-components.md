# 0007 — Remover styled-components; NativeWind é a única estilização

- **Status:** Accepted
- **Date:** 2026-07-08
- **Deciders:** Marcos Matsuda (tech lead)

## Context
A [ADR 0006](0006-nativewind-styling.md) adotou NativeWind mas previu uma
**migração gradual**, mantendo `styled-components` como peer **opcional** durante a
transição. Na prática nenhum componente do `ui-native` usa styled-components — o
`Badge` (único componente) já nasceu em `className`. Manter os dois caminhos:
- dá **orientação ambígua** (dev não sabe qual usar);
- carrega peer/devDeps e um plugin de babel sem uso;
- polui a superfície de estilo do design system.

## Decision
**Remover o styled-components por completo** do `@zupper/ui-native`:
- fora das `peerDependencies`/`devDependencies` e do `babel.config.js`;
- **NativeWind (`className`) + tokens é a única** abordagem de estilo para todo
  componente (novo ou existente). Sem "caminho legado".

Supersede o item 1 da ADR 0006 (a parte de "migração gradual / peer opcional").

## Consequences
- **+** Uma única forma de estilizar — menos ambiguidade, menos deps, superfície limpa.
- **+** `peerDependencies` do `ui-native` = react/react-native/nativewind/tailwindcss
  (+ reanimated/safe-area-context) — sem styled-components.
- **−** Se algum dia um caso não couber em `className`, usar `style={{…}}` com tokens
  via import JS (não reintroduzir styled-components).
- Nota: o `@zupper/app-ui` (design **antigo** do Travel) segue em styled-components —
  isso é do app, não deste repo.
