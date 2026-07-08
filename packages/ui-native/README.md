# @zupper/ui-native

Componentes **React Native** do design system Zupper (Community). Consome `@zupper/tokens`.

```tsx
import { Badge } from '@zupper/ui-native';

<Badge label="Novo" tone="success" />
```

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
├── <Nome>.tsx          # styled-components/native + tokens (apresentacional, sem API)
├── <Nome>.stories.tsx  # story (Storybook)
├── <Nome>.spec.tsx     # teste (@testing-library/react-native)
└── index.ts
```
E exportar no `index.ts` do nível (ex.: `atoms/index.ts`).

## Rodar (dev harness)
```bash
npm install            # na raiz do zupper-ui (workspaces)
npm run storybook -w @zupper/ui-native   # preview visual no navegador (via react-native-web)
npm test        -w @zupper/ui-native     # jest + @testing-library/react-native
npm run build   -w @zupper/ui-native     # builder-bob (compila lib/)
```
- **Storybook** (web/RNW): vê e revisa componentes **sem simulador e sem backend**. Stories em `*.stories.tsx`.
- **Testes**: `*.spec.tsx` ao lado de cada componente (ver `Badge.spec.tsx`).

> ⚠️ **Validar no install:** o app é RN 0.83 / React 19 (recente). A combinação React 19 + react-native-web + Storybook 8 pode pedir **ajuste de versão** no primeiro `npm install`. O **jest** é a parte estável; o **Storybook** pode precisar de um tweak. Se `bob build` reclamar do `babel.config.js`, isolamos um babel dedicado ao bob.

## Blindagens já embutidas
- **peerDependencies permissivas** — `react: *`, `react-native: >=0.72`, `styled-components: >=6` (o app fornece as instâncias; sem cópia dupla de React).
- **Build via `react-native-builder-bob`** — gera `lib/` (CJS + ESM + types); publica compilado, não `.tsx` cru.
- **Módulos nativos** entram como `peerDependencies` (nunca `dependencies`).

> ⚠️ Após `npm install`, rode `npm run build` e confirme os caminhos `main`/`module`/`types` conforme a saída do bob (varia por versão).
