import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from '@kodes-tech/icons';
import { iconSize } from '@kodes-tech/tokens';

/**
 * Icons/Sizes — specimen da escala de tamanho de ícone (`@kodes-tech/tokens` ›
 * `iconSize`). Fica ao lado da galeria (`Icons/Icon`). Cada degrau renderiza o
 * mesmo ícone no tamanho do token (default = `lg` 24). Derivado do uso real;
 * glifos grandes de ilustração (40/48/72) não entram nesta escala.
 */
export default {
  title: 'Tokens/Icon Size',
};

export const Sizes = {
  render: (): React.ReactElement => (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 32 }}>
      {(Object.entries(iconSize) as [string, number][]).map(([name, value]) => (
        <View key={name} style={{ alignItems: 'center', gap: 8, width: 72 }}>
          <View style={{ height: 24, justifyContent: 'flex-end' }}>
            <Icon name="search" size={value} />
          </View>
          <Text style={{ fontFamily: 'Satoshi', fontSize: 13, fontWeight: '700' }}>{name}</Text>
          <Text style={{ fontFamily: 'Satoshi', fontSize: 11, color: '#a3a3a3' }}>{value}px</Text>
        </View>
      ))}
    </View>
  ),
};
