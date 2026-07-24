import type { Preview } from '@storybook/react';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '../src/theme/ThemeProvider';
import '../global.css'; // NativeWind + baseline dos temas (global.css já @importa theme.css)
import './preview.css'; // @font-face da Satoshi — o navegador não tem a fonte nativa do app

// Métricas de safe-area fixas p/ o preview web. Sem device pra medir, injetamos
// um frame de phone com insets típicos (notch + home indicator) para que
// primitivos com `useSafeAreaInsets` (ex.: AppHeader) tenham valor imediato —
// sem isto o RN safe-area lança "No safe area value available" no navegador.
const initialMetrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

const preview: Preview = {
  // Gera uma página "Docs" automática por componente (catálogo do design system).
  // Serve de inventário navegável — ajuda a não recriar componente que já existe.
  tags: ['autodocs'],
  parameters: {
    controls: { matchers: { color: /(background|color)$/i } },
  },
  decorators: [
    (Story) => (
      // `ThemeProvider` (via `vars()`) é o mecanismo real de tema, igual ao app RN:
      // aplica as variáveis do tema na subárvore e expõe `useTheme()` p/ consumidores
      // JS (gradientes/selectionColor). O preview fica fixo no tema `default`.
      <SafeAreaProvider initialMetrics={initialMetrics}>
        <ThemeProvider
          theme="default"
          className="min-h-screen flex-1 bg-surface-screen"
          style={{ padding: 24, alignItems: 'flex-start' }}
        >
          <Story />
        </ThemeProvider>
      </SafeAreaProvider>
    ),
  ],
};

export default preview;
