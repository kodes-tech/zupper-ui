import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { ContentDetail } from './ContentDetail';
import type { ContentOffer } from './ContentDetail';
import type { Comment } from '../../molecules/CommentThread';
import type { RoteiroDayCardProps } from '../../molecules/RoteiroDayCard';

const avatar = require('../../_figma/assets/photos/avatar-viajante.jpg');
const fullPhoto = require('../../_figma/assets/photos/conteudo-foto-full.jpg');

const author = {
  name: 'Carlos Souza',
  handle: '@carlosviaja',
  avatar,
  role: 'traveler' as const,
};

const comments: Comment[] = [
  { id: '1', name: 'Marina', text: 'Anotado! Vou nessa semana.' },
  { id: '2', name: 'Pedro', text: 'O Cais é incrível mesmo' },
];

const authorComment = {
  name: 'Carlos Souza',
  text: 'Passei pelo Cais do Sertão e fiquei encantado com a cultura e a arte local. Vale muito a visita!',
};

const social = {
  likes: 0,
  commentCount: 0,
  authorComment,
  comments,
  onBack: action('onBack'),
  onLike: action('onLike'),
  onComment: action('onComment'),
  onShare: action('onShare'),
  onMore: action('onMore'),
  onWriteComment: action('onWriteComment'),
  onSendComment: action('onSendComment'),
  onNavigate: action('onNavigate'),
};

const day = (label: string): RoteiroDayCardProps => ({
  day: label,
  title: 'Recife Antigo',
  stops: [
    {
      id: 'manha',
      period: 'MANHÃ',
      title: 'Marco Zero e Rua do Bom Jesus',
      description: 'Comece cedo, tem sombra e é plano pra carrinho.',
    },
    {
      id: 'tarde',
      period: 'TARDE',
      title: 'Embaixada dos Bonecos Gigantes',
      description: 'As crianças amam. Ingresso barato.',
    },
    {
      id: 'noite',
      period: 'NOITE',
      title: 'Jantar na Rua da Moeda',
      description: 'Opções pra todos os gostos.',
    },
  ],
});

const offers: ContentOffer[] = [
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
];

export default {
  title: 'Screens/ContentDetail',
  component: ContentDetail,
  args: { onPressOffer: action('onPressOffer'), ...social },
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

export const Foto = {
  args: {
    type: 'foto',
    title: 'Foto',
    author: { ...author, location: 'Fernando de Noronha' },
    photo: fullPhoto,
  },
};

export const Dica = {
  args: {
    type: 'dica',
    title: 'Dica',
    author,
    contentTitle: 'Dicas essenciais para aproveitar Noronha sem gastar uma fortuna...',
    date: '02/07/2026',
    readingTime: '2 min de leitura',
    description:
      'Fernando de Noronha é um paraíso que pode ser aproveitado sem gastar muito. Prefira a baixa temporada, opte por pousadas familiares, aproveite as praias públicas e trilhas autoguiadas, e reserve passeios com antecedência buscando pacotes promocionais.',
  },
};

export const Roteiro = {
  args: {
    type: 'roteiro',
    title: 'Roteiro',
    author,
    contentTitle: '3 dias em Recife com crianças',
    date: '02/07/2026',
    readingTime: '5 min de leitura',
    metadata: ['3 dias', '8 paradas', 'Família'],
    description:
      'Fizemos essa viagem em julho com duas crianças (5 e 9 anos). Roteiro testado e aprovado, com ritmo leve e muita praia.',
    days: [day('Dia 1.'), day('Dia 2.'), day('Dia 3.')],
    offersTitle: 'Gostou do roteiro? Aproveite as ofertas',
    offers,
  },
};
