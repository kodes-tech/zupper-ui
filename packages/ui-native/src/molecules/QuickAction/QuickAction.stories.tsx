import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { QuickAction } from './QuickAction';

const voos = require('../../_figma/assets/icon-quick-voos.png');

export default {
  title: 'Molecules/QuickAction',
  component: QuickAction,
  args: { onPress: action('onPress') },
  decorators: [(Story: React.ComponentType) => <View style={{ width: 120 }}><Story /></View>],
};

export const Default = { args: { icon: voos, label: 'Buscar Voos' } };
