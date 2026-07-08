# 0006 — NativeWind como camada de estilo do ui-native

- **Status:** Accepted
- **Date:** 2026-07-08
- **Deciders:** Jerson Janke

## Context
O `ui-native` nasceu com `styled-components/native` (mesma engine do `@zupper/app-ui`).
Decidiu-se adotar **NativeWind** (`className` com utilitários Tailwind) para os
componentes do design system, mantendo os tokens como fonte única de valores.

Restrição central: NativeWind **não é auto-contido numa lib publicada** — quem
transforma `className → estilo` é o pipeline do **app consumidor** (babel + metro +
tailwind). A lib publica `className` como string crua.

## Decision
1. Componentes do `ui-native` usam **`className` (NativeWind) + tokens**. Migração
   **gradual**: `styled-components` vira peer **opcional** durante a transição.
2. Os tokens expõem um **preset Tailwind** em `@zupper/tokens/tailwind` — fonte única
   da ponte tokens → utilitários, compartilhada pela lib (Storybook/jest) e pelo
   `tailwind.config.js` de cada app consumidor. Para isso os tokens compilam em **CJS**
   (requeríveis por `tailwind.config.js` em Node puro).
3. O app consumidor configura NativeWind uma vez (babel + metro `withNativeWind` +
   `tailwind.config.js` com `content` incluindo `@zupper/ui-native` + `global.css`).
   Guia com diffs prontos para o zupper-app: `docs/nativewind-zupper-app.md`.
4. peerDependencies novas do `ui-native`: `nativewind >=4.1`, `tailwindcss >=3.4 <4`,
   `react-native-reanimated >=3.6`, `react-native-safe-area-context >=4`.

## Consequences
- **Mais fácil:** classes semânticas derivadas dos tokens (`bg-primary`, `p-md`,
  `rounded-pill`) sem ponte manual por componente; consistência com o ecossistema
  Tailwind; um único preset alimenta lib e apps.
- **Mais difícil:** o pacote deixa de ser "instala e funciona" — o app consumidor
  **precisa** do setup NativeWind (afrouxa a blindagem nº 1 do ADR 0004; mitigado
  pelo guia com diffs prontos). Tailwind fica travado em v3 (NativeWind 4 não suporta
  v4). Convivência temporária de dois sistemas de estilo durante a migração.
- Validado no monorepo: nativewind 4.2.6 + tailwind 3.4.19 + RN 0.83/React 19
  (build bob, typecheck, jest e Storybook web). O risco NativeWind × reanimated 4
  não se materializou no harness; falta validar no device via zupper-app.
