import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { PostCard } from './PostCard';

// Fotos reais do Figma (referência) — só para as stories; o componente é agnóstico de asset.
const avatarViajante = require('../../_figma/assets/photos/post-avatar-carlos.png');
const avatarParceiro = require('../../_figma/assets/photos/avatar-parceiro.jpg');
const postImage = require('../../_figma/assets/photos/post-image.jpg');

export default {
  title: 'Organisms/PostCard',
  component: PostCard,
  args: { onPress: action('onPress'), onLike: action('onLike') },
  decorators: [(Story: React.ComponentType) => <View style={{ width: 390 }}><Story /></View>],
};

export const DicaViajante = {
  args: {
    authorName: 'Carlos Souza',
    authorAvatar: avatarViajante,
    role: 'traveler',
    type: 'dica',
    text: 'Passei pelo Cais do Sertão e fiquei encantado com a cultura e a arte local. Vale muito a visita!',
    location: 'Recife, PE',
    likes: 32,
  },
};

export const FotoComImagem = {
  args: {
    authorName: 'Carlos Souza',
    authorAvatar: avatarViajante,
    role: 'traveler',
    type: 'foto',
    text: 'Visitei o Marco Zero em Recife, um ponto histórico vibrante que celebra a cultura pernambucana.',
    image: postImage,
    location: 'Recife, PE',
    likes: 32,
  },
};

export const ParceiroVerificado = {
  args: {
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
};
