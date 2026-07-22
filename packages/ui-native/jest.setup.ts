// @testing-library/react-native >= 13 registers its Jest matchers (toBeOnTheScreen,
// toHaveTextContent, etc.) automatically as soon as any test imports from the
// package — the separate `/extend-expect` entry point was removed.

// Safe-area: components that call `useSafeAreaInsets()` (e.g. AppHeader) throw
// without a provider. Use the library's official jest mock (insets = 0) so specs
// render without wrapping every test in a <SafeAreaProvider>.
jest.mock('react-native-safe-area-context', () =>
  require('react-native-safe-area-context/jest/mock').default,
);

export {};
