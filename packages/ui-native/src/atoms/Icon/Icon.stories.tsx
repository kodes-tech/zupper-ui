import React from 'react';
import { Text, View } from 'react-native';
import { Icon, iconColor, iconNames } from './Icon';
import type { IconName } from './Icon';

export default {
  title: 'Atoms/Icon',
  component: Icon,
};

export const Default = { args: { name: 'globe' as IconName, size: 32 } };

// Ícone (quase) branco? Luminância alta = precisa de fundo escuro.
const isNearWhite = (color: string): boolean => {
  if (color === 'white') return true;
  const match = /^#([0-9a-f]{6})$/i.exec(color);
  if (!match) return false;
  const value = parseInt(match[1], 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return 0.299 * r + 0.587 * g + 0.114 * b > 200;
};

// Galeria de todos os ícones registrados — gerada do próprio registry
// (`iconNames`), então nunca desatualiza. O fundo de cada tile é escolhido pela
// cor do ícone (`iconColor`): ícone branco ganha fundo escuro; os demais, claro.
export const Gallery = {
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20, width: 420 }}>
      {[...iconNames].sort().map((name) => {
        const inverse = isNearWhite(iconColor(name));
        return (
          <View key={name} style={{ alignItems: 'center', width: 84, gap: 6 }}>
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: inverse ? '#404040' : '#d4d4d4',
                backgroundColor: inverse ? '#404040' : '#ffffff',
              }}
            >
              <Icon name={name} size={24} />
            </View>
            <Text style={{ fontSize: 9, color: '#737373', textAlign: 'center' }}>{name}</Text>
          </View>
        );
      })}
    </View>
  ),
};
