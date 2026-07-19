import React from 'react';
import { Text, View } from 'react-native';
import { fontSize, fontWeight, textVariant, typography } from '@kodes-tech/tokens';

/**
 * Typography — specimen da assinatura tipográfica do design system, gerado
 * diretamente dos `@kodes-tech/tokens` (nunca desatualiza). Não é um componente
 * publicável: é a vitrine da escala/família/pesos e dos presets de texto
 * (`textVariant`) que os componentes consomem via classes `text-<variant>`
 * (NativeWind) ou `typography.textVariant.<nome>`.
 *
 * Fonte: Satoshi (registrada nativamente pelo app; no web o preview usa @font-face).
 */
export default {
  title: 'Tokens/Typography',
};

const Row = ({
  label,
  meta,
  children,
}: {
  label: string;
  meta: string;
  children: React.ReactNode;
}): React.ReactElement => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'baseline',
      gap: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#ededed',
    }}
  >
    <View style={{ width: 132 }}>
      <Text style={{ fontFamily: 'Satoshi', fontSize: 13, fontWeight: '700', color: '#171717' }}>
        {label}
      </Text>
      <Text style={{ fontFamily: 'Satoshi', fontSize: 11, color: '#a3a3a3', marginTop: 2 }}>
        {meta}
      </Text>
    </View>
    <View style={{ flex: 1 }}>{children}</View>
  </View>
);

const SAMPLE = 'A vida é uma viagem — Zupper';

// ─── Família + pesos ──────────────────────────────────────────────────────────
export const FontFamily = {
  render: (): React.ReactElement => (
    <View style={{ width: 640 }}>
      <Text style={{ fontFamily: 'Satoshi', fontSize: 20, fontWeight: '700', marginBottom: 8 }}>
        {typography.family}
      </Text>
      {(
        [
          ['regular', fontWeight.regular],
          ['medium', fontWeight.medium],
          ['bold', fontWeight.bold],
        ] as const
      ).map(([name, weight]) => (
        <Row key={name} label={name} meta={`weight ${weight}`}>
          <Text style={{ fontFamily: 'Satoshi', fontSize: 20, fontWeight: weight }}>{SAMPLE}</Text>
        </Row>
      ))}
    </View>
  ),
};

// ─── Escala de tamanhos ───────────────────────────────────────────────────────
export const TypeScale = {
  render: (): React.ReactElement => (
    <View style={{ width: 640 }}>
      {(Object.entries(fontSize) as [keyof typeof fontSize, number][]).map(([name, size]) => (
        <Row key={name} label={name} meta={`${size}px`}>
          <Text style={{ fontFamily: 'Satoshi', fontSize: size, color: '#171717' }}>{SAMPLE}</Text>
        </Row>
      ))}
    </View>
  ),
};

// ─── Presets de texto (textVariant) ───────────────────────────────────────────
export const TextVariants = {
  render: (): React.ReactElement => (
    <View style={{ width: 720 }}>
      {(Object.entries(textVariant) as [string, (typeof textVariant)[keyof typeof textVariant]][])
        .map(([name, style]) => (
          <Row
            key={name}
            label={name}
            meta={`${style.fontSize}px · ${style.fontWeight} · lh ${style.lineHeight ?? '—'}`}
          >
            <Text style={style}>{SAMPLE}</Text>
          </Row>
        ))}
    </View>
  ),
};
