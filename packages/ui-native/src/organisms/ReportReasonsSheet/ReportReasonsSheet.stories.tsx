import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { ReportReasonsSheet } from './ReportReasonsSheet';
import type { ReportReason } from './ReportReasonsSheet';

const reportReasons: ReportReason[] = [
  { id: 'spam', label: 'Spam ou propaganda enganosa' },
  { id: 'improprio', label: 'Conteúdo impróprio ou ofensivo' },
  { id: 'informacao-falsa', label: 'Informação falsa sobre o destino' },
  { id: 'odio', label: 'Discurso de ódio ou bullying' },
  { id: 'golpe', label: 'Golpe ou fraude' },
  { id: 'fora-de-contexto', label: 'Não é sobre viagem' },
];

export default {
  title: 'Organisms/ReportReasonsSheet',
  component: ReportReasonsSheet,
  args: {
    reasons: reportReasons,
    onSelectReason: action('onSelectReason'),
    onCancelReport: action('onCancelReport'),
    onDismiss: action('onDismiss'),
  },
  parameters: { layout: 'centered' },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 390, height: 640, backgroundColor: '#F5F5F5' }}>
        <Story />
      </View>
    ),
  ],
};

export const Default = {};
