# Ícones — `@kodes-tech/icons`

## Um pacote próprio, dois renderers

Os ícones vivem no pacote **`@kodes-tech/icons`** (`packages/icons`). A fonte da
verdade é **`packages/icons/assets/<name>.svg`** — o desenho **agnóstico de
framework** (SVG cru, 1 arquivo por ícone), do mesmo jeito que os tokens são
valores agnósticos.

Um `.svg` não renderiza sozinho em React — alguém precisa desenhar o path. Então
cada ícone vira **dois componentes gerados do MESMO svg**, um por renderer:

```
packages/icons/
├── assets/                  ← fonte da verdade (SVG cru)
│   ├── heart.svg
│   └── …
├── scripts/
│   ├── generate-icons.mjs   ← svgr 2x (native + web) + arquivos derivados
│   └── audit-icons.mjs      ← valida os elos 1:1 nos dois renderers
└── src/
    ├── names.ts             ← GERADO: iconNames + IconName (union tipada)
    ├── color.ts             ← firstColor (agnóstico de renderer)
    ├── native/              ← react-native-svg  (app RN)
    │   ├── svg/…            ← GERADO (svgr --native)
    │   ├── registry.ts      ← GERADO
    │   └── Icon.tsx
    └── web/                 ← <svg> DOM puro    (React web, Storybook)
        ├── svg/…            ← GERADO (svgr)
        ├── registry.ts      ← GERADO
        └── Icon.tsx
```

> Mesmo **desenho**, empacotamento por renderer — segue o [ADR 0002](../decisions/0002-tokens-shared-components-per-framework.md)
> ("tokens são compartilhados; componentes são por framework") e o
> [ADR 0008](../decisions/0008-icons-package-dual-renderer.md).

## O bundler escolhe o renderer (o consumidor não)

O `exports` do pacote resolve por condição — o import é **sempre o mesmo**:

```tsx
import { Icon } from '@kodes-tech/icons';
import type { IconName } from '@kodes-tech/icons'; // union tipada, com autocomplete

<Icon name="heart" size={20} />
```

- **App RN (Metro)** → condição `react-native` → renderer **native**
  (`react-native-svg`, peer opcional — o app fornece a instância).
- **Web (webpack/Next/Vite)** → condição `import`/`require` → renderer **web**
  (`<svg>` DOM puro; **zero** dependência de React Native).
- Escape explícito: `@kodes-tech/icons/native` e `@kodes-tech/icons/web`.
- Stacks não-React (Angular…): o SVG cru sai por `@kodes-tech/icons/assets/<name>.svg`.

No Storybook (webpack), o alias `@kodes-tech/icons$ → packages/icons/src/web`
serve o renderer web direto do source — sem build e sem passar pelo
`react-native-web`.

A API é idêntica nos dois renderers: `Icon`, `IconProps`, `IconName`,
`iconNames`, `iconColor`. Os specs cobrem a **paridade** (mesma cor intrínseca
nos dois lados).

## Como adicionar/atualizar um ícone

1. Coloque/atualize o SVG em `packages/icons/assets/<name>.svg` (kebab-case;
   **sem** prefixo `icon-`). O `<name>` vira a `key` do ícone e o nome PascalCase
   dos componentes.
2. Gere: `npm run icons:generate -w @kodes-tech/icons -- <name>` (ou `--all`).
   O script roda svgr **duas vezes** (com/sem `--native`), normaliza pro formato
   canônico (sem `overflow/preserveAspectRatio/style`; `var(--stroke-0, X)`
   colapsado no fallback) e **regenera os arquivos derivados** (`names.ts`,
   `svg/index.ts` e `registry.ts` dos dois renderers). Não há registro manual.
3. Rode a verificação: `npm run icons:audit -w @kodes-tech/icons`. Ela **falha**
   se qualquer elo (SVG-fonte ↔ names ↔ componente ↔ registry ↔ export, nos dois
   renderers) estiver solto. Bom candidato pro CI.

`--sync` regenera só os derivados (offline); a geração em si usa `npx @svgr/cli`
(requer rede).

## Como consumir

Na prática, **quase nunca** se usa o `Icon` direto: os organisms/molecules do
`ui-native` já trazem os ícones embutidos (`<PostCard/>`, `<BottomNav/>`…). O
`ui-native` re-exporta o `Icon` (`export * from '@kodes-tech/icons'` em
`atoms/index.ts`), então `import { Icon } from '@kodes-tech/ui-native'` continua
funcionando para quem já consumia.

Requisito no app RN: **`react-native-svg`** instalado (peer opcional do pacote —
só o lado native usa). Como a geração é **build-time** (o SVG já virou componente
JS no `lib/`), o app **não** precisa de `react-native-svg-transformer` nem de
config de SVG no Metro. Consumidor web não precisa de nada além de React.

## `_figma/assets` (referência, não fonte)

`packages/ui-native/src/_figma/` é o dump de referência do Figma (os `preview.html`
e seus assets). **Não é fonte da verdade** e é excluído de build/pacote. Alguns SVGs
que **não** viraram ícones continuam lá de propósito:

- `icon-roteiro-connector-tall/short.svg` — a linha do tempo do roteiro é desenhada
  com Views (tokens `brand.connectorDot/connectorLine`), porque a linha precisa
  esticar conforme a altura da parada.
- `icon-nav-buscar*.svg`, `icon-account-personal-data-active.svg` — variantes de
  bottom nav ainda não adotadas (as telas usam o `BottomNav` padrão).
