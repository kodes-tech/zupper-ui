// @testing-library/react-native >= 13 registers its Jest matchers (toBeOnTheScreen,
// toHaveTextContent, etc.) automatically as soon as any test imports from the
// package — the separate `/extend-expect` entry point was removed. No setup
// needed here anymore; kept as an explicit file in case future setup is needed.
export {};
