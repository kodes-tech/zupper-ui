import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

/**
 * Storybook web para componentes React Native, via react-native-web.
 * O alias react-native -> react-native-web faz os componentes RN
 * renderizarem no navegador (preview leve, sem simulador).
 */
const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: async (cfg) => {
    cfg.resolve = cfg.resolve ?? {};
    cfg.resolve.alias = {
      ...(cfg.resolve.alias ?? {}),
      'react-native$': 'react-native-web',
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
