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

## Estrutura — camada única de primitives (ADR 0009)

O pacote publica **só primitivos genéricos** — sem Atomic Design. Tudo mora numa
camada só; produto e telas vivem no app consumidor, não aqui.

```
src/
├── primitives/   # blocos genéricos: Badge, Button, Input, BottomSheet…
│   └── Badge/    { Badge.tsx, Badge.stories.tsx, Badge.spec.tsx, index.ts }
├── foundations/  # specimens gerados dos tokens (ex.: Colors)
├── theme/        # ThemeProvider + useTheme (mecanismo de tema)
├── typography/   # escala tipográfica
└── index.ts      # export * from primitives + ThemeProvider/useTheme
```

## Como criar um componente (padrão)

Cada componente numa pasta em `primitives/`, com 4 arquivos:

```
primitives/<Nome>/
├── <Nome>.tsx          # React Native + className (NativeWind) + tokens (apresentacional, sem API)
├── <Nome>.stories.tsx  # story (Storybook)
├── <Nome>.spec.tsx     # teste (@testing-library/react-native)
└── index.ts
```

E exportar no `primitives/index.ts`.

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
- Componentes usam `className` (utilitários Tailwind). Os tokens (`@kodes-tech/tokens`) viram um **preset Tailwind** (`@kodes-tech/tokens/tailwind`), então as classes semânticas saem dos tokens:
  - cores → `bg-brand-strong`, `text-fg-primary`, `bg-surface-tag`, `bg-partner-cardSurface`
  - spacing → `p-md`, `px-sm`, `gap-lg` · radius → `rounded-pill` · fonte → `font-sans`, `text-xs`, `font-medium`
- O harness local (Storybook/jest) já tem `tailwind.config.js` + `global.css` + `nativewind/babel`.
- `styled-components` foi removido — nenhum componente o utiliza mais.
- ⚠️ A lib **não** transforma `className` no build (bob emite string crua); quem resolve é o app — ver [`docs/nativewind-zupper-app.md`](../../docs/nativewind-zupper-app.md).

## Theming

O tema é aplicado com `<ThemeProvider>`, que injeta as variáveis do tema na subárvore
(cross-platform via `vars()` do NativeWind) e expõe `useTheme()` para os poucos pontos
que leem cor em JS (gradientes do `LinearGradient`, `selectionColor`) — que não
acompanham a cascata das classes NativeWind.

```tsx
import { ThemeProvider, useTheme } from '@kodes-tech/ui-native';

<ThemeProvider theme="dark">
  <App />
</ThemeProvider>;
```

- A **ativação** (qual tema passar — ex.: flag remota, ADR 0005) é do app consumidor; a
  lib só fornece o mecanismo. Fora de um `ThemeProvider`, `useTheme()` cai no `default`.
- Provedores **aninhados** criam "ilhas" (ex.: um diálogo claro dentro de uma tela escura).
- No Storybook, o `ThemeProvider` é aplicado como **decorator global**
  (`.storybook/preview.tsx`), fixo no tema `default`.

## Blindagens já embutidas
- **peerDependencies permissivas** — `react: *`, `react-native: >=0.72`, `nativewind: >=4.1`, `tailwindcss: >=3.4 <4` (o app fornece as instâncias; sem cópia dupla).
- **Build via `react-native-builder-bob`** — gera `lib/` (CJS + ESM + types); publica compilado, não `.tsx` cru.
- **Módulos nativos** entram como `peerDependencies` (nunca `dependencies`).

> ⚠️ Após `npm install`, rode `npm run build` e confirme os caminhos `main`/`module`/`types` conforme a saída do bob (varia por versão).
