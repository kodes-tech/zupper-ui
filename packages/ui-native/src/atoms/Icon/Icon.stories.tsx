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
// Cada tile é metade claro / metade escuro porque alguns ícones são brancos de
// propósito (ficam sobre gradiente/superfícies escuras: FAB Publicar, enviar
// comentário, busca, selos *-white) — assim qualquer cor fica visível.
export const Gallery = {
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20, width: 420 }}>
      {[...iconNames].sort().map((name) => (
        <View key={name} style={{ alignItems: 'center', width: 84, gap: 6 }}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 8,
              overflow: 'hidden',
              borderWidth: 1,
              borderColor: '#d4d4d4',
              backgroundColor: '#ffffff',
            }}
          >
            <View
              style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 22, backgroundColor: '#404040' }}
            />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={name} size={24} />
            </View>
          </View>
          <Text style={{ fontSize: 9, color: '#737373', textAlign: 'center' }}>{name}</Text>
        </View>
      ))}
    </View>
  ),
};
