import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { CommentInput } from './CommentInput';

export default {
  title: 'Molecules/CommentInput',
  component: CommentInput,
  args: { onPress: action('onPress'), onSend: action('onSend') },
  decorators: [(Story: React.ComponentType) => <View style={{ width: 390, padding: 16 }}><Story /></View>],
};

export const Vazio = { args: {} };
export const Preenchido = { args: { value: 'Que viagem incrível!' } };
