import React from 'react';
import { Text, View } from 'react-native';
import { Icon, iconNames } from './Icon';
import type { IconName } from './Icon';

export default {
  title: 'Atoms/Icon',
  component: Icon,
};

export const Default = { args: { name: 'globe' as IconName, size: 32 } };

// Galeria de todos os ícones registrados — gerada do próprio registry
// (`iconNames`), então nunca desatualiza: ícone novo aparece aqui sozinho.
export const Gallery = {
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20, width: 420 }}>
      {[...iconNames].sort().map((name) => (
        <View key={name} style={{ alignItems: 'center', width: 84, gap: 6 }}>
          <Icon name={name} size={24} />
          <Text style={{ fontSize: 9, color: '#737373', textAlign: 'center' }}>{name}</Text>
        </View>
      ))}
    </View>
  ),
};
