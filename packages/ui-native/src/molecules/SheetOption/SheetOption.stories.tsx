import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { SheetOption } from './SheetOption';

export default {
  title: 'Molecules/SheetOption',
  component: SheetOption,
  args: { onPress: action('onPress') },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 390, backgroundColor: '#FFFFFF' }}>
        <Story />
      </View>
    ),
  ],
};

export const ComEmoji = { args: { emoji: '🔖', label: 'Salvar publicação' } };
export const Destrutiva = { args: { emoji: '⚑', label: 'Denunciar', destructive: true } };
export const ComSeta = { args: { label: 'Spam ou propaganda enganosa', chevron: true } };
