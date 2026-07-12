import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { ScreenHeader } from './ScreenHeader';

export default {
  title: 'Organisms/ScreenHeader',
  component: ScreenHeader,
  args: { onBack: action('onBack') },
  decorators: [(Story: React.ComponentType) => <View style={{ width: 390 }}><Story /></View>],
};

export const Default = { args: { title: 'Meu Perfil - Comunidade' } };
