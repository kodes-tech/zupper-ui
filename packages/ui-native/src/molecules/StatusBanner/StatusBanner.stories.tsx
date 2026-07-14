import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { StatusBanner } from './StatusBanner';

export default {
  title: 'Molecules/StatusBanner',
  component: StatusBanner,
  args: { onPressAction: action('onPressAction') },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 350, padding: 20 }}>
        <Story />
      </View>
    ),
  ],
};

export const EmAnalise = {
  args: {
    tone: 'warning',
    title: 'Publicação em análise',
    description:
      'Recebemos uma denúncia sobre esta publicação. Nossa equipe está avaliando e ela segue visível por enquanto. Avisaremos o resultado.',
    actionLabel: 'Entenda as regras da comunidade',
  },
};

export const Removida = {
  args: {
    tone: 'danger',
    title: 'Publicação removida',
    description:
      'Esta publicação foi removida por violar as diretrizes da comunidade Zupper (motivo: informação incorreta sobre o destino). Ela não está mais visível para outros viajantes.',
    actionLabel: 'Contestar decisão',
  },
};
