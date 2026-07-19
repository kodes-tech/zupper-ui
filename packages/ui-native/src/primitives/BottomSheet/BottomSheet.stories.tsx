import React from 'react';
import { Text, View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { BottomSheet } from './BottomSheet';
import { SheetOption } from '../SheetOption';

export default {
  title: 'Primitives/BottomSheet',
  component: BottomSheet,
  args: { onDismiss: action('onDismiss') },
  parameters: { layout: 'centered' },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 390, height: 500, backgroundColor: '#F5F5F5' }}>
        <Story />
      </View>
    ),
  ],
};

export const SemCabecalho = {
  args: {
    children: (
      <>
        <SheetOption emoji="🔖" label="Salvar publicação" />
        <SheetOption emoji="↗" label="Compartilhar" />
      </>
    ),
  },
};

export const ComCabecalho = {
  args: {
    title: 'Por que você está denunciando?',
    description: 'Sua denúncia é anônima. Se alguém estiver em perigo, chame a emergência.',
    children: <SheetOption label="Spam ou propaganda enganosa" chevron />,
  },
};

export const ConteudoLivre = {
  args: {
    title: 'Conteúdo livre',
    children: (
      <View style={{ padding: 20 }}>
        <Text>O sheet aceita qualquer conteúdo, não só listas de opção.</Text>
      </View>
    ),
  },
};
