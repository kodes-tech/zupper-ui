import type { Preview } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../global.css'; // NativeWind: registra os utilitários do Tailwind no preview web
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
      <SafeAreaProvider initialMetrics={initialMetrics}>
        <View style={{ padding: 24, alignItems: 'flex-start' }}>
          <Story />
        </View>
      </SafeAreaProvider>
    ),
  ],
};

export default preview;
