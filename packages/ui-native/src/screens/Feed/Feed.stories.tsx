import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { Feed } from './Feed';
import type { FeedDestination, FeedPost, FeedQuickAction } from './Feed';

const voos = require('../../_figma/assets/icon-quick-voos.png');
const hospedagens = require('../../_figma/assets/icon-quick-hospedagens.png');
const pacotes = require('../../_figma/assets/icon-quick-pacotes.png');
const cardDestino = require('../../_figma/assets/photos/card-destino.jpg');
const avatarViajante = require('../../_figma/assets/photos/avatar-viajante.jpg');
const avatarParceiro = require('../../_figma/assets/photos/avatar-parceiro.jpg');
const postAvatar = require('../../_figma/assets/photos/post-avatar.png');
const postImage = require('../../_figma/assets/photos/post-image.jpg');

const quickActions: FeedQuickAction[] = [
  { key: 'voos', icon: voos, label: 'Buscar Voos', onPress: action('quick:voos') },
  { key: 'hospedagens', icon: hospedagens, label: 'Hospedagens', onPress: action('quick:hospedagens') },
  { key: 'pacotes', icon: pacotes, label: 'Pacotes', onPress: action('quick:pacotes') },
];

const destinations: FeedDestination[] = [
  { id: 'recife', name: 'Recife', image: cardDestino },
  { id: 'noronha', name: 'Noronha', image: cardDestino },
  { id: 'poa', name: 'Porto Alegre', image: cardDestino },
];

const posts: FeedPost[] = [
  {
    id: '1',
    authorName: 'Ana Silva',
    authorAvatar: postAvatar,
    role: 'traveler',
    type: 'dica',
    text: 'Dicas essenciais para aproveitar Noronha sem gastar uma fortuna...',
    location: 'Fernando de Noronha',
    likes: 89,
  },
  {
    id: '2',
    authorName: 'Ana Silva',
    authorAvatar: postAvatar,
    role: 'partner',
    verified: true,
    type: 'foto',
    text: 'Passei pelo Cais do Sertão e fiquei encantado com a cultura e a arte local.',
    image: postImage,
    location: 'Fernando de Noronha',
    likes: 32,
  },
  {
    id: '3',
    authorName: 'Ana Silva',
    authorAvatar: postAvatar,
    role: 'partner',
    verified: true,
    type: 'roteiro',
    title: '7 dias inesquecíveis em Noronha',
    stops: ['Marco Zero', 'Boa Viagem', 'Olinda'],
    extraStops: 12,
    location: 'Fernando de Noronha',
    likes: 157,
  },
];

export default {
  title: 'Screens/Feed',
  component: Feed,
  args: {
    quickActions,
    destinations,
    posts,
    onSearch: action('onSearch'),
    onSeeAllDestinations: action('onSeeAllDestinations'),
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

export const Visitante = {
  args: {
    greeting: {
      title: 'Olá, viajante',
      subtitle: 'seja bem-vindo',
      role: 'guest',
      initials: 'HN',
      ctaLabel: 'Fazer login',
    },
    posts: posts.slice(0, 2),
  },
};

export const Viajante = {
  args: {
    greeting: {
      title: 'Olá, Carlos',
      subtitle: '@carlosviaja',
      role: 'traveler',
      avatar: avatarViajante,
      ctaLabel: 'Meu perfil',
    },
    cta: {
      variant: 'traveler',
      title: 'Bem-vindo de volta do Recife',
      description:
        'Sua experiência pode ajudar outros viajantes. Publique e faça parte da nossa comunidade!',
    },
  },
};

export const Parceiro = {
  args: {
    greeting: {
      title: 'Olá, Ana',
      subtitle: '@anasilvatrip',
      role: 'partner',
      avatar: avatarParceiro,
      ctaLabel: 'Meu perfil',
    },
    cta: {
      variant: 'partner',
      title: 'Sua audiência quer te ver viajando',
      description:
        'Como Zupper Parceiro, você publica suas experiências sem limites e inspira a comunidade Zupper.',
    },
  },
};
