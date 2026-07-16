// ESLint flat config (ESLint 9) — TypeScript + React, formatação delegada ao Prettier.
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/lib/**',
      '**/dist/**',
      '**/.storybook/**',
      '**/storybook-static/**',
      '**/*.config.js',
      '**/*.config.mjs',
      '**/*.config.ts',
      '**/babel.config.js',
      '**/jest.setup.ts',
      '**/nativewind-env.d.ts',
      '**/_figma/**',
      '**/_zupper-app/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // novo JSX transform (RN 0.83 / React 19)
      'react/prop-types': 'off', // usamos TypeScript
    },
  },
  {
    // Testes e stories: relaxar regras que só fazem sentido em código de produção.
    files: ['**/*.spec.{ts,tsx}', '**/*.stories.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      // stories usam `require('...jpg/png')` pra assets estáticos (idioma do
      // Metro/React Native pra imagens) — só faz sentido barrar require em produção.
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    // Scripts Node do repo (ferramentas) — globals do Node (console, process, Buffer, URL…).
    // Inclui os scripts na raiz e os de cada pacote (ex.: packages/ui-native/scripts).
    files: ['scripts/**/*.{js,mjs}', '**/scripts/**/*.{js,mjs}'],
    languageOptions: {
      globals: globals.node,
    },
  },
  prettier, // desliga regras de formatação — quem formata é o Prettier
);
