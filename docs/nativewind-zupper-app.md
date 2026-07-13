# Habilitar NativeWind no zupper-app (consumidor)

O `@zupper/ui-native` publica componentes com `className` **como string** — não os transforma
no build. Quem resolve `className → estilo` é o **pipeline NativeWind do app consumidor**
(babel + metro + tailwind). Portanto, para usar os componentes do design system, o
**zupper-app** precisa configurar o NativeWind uma única vez.

> Caminho de referência do app: `apps/zupper-app/` dentro do monorepo Nx (Yarn).

## Pré-requisitos — já satisfeitos ✅

Levantado do `package.json` da raiz do zupper-app:

| Requisito | Estado |
|---|---|
| `react-native-reanimated` | ✅ `4.2.2` |
| `react-native-worklets` (plugin já no `.babelrc.js`) | ✅ presente |
| `react-native-safe-area-context` | ✅ `5.6.2` |
| `react-native` / `react` | ✅ `0.83.2` / `19.2.0` |

Falta apenas **instalar o NativeWind + Tailwind** e ligar os 4 pontos abaixo.

---

## 1. Dependências (raiz do monorepo, Yarn)

```bash
yarn add nativewind
yarn add -D tailwindcss@^3.4.0
```

> ⚠️ **Tailwind v3, não v4.** NativeWind 4 não suporta Tailwind v4.
> `react-native-css-interop` entra junto como dependência do `nativewind`.

---

## 2. `apps/zupper-app/tailwind.config.js` (novo)

O `content` **precisa** incluir o `@zupper/ui-native`, senão o Tailwind não gera as
classes usadas pelos componentes do DS.

```js
const { tailwindPreset } = require('@zupper/tokens/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
    // componentes do design system (lib compilada + fonte, cobre dev e publicado):
    '../../node_modules/@zupper/ui-native/lib/**/*.{js,jsx}',
    '../../node_modules/@zupper/ui-native/src/**/*.{ts,tsx}',
  ],
  presets: [require('nativewind/preset'), tailwindPreset],
};
```

## 3. `apps/zupper-app/global.css` (novo)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

E **importar no entry do app** (ex.: `apps/zupper-app/src/main.tsx` ou `index.js`), uma vez:

```ts
import './global.css';
```

## 4. `apps/zupper-app/.babelrc.js` (editar)

Adicionar `nativewind/babel` como preset **nos dois branches** (o do app e o de
build/storybook). Manter tudo o que já existe:

```diff
   return {
     presets: [
       ['module:@react-native/babel-preset', { useTransformReactJSX: true }],
+      'nativewind/babel',
     ],
     plugins: [ /* dotenv + react-native-worklets/plugin (inalterados) */ ],
   };
```

E no branch de `build`/`storybook`:

```diff
     presets: [
       ['@nx/react/babel', { runtime: 'automatic' }],
+      'nativewind/babel',
     ],
```

> ⚠️ O app já usa `react-native-worklets/plugin`. O `nativewind/babel` também mexe com
> reanimated — validar no primeiro build que não há conflito de plugin duplicado
> (ver seção de riscos).

## 5. `apps/zupper-app/metro.config.js` (editar)

Embrulhar a config final com `withNativeWind`, **por fora** do `withNxMetro`:

```diff
-const { withNxMetro } = require('@nx/react-native');
+const { withNxMetro } = require('@nx/react-native');
+const { withNativeWind } = require('nativewind/metro');
 ...
-module.exports = withNxMetro(mergeConfig(defaultConfig, customConfig), {
-  projectRoot: projectRoot,
-  debug: false,
-  extensions: ['.js', '.jsx', '.tsx', '.ios.js', '.android.js'],
-  watchFolders: [path.join(workspaceRoot)],
-});
+module.exports = withNativeWind(
+  withNxMetro(mergeConfig(defaultConfig, customConfig), {
+    projectRoot: projectRoot,
+    debug: false,
+    extensions: ['.js', '.jsx', '.tsx', '.ios.js', '.android.js'],
+    watchFolders: [path.join(workspaceRoot)],
+  }),
+  { input: './global.css' },
+);
```

> Se `withNxMetro` retornar Promise nessa versão do Nx, aplicar `withNativeWind` sobre o
> valor resolvido (await) — validar no start do Metro.

## 6. Tipos do `className` (editar)

Criar `apps/zupper-app/nativewind-env.d.ts`:

```ts
/// <reference types="nativewind/types" />
```

E garantir que ele entre no `include` do `tsconfig.app.json`.

---

## Validar

```bash
# 1) reinstalar e buildar os tokens (o preset vem de @zupper/tokens/tailwind)
yarn install
# 2) subir com cache limpo (obrigatório após mexer em babel/metro)
yarn start:reset-cache
# 3) rodar em um device
yarn android   # ou yarn ios
```

Teste rápido — colar numa tela e ver o Badge estilizado:

```tsx
import { Badge } from '@zupper/ui-native';

<Badge label="Ativo" tone="success" />;
```

---

## Riscos conhecidos (validar no primeiro install)

- **NativeWind 4.1 × reanimated 4.2 / worklets nightly.** O NativeWind 4.1.x foi
  construído sobre reanimated 3. O app está no reanimated 4 (bleeding edge). Se houver
  erro de worklet/plugin, as saídas são: (a) fixar `nativewind` numa versão que declare
  suporte a reanimated 4, ou (b) desabilitar animações do NativeWind. Mesmo tom de risco
  que o README do zupper-ui já registra para RN 0.83 + React 19.
- **Plugin de babel duplicado** (`react-native-worklets/plugin` + o que o `nativewind/babel`
  injeta) — se o Metro reclamar, manter apenas um.
- **Tailwind v4 acidental** — travar em `^3.4`.
- **Nx cache** — sempre `--reset-cache` após mudar babel/metro.
