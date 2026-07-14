import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { DestinationDetails } from './DestinationDetails';
import type { DestinationOffer, DestinationPost } from './DestinationDetails';

const banner = require('../../_figma/assets/photos/banner-destino.jpg');
const avatar = require('../../_figma/assets/photos/post-avatar-carlos.png');
const photo = require('../../_figma/assets/photos/post-image.jpg');

const author = { authorName: 'Carlos Souza', authorAvatar: avatar, role: 'traveler' as const };
const meta = { location: 'Recife, PE', likes: 0 };

const offers: DestinationOffer[] = [
  {
    id: 'passagens',
    title: 'Passagens aéreas',
    icon: 'oferta-passagens',
    priceLabel: 'Voos a partir',
    price: 'R$ 1.086',
    dateRange: 'Jul 12 – Jul 19',
    ctaLabel: 'Ver passagens',
  },
  {
    id: 'hospedagens',
    title: 'Hospedagens',
    icon: 'oferta-hospedagens',
    priceLabel: 'Diárias a partir',
    price: 'R$ 390',
    dateRange: 'Jul 12 – Jul 19',
    ctaLabel: 'Ver hospedagens',
  },
  {
    id: 'pacotes',
    title: 'Pacotes',
    icon: 'oferta-pacotes',
    priceLabel: 'Pacotes a partir',
    price: 'R$ 3.626',
    dateRange: 'Jul 12 – Jul 19',
    ctaLabel: 'Ver pacotes',
  },
];

const dica: DestinationPost = {
  id: 'dica',
  ...author,
  ...meta,
  type: 'dica',
  text: 'Dicas essenciais para aproveitar Noronha sem gastar uma fortuna...',
};

const foto: DestinationPost = {
  id: 'foto',
  ...author,
  ...meta,
  type: 'foto',
  text: 'Dicas essenciais para aproveitar Noronha sem gastar uma fortuna...',
  image: photo,
};

const roteiro: DestinationPost = {
  id: 'roteiro',
  ...author,
  ...meta,
  type: 'roteiro',
  title: '7 dias inesquecíveis em Noronha',
  stops: ['Marco Zero', 'Boa Viagem', 'Olinda'],
  extraStops: 12,
};

const many = (post: DestinationPost, n: number): DestinationPost[] =>
  Array.from({ length: n }, (_, i) => ({ ...post, id: `${post.id}-${i}` }));

export default {
  title: 'Screens/DestinationDetails',
  component: DestinationDetails,
  args: {
    title: 'Fernando de Noronha, PE',
    banner,
    onBack: action('onBack'),
    onTabChange: action('onTabChange'),
    onPressOffer: action('onPressOffer'),
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

export const VerTudo = {
  args: { tab: 'ver-tudo', offers, posts: [dica, foto, roteiro, dica] },
};

export const Dicas = { args: { tab: 'dicas', posts: many(dica, 4) } };
export const Fotos = { args: { tab: 'fotos', posts: many(foto, 4) } };
export const Roteiros = { args: { tab: 'roteiros', posts: many(roteiro, 4) } };
