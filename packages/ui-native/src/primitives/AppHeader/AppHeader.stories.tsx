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

// Stories por CAPACIDADE (o que a API faz), não por tela de produto — o
// primitivo é genérico; o uso concreto (Perfil, Destinos, Publicar…) mora no app.

// Barra padrão: voltar + título centralizado.
export const ComTitulo = { args: { title: 'Título da tela' } };

// `titleIcon` — um glifo antes do título.
export const IconeAntesDoTitulo = { args: { title: 'Título da tela', titleIcon: 'fire-destinos' } };

// `trailingIcon` — um glifo depois do título.
export const IconeDepoisDoTitulo = { args: { title: 'Título da tela', trailingIcon: 'content-foto' } };

// `background='transparent'` — a barra herda o fundo da tela (aqui, cinza).
export const FundoTransparente = {
  args: { title: 'Título da tela', background: 'transparent' },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 390, backgroundColor: '#f5f5f5' }}>
        <Story />
      </View>
    ),
  ],
};

// Sem título — modo "só voltar" (o título fica no corpo da tela).
export const SoVoltar = { args: { background: 'transparent' } };
