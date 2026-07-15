import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { SupportSection } from './SupportSection';

export default {
  title: 'Organisms/SupportSection',
  component: SupportSection,
  args: {
    onPressItem: action('onPressItem'),
  },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 390, paddingVertical: 16 }}>
        <Story />
      </View>
    ),
  ],
};

/** Como na Home do app: um único canal, "Central de ajuda". */
export const CentralDeAjuda = {
  args: {
    items: [{ id: 'help', icon: 'support-help', title: 'Central de ajuda', actionLabel: 'Acessar' }],
  },
};

/** Vários canais, para mostrar o separador entre itens e a descrição opcional. */
export const VariosCanais = {
  args: {
    items: [
      { id: 'help', icon: 'support-help', title: 'Central de ajuda', actionLabel: 'Acessar' },
      {
        id: 'whats',
        icon: 'support-whatsapp',
        title: 'WhatsApp',
        description: 'Atendimento de seg. a sex., 9h às 18h',
        actionLabel: 'Ir agora',
      },
    ],
  },
};
