module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: ['node_modules/(?!(?:@react-native|react-native|react-native-svg)/)'],
  testMatch: ['<rootDir>/src/**/*.spec.{ts,tsx}'],
};
