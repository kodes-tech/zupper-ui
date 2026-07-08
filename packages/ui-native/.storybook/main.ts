import type { StorybookConfig } from '@storybook/react-webpack5';

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
    return cfg;
  },
};

export default config;
