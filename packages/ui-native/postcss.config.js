// PostCSS para o Storybook web (react-native-web). Gera as classes do Tailwind
// a partir do tailwind.config.js. No app (metro) quem faz isso é `withNativeWind`.
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
