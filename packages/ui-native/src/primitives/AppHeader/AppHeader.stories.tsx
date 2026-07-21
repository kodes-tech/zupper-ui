import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { AppHeader } from './AppHeader';

export default {
  title: 'Primitives/AppHeader',
  component: AppHeader,
  args: { onBack: action('onBack') },
  decorators: [(Story: React.ComponentType) => <View style={{ width: 390 }}><Story /></View>],
};

export const Default = { args: { title: 'Meu Perfil - Comunidade' } };
export const ComIconeTitulo = { args: { title: 'Destinos em alta', titleIcon: 'fire-destinos' } };

// Modo "só voltar": sem título, apenas a seta à esquerda (telas de auth, cujo
// título fica no corpo). Fundo transparente pra herdar o fundo da tela.
export const SoVoltar = { args: { background: 'transparent' } };

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
