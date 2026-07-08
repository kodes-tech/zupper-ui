import type { Preview } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';
import '../global.css'; // NativeWind: registra os utilitários do Tailwind no preview web
import './preview.css'; // @font-face da Satoshi — o navegador não tem a fonte nativa do app

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i } },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 24, alignItems: 'flex-start' }}>
        <Story />
      </View>
    ),
  ],
};

export default preview;
