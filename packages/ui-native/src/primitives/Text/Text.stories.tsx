import React from 'react';
import { View } from 'react-native';
import { Text } from './Text';
import type { TextVariant } from './Text';

export default {
  title: 'Primitives/Text',
  component: Text,
};

const VARIANTS: TextVariant[] = [
  'heading',
  'sectionTitle',
  'cardTitle',
  'bodyMd',
  'bodyText',
  'authorName',
  'caption',
  'badge',
];

export const Playground = {
  args: {
    children: 'A vida é uma viagem — Zupper',
    variant: 'bodyText',
    color: 'primary',
  },
};

export const Variants = {
  render: (): React.ReactElement => (
    <View style={{ gap: 12 }}>
      {VARIANTS.map((v) => (
        <Text key={v} variant={v}>
          {v} — A vida é uma viagem
        </Text>
      ))}
    </View>
  ),
};

/** Título que precisa caber numa linha: a fonte encolhe em vez de quebrar. */
export const FitToOneLine = {
  render: (): React.ReactElement => (
    <View style={{ gap: 12, width: 240 }}>
      <Text variant="heading" align="center">
        Ainda não há publicações por aqui
      </Text>
      <Text
        variant="heading"
        align="center"
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.7}
      >
        Ainda não há publicações por aqui
      </Text>
    </View>
  ),
};

export const Colors = {
  render: (): React.ReactElement => (
    <View style={{ gap: 8 }}>
      <Text color="primary">primary — texto padrão</Text>
      <Text color="secondary">secondary — corpo/meta</Text>
      <Text color="muted">muted — desenfatizado</Text>
      <Text color="link">link — Meu perfil ›</Text>
      <Text color="danger">danger — mensagem de erro</Text>
    </View>
  ),
};
