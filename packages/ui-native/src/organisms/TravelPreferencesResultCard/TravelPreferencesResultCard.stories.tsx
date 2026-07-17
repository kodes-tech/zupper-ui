import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { TravelPreferencesResultCard } from './TravelPreferencesResultCard';

export default {
  title: 'Organisms/TravelPreferencesResultCard',
  component: TravelPreferencesResultCard,
  args: { onDismiss: action('onDismiss') },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 390, height: 600, backgroundColor: '#f5f5f5' }}>
        <Story />
      </View>
    ),
  ],
};

/** "Preferências de viagem - Feedback conclusão": quiz concluído com sucesso. */
export const Sucesso = {
  args: {
    tone: 'success',
    title: 'Preferências atualizadas',
    description:
      'Vamos personalizar sua experiência conforme suas preferências. Você pode alterá-las quando quiser.',
  },
};

/** "Preferências de viagem - Desistência do fluxo": saída com respostas incompletas. */
export const Aviso = {
  args: {
    tone: 'warning',
    title: 'Informações incompletas',
    description:
      'Suas preferências de viagem ainda não estão completas. Deseja descartar as alterações ou salvar seu progresso para continuar depois? Você pode completar as informações a qualquer momento.',
    actions: [
      { label: 'Continuar respondendo', variant: 'primary', onPress: action('onContinue') },
      { label: 'Salvar informações', variant: 'secondary', onPress: action('onSave') },
      { label: 'Descartar informações', variant: 'link', onPress: action('onDiscard') },
    ],
  },
};
