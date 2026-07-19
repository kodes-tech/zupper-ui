import React from 'react';
import { Text, View } from 'react-native';
import { radii } from '@kodes-tech/tokens';

/**
 * Radii — specimen do border-radius, gerado dos `@kodes-tech/tokens` (`radii`).
 * Cada quadrado aplica o valor do token no canto (pill = cápsula completa).
 */
export default {
  title: 'Tokens/Radii',
};

export const Overview = {
  render: (): React.ReactElement => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20, width: 640 }}>
      {(Object.entries(radii) as [string, number][]).map(([name, value]) => (
        <View key={name} style={{ alignItems: 'center', width: 96, gap: 6 }}>
          <View
            style={{
              width: 72,
              height: 72,
              borderTopLeftRadius: value,
              borderTopRightRadius: value,
              borderBottomLeftRadius: value,
              borderBottomRightRadius: value,
              backgroundColor: '#E5F5F7',
              borderWidth: 1,
              borderColor: '#78C8CE',
            }}
          />
          <Text style={{ fontFamily: 'Satoshi', fontSize: 13, fontWeight: '700' }}>{name}</Text>
          <Text style={{ fontFamily: 'Satoshi', fontSize: 11, color: '#a3a3a3' }}>{value}</Text>
        </View>
      ))}
    </View>
  ),
};
