# 0008 — Ícones em pacote próprio (`@kodes-tech/icons`) com renderer duplo

- **Status:** Accepted
- **Date:** 2026-07-17
- **Deciders:** time Zupper UI

## Context

Os ícones nasceram como atom do `@kodes-tech/ui-native` (componentes
`react-native-svg` gerados dos SVGs crus em `assets/icons/` na raiz). Isso criava
dois limites:

1. **Acoplamento de stack** — o desenho do ícone é agnóstico (como os tokens),
   mas só existia empacotado para RN. O futuro `ui-web` (e o painel admin React)
   teria que depender de `react-native-web` + `react-native-svg` só para desenhar
   um `<svg>`.
2. **Reuso isolado** — apps que só precisam dos ícones (sem os componentes do
   design system) tinham que carregar o `ui-native` inteiro e seus peers.

## Decision

Extrair os ícones para o pacote **`@kodes-tech/icons`** (`packages/icons`):

- A **fonte da verdade** (SVG cru) viaja para dentro do pacote
  (`packages/icons/assets/`).
- Cada ícone vira **dois componentes gerados do mesmo SVG** (svgr): um
  `react-native-svg` (`src/native/`) e um `<svg>` DOM puro (`src/web/`).
- O **`exports` do package.json resolve por condição**: `react-native` → native;
  `import`/`require` → web. O consumidor importa sempre `@kodes-tech/icons` e o
  bundler escolhe o renderer. Subpaths `./native`, `./web` e `./assets/*` ficam
  como escape (o último serve stacks não-React, ex.: Angular).
- Arquivos derivados (`names.ts`, `registry.ts`, `svg/index.ts` dos dois lados)
  são **gerados** por `scripts/generate-icons.mjs`; `scripts/audit-icons.mjs`
  garante o 1:1 nos dois renderers.
- `react-native` e `react-native-svg` viram **peers opcionais**
  (`peerDependenciesMeta`) — consumidor web não instala nada de RN.
- O `ui-native` passa a depender de `@kodes-tech/icons` e **re-exporta** o Icon
  (`atoms/index.ts`) para não quebrar consumidores existentes.
- O Storybook (um só, no `ui-native`) inclui as stories do pacote e usa alias
  para o source do renderer web.

## Consequences

- **Mais fácil:** consumir ícones na web (React DOM puro, sem RN); publicar e
  versionar ícones de forma independente; garantir paridade entre plataformas
  (specs comparam a cor intrínseca dos dois renderers); consumir o SVG cru em
  qualquer stack.
- **Mais difícil:** um pacote a mais para versionar/publicar; a geração escreve
  em dois diretórios (mitigado pelo generate 2x + audit + arquivos derivados
  gerados, sem passo manual de registro).
- O componente `Icon` deixa de ser "atom por framework" dentro de cada pacote de
  UI (como o ADR 0002 descrevia para componentes) e vira um pacote com
  **renderer por plataforma** — o desenho continua compartilhado, o
  empacotamento continua por framework, só que agora num único pacote com
  condições de `exports`.
