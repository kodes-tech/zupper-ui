import type { Preview } from '@storybook/react';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { themes } from '@kodes-tech/tokens';
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

// Toggle de tema na toolbar do Storybook. Os itens derivam de `themes` — um tema novo
// aparece sozinho no toggle (título amigável opcional em THEME_TITLES; senão usa o nome).
const THEME_TITLES: Record<string, string> = { default: 'Default (light)', dark: 'Dark' };

export const globalTypes = {
  theme: {
    description: 'Tema do design system',
    defaultValue: 'default',
    toolbar: {
      title: 'Theme',
      icon: 'paintbrush',
      items: Object.keys(themes).map((name) => ({ value: name, title: THEME_TITLES[name] ?? name })),
      dynamicTitle: true,
    },
  },
};

const preview: Preview = {
  // Gera uma página "Docs" automática por componente (catálogo do design system).
  // Serve de inventário navegável — ajuda a não recriar componente que já existe.
  tags: ['autodocs'],
  parameters: {
    controls: { matchers: { color: /(background|color)$/i } },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme ?? 'default';
      // O `ThemeProvider` (via `vars()`) é o mecanismo real de tema, igual ao app RN —
      // aplica as variáveis do tema na subárvore e expõe `useTheme()` p/ os consumidores
      // JS (gradientes/selectionColor). Setar `data-theme` no `<html>` é reforço web: dá
      // o baseline (:root/[data-theme] do theme.css) caso o `vars()` não pegue no RNW.
      React.useEffect(() => {
        if (theme === 'default') delete document.documentElement.dataset.theme;
        else document.documentElement.dataset.theme = theme;
      }, [theme]);
      return (
        <SafeAreaProvider initialMetrics={initialMetrics}>
          {/* Fundo de TELA teal no dark via `bg-surface-screen`; cards/diálogos claros
              por cima. `min-h-screen` faz o fundo preencher a viewport. */}
          <ThemeProvider
            theme={theme}
            className="min-h-screen flex-1 bg-surface-screen"
            style={{ padding: 24, alignItems: 'flex-start' }}
          >
            <Story />
          </ThemeProvider>
        </SafeAreaProvider>
      );
    },
  ],
};

export default preview;
