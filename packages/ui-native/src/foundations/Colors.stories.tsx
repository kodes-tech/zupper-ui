import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';

/**
 * Colors — specimen da paleta do design system, gerado direto dos
 * `@kodes-tech/tokens` (`colors`). Agrupado por família (brand, gradient,
 * partner, text, surface, border, feedback). Valores que são listas representam
 * gradientes (stops mostrados lado a lado). Não é componente publicável.
 */
export default {
  title: 'Tokens/Colors',
};

// `colors` é um objeto const aninhado: grupo → (hex string | lista de stops).
const groups = colors as unknown as Record<string, Record<string, string | readonly string[]>>;

const Swatch = ({ name, value }: { name: string; value: string }): React.ReactElement => (
  <View style={{ width: 148, marginBottom: 16 }}>
    <View
      style={{
        height: 56,
        borderRadius: 8,
        backgroundColor: value,
        borderWidth: 1,
        borderColor: '#ededed',
      }}
    />
    <Text style={{ fontFamily: 'Satoshi', fontSize: 12, fontWeight: '700', marginTop: 6 }}>
      {name}
    </Text>
    <Text style={{ fontFamily: 'Satoshi', fontSize: 11, color: '#a3a3a3' }}>{value}</Text>
  </View>
);

const GradientSwatch = ({
  name,
  stops,
}: {
  name: string;
  stops: readonly string[];
}): React.ReactElement => (
  <View style={{ width: 148, marginBottom: 16 }}>
    <View
      style={{
        height: 56,
        borderRadius: 8,
        overflow: 'hidden',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ededed',
      }}
    >
      {stops.map((stop, i) => (
        <View key={`${stop}-${i}`} style={{ flex: 1, backgroundColor: stop }} />
      ))}
    </View>
    <Text style={{ fontFamily: 'Satoshi', fontSize: 12, fontWeight: '700', marginTop: 6 }}>
      {name}
    </Text>
    <Text style={{ fontFamily: 'Satoshi', fontSize: 11, color: '#a3a3a3' }}>
      {stops.join(' → ')}
    </Text>
  </View>
);

const Group = ({
  title,
  entries,
}: {
  title: string;
  entries: Record<string, string | readonly string[]>;
}): React.ReactElement => (
  <View style={{ marginBottom: 24 }}>
    <Text
      style={{
        fontFamily: 'Satoshi',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 12,
        textTransform: 'capitalize',
      }}
    >
      {title}
    </Text>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
      {Object.entries(entries).map(([name, value]) =>
        Array.isArray(value) ? (
          <GradientSwatch key={name} name={name} stops={value} />
        ) : (
          <Swatch key={name} name={name} value={value as string} />
        ),
      )}
    </View>
  </View>
);

export const Overview = {
  render: (): React.ReactElement => (
    <View style={{ width: 720 }}>
      {Object.entries(groups).map(([group, entries]) => (
        <Group key={group} title={group} entries={entries} />
      ))}
    </View>
  ),
};
