import React from 'react';
import { Text, View } from 'react-native';

type Lib = { name: string; version: string; source: string };

// Injetado em build-time pelo .storybook/main.ts (env STORYBOOK_LIB_VERSIONS).
const LIBS: Lib[] = JSON.parse(process.env.STORYBOOK_LIB_VERSIONS ?? '[]');

const Cell = ({ children, flex, bold }: { children: React.ReactNode; flex: number; bold?: boolean }) => (
  <Text
    style={{
      flex,
      fontFamily: 'monospace',
      fontWeight: bold ? '700' : '400',
      color: bold ? '#171717' : '#404040',
    }}
  >
    {children}
  </Text>
);

/**
 * Versões — painel simples com a versão de cada lib do design system. Os valores
 * são lidos do package.json em build-time (não hardcode) e injetados via env.
 */
const Versions = (): React.ReactElement => (
  <View style={{ padding: 24, gap: 12, minWidth: 460 }}>
    <Text style={{ fontSize: 18, fontWeight: '700', color: '#171717' }}>
      Versões das libs do design system
    </Text>
    <View
      style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#e5e5e5', paddingBottom: 8 }}
    >
      <Cell flex={3} bold>
        Lib
      </Cell>
      <Cell flex={1} bold>
        Versão
      </Cell>
      <Cell flex={3} bold>
        Origem
      </Cell>
    </View>
    {LIBS.map((lib) => (
      <View key={lib.name} style={{ flexDirection: 'row' }}>
        <Cell flex={3}>{lib.name}</Cell>
        <Cell flex={1}>{lib.version}</Cell>
        <Cell flex={3}>{lib.source}</Cell>
      </View>
    ))}
  </View>
);

export default {
  title: 'Sobre/Versões',
  component: Versions,
};

export const Padrao = {};
