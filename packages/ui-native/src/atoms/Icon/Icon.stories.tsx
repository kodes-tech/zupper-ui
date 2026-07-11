import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from './Icon';
import type { IconName } from './Icon';

const names: IconName[] = [
  'globe',
  'search',
  'chevron-right',
  'fire',
  'community',
  'heart',
  'location',
  'verified',
  'dot-separator',
  'content-dica',
  'content-foto',
  'content-roteiro',
  'nav-inicio',
  'nav-reservar',
  'nav-pedidos',
  'nav-conta',
];

export default {
  title: 'Atoms/Icon',
  component: Icon,
};

export const Default = { args: { name: 'globe' as IconName, size: 32 } };

export const Gallery = {
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20, width: 360 }}>
      {names.map((name) => (
        <View key={name} style={{ alignItems: 'center', width: 72, gap: 4 }}>
          <Icon name={name} size={24} />
          <Text style={{ fontSize: 9, color: '#737373', textAlign: 'center' }}>{name}</Text>
        </View>
      ))}
    </View>
  ),
};
