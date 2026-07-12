import React from 'react';
import { View } from 'react-native';
import { ContentAuthor } from './ContentAuthor';

const avatar = require('../../_figma/assets/photos/avatar-viajante.jpg');

export default {
  title: 'Molecules/ContentAuthor',
  component: ContentAuthor,
  args: {
    name: 'Carlos Souza',
    handle: '@carlosviaja',
    avatar,
    role: 'traveler',
  },
  decorators: [(Story: React.ComponentType) => <View style={{ width: 390 }}><Story /></View>],
};

export const SemLocalizacao = { args: {} };
export const ComLocalizacao = { args: { location: 'Fernando de Noronha' } };
