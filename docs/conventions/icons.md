# Ícones

## Fonte da verdade: `assets/icons/`

Os SVGs crus dos ícones vivem em **`assets/icons/<name>.svg`** na **raiz do repo** —
não dentro de nenhum pacote. É o desenho **agnóstico de framework** (só o path do
SVG), do mesmo jeito que os tokens são valores agnósticos.

```
zupper-ui/
├── assets/icons/           ← fonte da verdade (SVG cru, 1 arquivo por ícone)
│   ├── heart.svg
│   ├── nav-conta.svg
│   └── …
└── packages/
    ├── tokens/             ← valores agnósticos (cor/spacing)
    └── ui-native/
        └── src/atoms/Icon/ ← o atom `Icon` (react-native-svg), gerado dos SVGs
```

## O ícone é um **atom por framework** (não é o `.svg` cru)

Um `.svg` não renderiza sozinho em React — alguém precisa desenhar o path. Então
cada pacote de UI tem **o seu próprio atom `Icon`**, gerado do **mesmo** SVG-fonte:

- **`@zupper/ui-native`** → usa `react-native-svg` (`<Svg><Path/></Svg>`). É o que
  existe hoje; roda no app (RN) e na web via `react-native-web` (é assim que o
  Storybook mostra os ícones no navegador).
- **`@zupper/ui-web`** (futuro) → teria o seu atom `Icon`, gerado dos **mesmos**
  `assets/icons/*.svg`. Só precisaria de renderer próprio (`<svg>` do DOM) **se** a
  web for React DOM puro; se for `react-native-web`, reusa o do `ui-native`.

> Mesmo **desenho**, empacotamento por framework — segue o [ADR 0002](../decisions/0002-tokens-shared-components-per-framework.md)
> ("tokens são compartilhados; componentes são por framework").

## Como adicionar/atualizar um ícone

1. Coloque/atualize o SVG em `assets/icons/<name>.svg` (kebab-case; **sem** prefixo
   `icon-`). O `<name>` vira a `key` do ícone e o nome PascalCase do componente.
2. Gere o atom: `node scripts/generate-icon.mjs <name>` (dentro de `packages/ui-native`),
   ou `npm run icons:generate -w @zupper/ui-native -- <name>`. O script roda svgr e
   normaliza pro formato canônico (sem `xmlns/overflow/style`; `var(--stroke-0, X)`
   colapsado no fallback).
3. Registre em `src/atoms/Icon/svg/index.ts` (export) **e** no `registry` de
   `src/atoms/Icon/Icon.tsx` (`'<name>': Svgs.<Pascal>`).
4. Rode a verificação: `npm run icons:audit -w @zupper/ui-native`. Ela **falha** se
   qualquer elo (SVG-fonte ↔ componente ↔ registry ↔ export) estiver solto —
   garante que **todo ícone é um atom** e vice-versa. Bom candidato pro CI.

## Como consumir (no app / na web)

Na prática, **quase nunca** se usa o `Icon` direto: os organisms/molecules/atoms
já trazem os ícones embutidos (`<PostCard/>`, `<BottomNav/>`…). Quando precisar do
ícone cru:

```tsx
import { Icon } from '@zupper/ui-native';
import type { IconName } from '@zupper/ui-native'; // union tipada, com autocomplete

<Icon name="heart" size={20} />
```

Requisito no app consumidor: ter **`react-native-svg`** instalado (é `peerDependency`
do `ui-native` — o app fornece a instância). Como a geração é **build-time** (o SVG
já virou componente JS no `lib/`), o app **não** precisa de `react-native-svg-transformer`
nem de config de SVG no Metro.

## `_figma/assets` (referência, não fonte)

`packages/ui-native/src/_figma/` é o dump de referência do Figma (os `preview.html`
e seus assets). **Não é fonte da verdade** e é excluído de build/pacote. Alguns SVGs
que **não** viraram atoms continuam lá de propósito:

- `icon-roteiro-connector-tall/short.svg` — a linha do tempo do roteiro é desenhada
  com Views (tokens `brand.connectorDot/connectorLine`), porque a linha precisa
  esticar conforme a altura da parada.
- `icon-nav-buscar*.svg`, `icon-account-personal-data-active.svg` — variantes de
  bottom nav ainda não adotadas (as telas usam o `BottomNav` padrão).
