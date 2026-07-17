import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { TravelPreferencesResult } from './TravelPreferencesResult';

const avatarViajante = require('../../_figma/assets/photos/avatar-viajante.jpg');
const grid = [
  require('../../_figma/assets/photos/comunidade-grid-01.jpg'),
  require('../../_figma/assets/photos/comunidade-grid-02.jpg'),
  require('../../_figma/assets/photos/comunidade-grid-03.jpg'),
  require('../../_figma/assets/photos/comunidade-grid-04.jpg'),
  require('../../_figma/assets/photos/comunidade-grid-05.jpg'),
  require('../../_figma/assets/photos/comunidade-grid-06.jpg'),
  require('../../_figma/assets/photos/comunidade-grid-07.jpg'),
  require('../../_figma/assets/photos/comunidade-grid-08.jpg'),
  require('../../_figma/assets/photos/comunidade-grid-09.jpg'),
];

export default {
  title: 'Screens/TravelPreferencesResult',
  component: TravelPreferencesResult,
  args: {
    name: 'Carlos Souza',
    subtitle: '@carlosviaja',
    role: 'traveler',
    avatar: avatarViajante,
    photos: grid,
    onBack: action('onBack'),
    onNavigate: action('onNavigate'),
    onPublish: action('onPublish'),
    onDismissResult: action('onDismissResult'),
  },
  parameters: { layout: 'centered' },
  decorators: [
    (Story: React.ComponentType) => (
      <View
        style={{
          width: 390,
          height: 844,
          borderRadius: 24,
          overflow: 'hidden',
          borderWidth: 8,
          borderColor: '#1a1a1a',
        }}
      >
        <Story />
      </View>
    ),
  ],
};

/** "Preferências de viagem - Feedback conclusão": quiz concluído com sucesso. */
export const FeedbackConclusao = {
  args: {
    tone: 'success',
    title: 'Preferências atualizadas',
    description:
      'Vamos personalizar sua experiência conforme suas preferências. Você pode alterá-las quando quiser.',
  },
};

/** "Preferências de viagem - Desistência do fluxo": saída com respostas incompletas. */
export const DesistenciaDoFluxo = {
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
