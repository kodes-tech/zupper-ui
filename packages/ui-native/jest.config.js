module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    // resolve o pacote de tokens direto do source (workspace), sem precisar buildar
    '^@kodes-tech/tokens$': '<rootDir>/../tokens/src/index.ts',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(?:@react-native|react-native|styled-components|nativewind|react-native-css-interop|react-native-reanimated|react-native-safe-area-context|react-native-linear-gradient|react-native-svg)/)',
  ],
  testMatch: ['<rootDir>/src/**/*.spec.{ts,tsx}'],
};
