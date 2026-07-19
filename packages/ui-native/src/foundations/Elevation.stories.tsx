import React from 'react';
import { Text, View } from 'react-native';
import type { ViewStyle } from 'react-native';
import { elevation } from '@kodes-tech/tokens';

/**
 * Elevation — specimen da elevação neutra (`@kodes-tech/tokens` › `elevation`).
 * O token é agnóstico (none/low/medium/high); aqui aproximamos com sombra iOS
 * (shadow*) + `elevation` (Android) — no web o react-native-web mapeia p/
 * box-shadow. NOTA: os valores ainda são placeholder (`TODO(Figma): calibrar`).
 */
export default {
  title: 'Tokens/Elevation',
};

const shadowFor = (value: number): ViewStyle => ({
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: value },
  shadowOpacity: value === 0 ? 0 : 0.12 + value * 0.02,
  shadowRadius: value * 2,
  elevation: value,
});

export const Overview = {
  render: (): React.ReactElement => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 32, width: 640, padding: 24 }}>
      {(Object.entries(elevation) as [string, number][]).map(([name, value]) => (
        <View key={name} style={{ alignItems: 'center', width: 120, gap: 10 }}>
          <View
            style={{
              width: 96,
              height: 96,
              borderRadius: 12,
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#ededed',
              ...shadowFor(value),
            }}
          />
          <Text style={{ fontFamily: 'Satoshi', fontSize: 13, fontWeight: '700' }}>{name}</Text>
          <Text style={{ fontFamily: 'Satoshi', fontSize: 11, color: '#a3a3a3' }}>{value}</Text>
        </View>
      ))}
    </View>
  ),
};
