# 0003 — Atomic Design nos componentes

- **Status:** Accepted
- **Date:** 2026-07-08
- **Deciders:** Marcos Matsuda

## Context
Precisamos de uma organização de componentes clara e consistente com o resto do
ecossistema. O `@zupper/app-ui` (design antigo do app) já usa Atomic Design.

## Decision
Organizar `@zupper/ui-native` em **`atoms/` · `molecules/` · `organisms/`**, mesma
convenção do `app-ui`. Cada componente numa pasta com 4 arquivos
(`.tsx`, `.stories.tsx`, `.spec.tsx`, `index.ts`) e exportado no barrel do nível.

## Consequences
- **+** Familiaridade (mesma mental model do app-ui); escalável; fácil de navegar.
- **+** Stories agrupam por nível no Storybook.
- **−** Exige julgamento pra classificar o nível de cada componente (documentado em
  `conventions/components.md`).
