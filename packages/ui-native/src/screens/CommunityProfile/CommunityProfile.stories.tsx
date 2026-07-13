import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { CommunityProfile } from './CommunityProfile';
import type { ProfilePost, ProfilePostSection } from './CommunityProfile';
import { PublishedModal } from '../../organisms/PublishedModal';

const avatarViajante = require('../../_figma/assets/photos/avatar-viajante.jpg');
const emptyIllustration = require('../../_figma/assets/illustrations/empty-comunidade.png');
const postAvatar = require('../../_figma/assets/photos/post-avatar-carlos.png');
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

const dica = (id: string, location: string): ProfilePost => ({
  id,
  authorName: 'Carlos Souza',
  authorAvatar: postAvatar,
  role: 'traveler',
  type: 'dica',
  text: 'Dicas essenciais para aproveitar Noronha sem gastar uma fortuna...',
  location,
  likes: 89,
});

const roteiro = (id: string, location: string): ProfilePost => ({
  id,
  authorName: 'Carlos Souza',
  authorAvatar: postAvatar,
  role: 'traveler',
  type: 'roteiro',
  title: '7 dias inesquecíveis em Noronha',
  stops: ['Marco Zero', 'Boa Viagem', 'Olinda'],
  extraStops: 12,
  location,
  likes: 89,
});

const dicaSections: ProfilePostSection[] = [
  { location: 'Recife, PE', posts: [dica('d1', 'Recife, PE'), dica('d2', 'Recife, PE')] },
  { location: 'São Paulo, SP', posts: [dica('d3', 'São Paulo, SP')] },
];

const roteiroSections: ProfilePostSection[] = [
  { location: 'Recife, PE', posts: [roteiro('r1', 'Recife, PE'), roteiro('r2', 'Recife, PE')] },
  { location: 'São Paulo, SP', posts: [roteiro('r3', 'São Paulo, SP')] },
];

export default {
  title: 'Screens/CommunityProfile',
  component: CommunityProfile,
  args: {
    name: 'Olá, Carlos',
    subtitle: '@carlosviaja',
    role: 'traveler',
    avatar: avatarViajante,
    photos: grid,
    dicaSections,
    roteiroSections,
    emptyIllustration,
    onBack: action('onBack'),
    onTabChange: action('onTabChange'),
    onPublish: action('onPublish'),
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

export const Fotos = { args: { tab: 'fotos' } };
export const Dicas = { args: { tab: 'dicas' } };
export const Roteiros = { args: { tab: 'roteiros' } };

/** Estado "Sem conteúdo": nenhuma publicação em nenhuma aba → ilustração + chamada pra publicar. */
export const SemConteudo = {
  args: { tab: 'fotos', photos: [], dicaSections: [], roteiroSections: [] },
};

// ── Feedback de publicação ──────────────────────────────────────────────────
// O modal entra pela prop `overlay`: o app abre ao voltar de "Publicar conteúdo".
// `autoDismissMs` fica de fora de propósito — no Figma o modal se fecha sozinho
// em 3s, o que aqui só faria a story sumir enquanto se olha pra ela.

/** Voltando de "Publicar conteúdo — Foto": modal de sucesso sobre o perfil. */
export const FotoPublicada = {
  args: {
    tab: 'fotos',
    overlay: <PublishedModal type="foto" onDismiss={action('onDismiss')} />,
  },
};

/** Voltando de "Publicar conteúdo — Dica". */
export const DicaPublicada = {
  args: {
    tab: 'fotos',
    overlay: <PublishedModal type="dica" onDismiss={action('onDismiss')} />,
  },
};

/** Voltando de "Publicar conteúdo — Roteiro". */
export const RoteiroPublicado = {
  args: {
    tab: 'fotos',
    overlay: <PublishedModal type="roteiro" onDismiss={action('onDismiss')} />,
  },
};
