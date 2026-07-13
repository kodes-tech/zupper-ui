const { tailwindPreset } = require('@kodes-tech/tokens/tailwind');

/**
 * Tailwind da lib — usado pelo harness local (Storybook/jest).
 * `nativewind/preset` habilita os utilitários no React Native;
 * `tailwindPreset` (dos tokens) injeta cores/spacing/radius/tipografia do Zupper.
 *
 * ⚠️ O **zupper-app** tem o SEU próprio tailwind.config.js — ele soma estes dois
 * presets E inclui `@kodes-tech/ui-native` no `content` (ver docs/nativewind-zupper-app.md).
 *
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset'), tailwindPreset],
};
