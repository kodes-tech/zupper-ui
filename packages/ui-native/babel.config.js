/**
 * Babel env-aware:
 * - jest (NODE_ENV=test) → preset do React Native (Hermes/Metro).
 * - Storybook web / demais → preset-env + typescript + react (react-native-web).
 *
 * OBS: o `bob build` usa o preset próprio dele; se o build reclamar deste
 * arquivo, isolamos com um babel.config dedicado ao bob.
 */
module.exports = (api) => {
  const isTest = api.env('test');
  api.cache.using(() => process.env.NODE_ENV);

  if (isTest) {
    return {
      // `nativewind/babel` habilita `className` nos componentes RN (jsxImportSource).
      presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
      plugins: ['babel-plugin-styled-components'],
    };
  }

  return {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
      '@babel/preset-typescript',
      ['@babel/preset-react', { runtime: 'automatic' }],
      'nativewind/babel',
    ],
    plugins: ['babel-plugin-styled-components'],
  };
};
