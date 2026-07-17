import React from 'react';
import type { IconName } from './names';
import { Icon, iconColor, iconNames } from './web';

// O Storybook roda em webpack (web), então a story usa o renderer web do pacote
// (<svg> DOM puro) — sem react-native-web no meio. É o mesmo desenho do native:
// os dois renderers são gerados do mesmo assets/<name>.svg.
export default {
  title: 'Icons/Icon',
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
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, width: 420 }}>
      {[...iconNames].sort().map((name) => {
        const inverse = isNearWhite(iconColor(name));
        return (
          <div
            key={name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: 84,
              gap: 6,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${inverse ? '#404040' : '#d4d4d4'}`,
                backgroundColor: inverse ? '#404040' : '#ffffff',
              }}
            >
              <Icon name={name} size={24} />
            </div>
            <span style={{ fontSize: 9, color: '#737373', textAlign: 'center' }}>{name}</span>
          </div>
        );
      })}
    </div>
  ),
};
