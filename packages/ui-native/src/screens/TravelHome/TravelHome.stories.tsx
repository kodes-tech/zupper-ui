import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { TravelHome } from './TravelHome';

const cardDestino = require('../../_figma/assets/photos/card-destino.jpg');
const bannerDestino = require('../../_figma/assets/photos/banner-destino.jpg');

const searchHistory = [
  { id: 'rec', type: 'voo' as const, destination: 'Recife', dates: '10 set - 20 set', image: cardDestino },
  { id: 'ssa', type: 'hospedagem' as const, destination: 'Salvador', dates: '02 out - 08 out' },
];

const news = [
  { id: 'a', image: bannerDestino, onPress: action('news-a') },
  { id: 'b', image: cardDestino, onPress: action('news-b') },
];

const support = [
  { id: 'help', icon: 'support-help' as const, title: 'Central de ajuda', actionLabel: 'Acessar' },
];

export default {
  title: 'Screens/TravelHome',
  component: TravelHome,
  args: {
    active: 'reservar',
    onSelectProductTab: action('onSelectProductTab'),
    onChangeTripType: action('onChangeTripType'),
    onPressOrigin: action('onPressOrigin'),
    onPressDestination: action('onPressDestination'),
    onSwapEndpoints: action('onSwapEndpoints'),
    onPressDates: action('onPressDates'),
    onPressTravelers: action('onPressTravelers'),
    onSearch: action('onSearch'),
    onPressHistoryItem: action('onPressHistoryItem'),
    onPressSupport: action('onPressSupport'),
    onNavigate: action('onNavigate'),
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

/** Estado inicial real do app: campos vazios, 1 adulto/econômica, CTA desabilitado. */
export const Vazio = {};

export const Preenchido = {
  args: {
    origin: { city: 'São Paulo, SP', airport: 'GRU - Aeroporto de Guarulhos, SP' },
    destination: { city: 'Recife, PE', airport: 'REC - Aeroporto Internacional do Recife, PE' },
    dates: '10 Set 26 - 20 Set 26',
    travelers: '2 Viajantes, econômica',
    canSearch: true,
    searchHistory,
    news,
    support,
  },
};

/** Estado vazio de busca, mas com as seções de conteúdo (histórico, novidades, atendimento). */
export const ComHistorico = {
  args: {
    searchHistory,
    news,
    support,
  },
};

export const SoIda = {
  args: {
    tripType: 'soIda',
  },
};
