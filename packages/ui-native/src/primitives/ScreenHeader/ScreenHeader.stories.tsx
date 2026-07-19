import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { ScreenHeader } from './ScreenHeader';

export default {
  title: 'Primitives/ScreenHeader',
  component: ScreenHeader,
  args: { onBack: action('onBack') },
  decorators: [(Story: React.ComponentType) => <View style={{ width: 390 }}><Story /></View>],
};

export const Default = { args: { title: 'Meu Perfil - Comunidade' } };
export const ComIconeTitulo = { args: { title: 'Destinos em alta', titleIcon: 'fire-destinos' } };

// Variante do formulário "Publicar conteúdo": ícone do tipo após o título e
// fundo transparente (herda o cinza da tela).
export const Publicar = {
  args: { title: 'Publicar uma foto', trailingIcon: 'content-foto', background: 'transparent' },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 390, backgroundColor: '#f5f5f5' }}>
        <Story />
      </View>
    ),
  ],
};
