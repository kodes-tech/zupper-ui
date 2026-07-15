import React from 'react';
import { Text, View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { ExpansionPanel } from './ExpansionPanel';

export default {
  title: 'Molecules/ExpansionPanel',
  component: ExpansionPanel,
  args: { onToggle: action('onToggle'), title: 'Comodidades' },
  parameters: { layout: 'centered' },
  decorators: [(Story: React.ComponentType) => <View style={{ width: 327 }}><Story /></View>],
};

export const Aberto = {
  args: { expanded: true, children: <Text style={{ color: '#737373' }}>Conteúdo da seção</Text> },
};
export const Fechado = {
  args: { expanded: false, children: <Text style={{ color: '#737373' }}>Conteúdo da seção</Text> },
};
