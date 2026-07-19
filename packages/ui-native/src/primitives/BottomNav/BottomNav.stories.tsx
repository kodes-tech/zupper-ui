import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { BottomNav } from './BottomNav';

export default {
  title: 'Primitives/BottomNav',
  component: BottomNav,
  args: { onNavigate: action('onNavigate') },
  decorators: [(Story: React.ComponentType) => <View style={{ width: 390 }}><Story /></View>],
};

export const Inicio = { args: { active: 'inicio' } };
export const Conta = { args: { active: 'conta' } };
