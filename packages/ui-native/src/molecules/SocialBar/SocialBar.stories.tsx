import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { SocialBar } from './SocialBar';

export default {
  title: 'Molecules/SocialBar',
  component: SocialBar,
  args: {
    likes: 0,
    comments: 0,
    onLike: action('onLike'),
    onComment: action('onComment'),
    onShare: action('onShare'),
    onMore: action('onMore'),
  },
  decorators: [(Story: React.ComponentType) => <View style={{ width: 390, padding: 16 }}><Story /></View>],
};

export const Zerado = { args: {} };
export const ComContadores = { args: { likes: 128, comments: 12, liked: true } };
