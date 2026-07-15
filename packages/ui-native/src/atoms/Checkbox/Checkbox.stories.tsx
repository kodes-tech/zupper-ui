import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { Checkbox } from './Checkbox';

export default {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  args: { onPress: action('onPress') },
  parameters: { layout: 'centered' },
  decorators: [(Story: React.ComponentType) => <View style={{ width: 300 }}><Story /></View>],
};

export const Marcado = { args: { label: 'Com bagagem', checked: true } };
export const Desmarcado = { args: { label: 'Sem bagagem', checked: false } };
