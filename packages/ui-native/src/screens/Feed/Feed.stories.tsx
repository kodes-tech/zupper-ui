import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { Feed } from './Feed';
import type { FeedPost } from './Feed';

const avatarViajante = require('../../_figma/assets/photos/post-avatar-carlos.png');
const avatarParceiro = require('../../_figma/assets/photos/avatar-parceiro.jpg');
const postImage = require('../../_figma/assets/photos/post-image.jpg');

const posts: FeedPost[] = [
  {
    id: '1',
    authorName: 'Ana Silva',
    authorAvatar: avatarParceiro,
    role: 'partner',
    verified: true,
    type: 'dica',
    text: 'Dicas essenciais para aproveitar Fernando de Noronha sem gastar uma fortuna...',
    location: 'Fernando de Noronha, PE',
    likes: 158,
    liked: true,
  },
  {
    id: '2',
    authorName: 'Carlos Souza',
    authorAvatar: avatarViajante,
    role: 'traveler',
    type: 'foto',
    text: 'Passei pelo Cais do Sertão e fiquei encantado com a cultura e a arte local.',
    image: postImage,
    location: 'Recife, PE',
    likes: 32,
  },
];

export default {
  title: 'Screens/Feed',
  component: Feed,
  args: { onRetry: action('onRetry') },
  decorators: [(Story: React.ComponentType) => <View style={{ width: 390 }}><Story /></View>],
};

export const Default = { args: { posts } };
export const Loading = { args: { loading: true } };
export const Empty = { args: { posts: [] } };
export const ErrorState = { args: { error: 'Não foi possível carregar o feed.' } };
