import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { ProfileTabs } from './ProfileTabs';

export default {
  title: 'Organisms/ProfileTabs',
  component: ProfileTabs,
  args: { onChange: action('onChange') },
  decorators: [(Story: React.ComponentType) => <View style={{ width: 390 }}><Story /></View>],
};

export const Dicas = { args: { active: 'dicas' } };
export const Fotos = { args: { active: 'fotos' } };
export const Roteiros = { args: { active: 'roteiros' } };
