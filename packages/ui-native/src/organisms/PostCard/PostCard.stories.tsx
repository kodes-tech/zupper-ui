import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { PostCard } from './PostCard';

const avatarPost = require('../../_figma/assets/photos/post-avatar.png');
const postImage = require('../../_figma/assets/photos/post-image.jpg');

export default {
  title: 'Organisms/PostCard',
  component: PostCard,
  args: { onPress: action('onPress'), onLike: action('onLike') },
  decorators: [(Story: React.ComponentType) => <View style={{ width: 350 }}><Story /></View>],
};

export const Dica = {
  args: {
    authorName: 'Ana Silva',
    authorAvatar: avatarPost,
    role: 'traveler',
    type: 'dica',
    text: 'Dicas essenciais para aproveitar Noronha sem gastar uma fortuna...',
    location: 'Fernando de Noronha',
    likes: 89,
  },
};

export const FotoParceiro = {
  args: {
    authorName: 'Ana Silva',
    authorAvatar: avatarPost,
    role: 'partner',
    verified: true,
    type: 'foto',
    text: 'Passei pelo Cais do Sertão e fiquei encantado com a cultura e a arte local.',
    image: postImage,
    location: 'Fernando de Noronha',
    likes: 32,
  },
};

export const Roteiro = {
  args: {
    authorName: 'Ana Silva',
    authorAvatar: avatarPost,
    role: 'partner',
    verified: true,
    type: 'roteiro',
    title: '7 dias inesquecíveis em Noronha',
    stops: ['Marco Zero', 'Boa Viagem', 'Olinda'],
    extraStops: 12,
    location: 'Fernando de Noronha',
    likes: 157,
  },
};
