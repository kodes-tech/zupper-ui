import React from 'react';
import { View } from 'react-native';
import { CommentThread } from './CommentThread';
import type { Comment } from './CommentThread';

const comments: Comment[] = [
  { id: '1', name: 'Marina', text: 'Anotado! Vou nessa semana.' },
  { id: '2', name: 'Pedro', text: 'O Cais é incrível mesmo' },
];

export default {
  title: 'Molecules/CommentThread',
  component: CommentThread,
  args: {
    authorComment: {
      name: 'Carlos Souza',
      text: 'Passei pelo Cais do Sertão e fiquei encantado com a cultura e a arte local. Vale muito a visita!',
    },
    comments,
  },
  decorators: [(Story: React.ComponentType) => <View style={{ width: 390, padding: 16 }}><Story /></View>],
};

export const Padrao = { args: {} };
export const SemComentarios = { args: { comments: [] } };
