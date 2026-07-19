import React from 'react';
import { Text, View } from 'react-native';
import { spacing } from '@kodes-tech/tokens';

/**
 * Spacing — specimen da escala de espaçamento (grid 8pt), gerado dos
 * `@kodes-tech/tokens` (`spacing`). Cada barra tem largura = valor do token.
 */
export default {
  title: 'Tokens/Spacing',
};

export const Overview = {
  render: (): React.ReactElement => (
    <View style={{ width: 640 }}>
      {(Object.entries(spacing) as [string, number][]).map(([name, value]) => (
        <View
          key={name}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 8 }}
        >
          <Text
            style={{ width: 120, fontFamily: 'Satoshi', fontSize: 13, fontWeight: '700' }}
          >
            {name}
          </Text>
          <Text style={{ width: 40, fontFamily: 'Satoshi', fontSize: 12, color: '#a3a3a3' }}>
            {value}
          </Text>
          <View
            style={{
              width: Math.max(value, 2),
              height: 16,
              borderRadius: 2,
              backgroundColor: '#008C99',
            }}
          />
        </View>
      ))}
    </View>
  ),
};
