import type { StorybookConfig } from '@storybook/react-webpack5';
import fs from 'fs';
import path from 'path';

// Versões das libs do DS lidas em build-time (contexto Node) e injetadas no
// MANAGER via managerHead (window global) — o manager.ts as usa no renderLabel
// para carimbar a versão no rótulo de cada grupo da sidebar (Tokens/Primitives/
// Icons). Mapa por NOME do grupo, pois é assim que o renderLabel casa.
const readVersion = (rel: string): string =>
  JSON.parse(fs.readFileSync(path.resolve(__dirname, rel), 'utf8')).version;
const GROUP_VERSIONS: Record<string, string> = {
  Tokens: readVersion('../../tokens/package.json'),
  Icons: readVersion('../../icons/package.json'),
  Primitives: readVersion('../package.json'),
};

/**
 * Storybook web para componentes React Native, via react-native-web.
 * O alias react-native -> react-native-web faz os componentes RN
 * renderizarem no navegador (preview leve, sem simulador).
 */
const config: StorybookConfig = {
  // Inclui as stories do @kodes-tech/icons — o Storybook é um só, por aqui.
  stories: ['../src/**/*.stories.@(ts|tsx)', '../../icons/src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  // Disponibiliza o mapa de versões no MANAGER (usado pelo renderLabel no manager.ts).
  managerHead: (head) =>
    `${head}\n<script>window.__DS_GROUP_VERSIONS__ = ${JSON.stringify(GROUP_VERSIONS)};</script>`,
  webpackFinal: async (cfg) => {
    cfg.resolve = cfg.resolve ?? {};
    cfg.resolve.alias = {
      ...(cfg.resolve.alias ?? {}),
      'react-native$': 'react-native-web',
      // mesmo alias usado em libs/aerial e libs/app-ui (zupper-app): o pacote
      // nativo não tem shim web, este tem.
      'react-native-linear-gradient': 'react-native-web-linear-gradient',
      // icons direto do SOURCE do renderer web (<svg> DOM) — sem precisar buildar
      // o pacote e sem passar pelo react-native-web. No app (Metro), o mesmo
      // import resolve pro renderer native via condição `react-native` do exports.
      '@kodes-tech/icons$': path.resolve(__dirname, '../../icons/src/web'),
    };
    cfg.resolve.extensions = [
      '.web.tsx',
      '.web.ts',
      '.web.jsx',
      '.web.js',
      ...(cfg.resolve.extensions ?? []),
    ];
    cfg.module = cfg.module ?? { rules: [] };
    cfg.module.rules = cfg.module.rules ?? [];
    // TS/TSX via babel-loader com o babel.config.js do pacote — inclui o
    // `nativewind/babel`, necessário para `className` virar estilo no web.
    // (O SB8 não traz compilador embutido para o código do projeto.)
    cfg.module.rules.push({
      test: /\.(ts|tsx|jsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: { configFile: path.resolve(__dirname, '../babel.config.js') },
        },
      ],
    });
    // `react-native-css-interop` (dep do NativeWind, de onde vem o `vars()` usado pelo
    // ThemeProvider) publica `.js` com JSX cru (ex.: `doctor.js`) que o parser do webpack
    // não engole. Transpila só o JSX desse pacote. `runtime: 'classic'` de propósito: o
    // 'automatic' injetaria um `import` ESM num arquivo CommonJS (`exports`/`require`),
    // fazendo o webpack tratá-lo como ESM → erro "exports is not defined" em runtime. O
    // `React.createElement` do classic só aparece em `verifyJSX`, que nunca é chamada.
    cfg.module.rules.push({
      test: /\.js$/,
      include: /node_modules[\\/]react-native-css-interop/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            configFile: false,
            babelrc: false,
            sourceType: 'unambiguous',
            presets: [[require.resolve('@babel/preset-react'), { runtime: 'classic' }]],
          },
        },
      ],
    });
    // NativeWind web: processa o global.css (Tailwind → CSS) via PostCSS.
    // Substitui a regra de CSS implícita do Storybook (senão o arquivo é
    // processado duas vezes e o build quebra).
    cfg.module.rules = cfg.module.rules.filter(
      (rule) =>
        !(rule && typeof rule === 'object' && 'test' in rule && String(rule.test).includes('css')),
    );
    cfg.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    });
    return cfg;
  },
};

export default config;
