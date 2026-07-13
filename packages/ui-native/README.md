# @kodes-tech/ui-native

Componentes **React Native** do design system Zupper (Community). Consome `@kodes-tech/tokens`.
Estilização via **NativeWind** (`className`), com os tokens expostos como preset Tailwind.

```tsx
import { Badge } from '@kodes-tech/ui-native';

<Badge label='Viajante' tone='brand' />;
```

> ⚠️ **Requer setup no app consumidor.** O NativeWind resolve `className` no build do app
> (babel + metro + tailwind), não na lib. Antes de usar no zupper-app, siga
> [`docs/nativewind-zupper-app.md`](../../docs/nativewind-zupper-app.md).

## Estrutura — Atomic Design (igual ao @zupper/app-ui)

```
src/
├── atoms/       # blocos básicos: Badge, Text, Icon, Button
│   └── Badge/   { Badge.tsx, Badge.stories.tsx, Badge.spec.tsx, index.ts }
├── molecules/   # combinações: LikeButton, CommentInput, Avatar+nome
├── organisms/   # compostos: PostCard, Comment, FeedItem
└── index.ts     # export * from atoms/molecules/organisms
```

## Como criar um componente (padrão)

Cada componente numa pasta no nível certo (`atoms`/`molecules`/`organisms`), com 4 arquivos:

```
<Nivel>/<Nome>/
├── <Nome>.tsx          # React Native + className (NativeWind) + tokens (apresentacional, sem API)
├── <Nome>.stories.tsx  # story (Storybook)
├── <Nome>.spec.tsx     # teste (@testing-library/react-native)
└── index.ts
```

E exportar no `index.ts` do nível (ex.: `atoms/index.ts`).

## Rodar (dev harness)

```bash
npm install            # na raiz do zupper-ui (workspaces)
npm run storybook -w @kodes-tech/ui-native   # preview visual no navegador (via react-native-web)
npm test        -w @kodes-tech/ui-native     # jest + @testing-library/react-native
npm run build   -w @kodes-tech/ui-native     # builder-bob (compila lib/)
```

- **Storybook** (web/RNW): vê e revisa componentes **sem simulador e sem backend**. Stories em `*.stories.tsx`.
- **Testes**: `*.spec.tsx` ao lado de cada componente (ver `Badge.spec.tsx`).

> ✅ **Validado** (RN 0.83 / React 19 / nativewind 4.2.6 / SB 8.6): install requer `--legacy-peer-deps` (react-native-web pede React 18). No Storybook, o TS/TSX compila via regra explícita de `babel-loader` no `webpackFinal` (SB8 não traz compilador) e o `global.css` via PostCSS — ver `.storybook/main.ts`. Se o preview quebrar com erro estranho após mexer em babel/webpack, limpe `node_modules/.cache`.

## Estilização — NativeWind + tokens
- Componentes usam `className` (utilitários Tailwind). Os tokens (`@zupper/tokens`) viram um **preset Tailwind** (`@zupper/tokens/tailwind`), então as classes semânticas saem dos tokens:
  - cores → `bg-brand-strong`, `text-fg-primary`, `bg-surface-tag`, `bg-partner-cardSurface`
  - spacing → `p-md`, `px-sm`, `gap-lg` · radius → `rounded-pill` · fonte → `font-sans`, `text-xs`, `font-medium`
- O harness local (Storybook/jest) já tem `tailwind.config.js` + `global.css` + `nativewind/babel`.
- `styled-components` foi removido — nenhum componente o utiliza mais.
- ⚠️ A lib **não** transforma `className` no build (bob emite string crua); quem resolve é o app — ver [`docs/nativewind-zupper-app.md`](../../docs/nativewind-zupper-app.md).

## Blindagens já embutidas
- **peerDependencies permissivas** — `react: *`, `react-native: >=0.72`, `nativewind: >=4.1`, `tailwindcss: >=3.4 <4` (o app fornece as instâncias; sem cópia dupla).
- **Build via `react-native-builder-bob`** — gera `lib/` (CJS + ESM + types); publica compilado, não `.tsx` cru.
- **Módulos nativos** entram como `peerDependencies` (nunca `dependencies`).

> ⚠️ Após `npm install`, rode `npm run build` e confirme os caminhos `main`/`module`/`types` conforme a saída do bob (varia por versão).
