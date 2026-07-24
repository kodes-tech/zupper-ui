import React from 'react';
import { Text, View } from 'react-native';
import { getTheme, type ThemeName } from '@kodes-tech/tokens';

/**
 * Colors — specimen da paleta do design system, gerado direto dos
 * `@kodes-tech/tokens`. Segue o **tema ativo** do toggle da toolbar: lê
 * `context.globals.theme` e resolve `getTheme(name)`, então alternar Default/Dark
 * troca os hex mostrados aqui também. Agrupado por família (brand, gradient,
 * partner, text, surface, border, feedback). Listas = gradientes (stops lado a lado).
 * Não é componente publicável.
 */
export default {
  title: 'Tokens/Colors',
};

type Palette = ReturnType<typeof getTheme>;
type Entries = Record<string, string | readonly string[]>;

const Swatch = ({
  name,
  value,
  palette,
}: {
  name: string;
  value: string;
  palette: Palette;
}): React.ReactElement => (
  <View style={{ width: 148, marginBottom: 16 }}>
    <View
      style={{
        height: 56,
        borderRadius: 8,
        backgroundColor: value,
        borderWidth: 1,
        borderColor: palette.border.subtle,
      }}
    />
    <Text
      style={{
        fontFamily: 'Satoshi',
        fontSize: 12,
        fontWeight: '700',
        marginTop: 6,
        color: palette.text.primary,
      }}
    >
      {name}
    </Text>
    <Text style={{ fontFamily: 'Satoshi', fontSize: 11, color: palette.text.muted }}>{value}</Text>
  </View>
);

const GradientSwatch = ({
  name,
  stops,
  palette,
}: {
  name: string;
  stops: readonly string[];
  palette: Palette;
}): React.ReactElement => (
  <View style={{ width: 148, marginBottom: 16 }}>
    <View
      style={{
        height: 56,
        borderRadius: 8,
        overflow: 'hidden',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: palette.border.subtle,
      }}
    >
      {stops.map((stop, i) => (
        <View key={`${stop}-${i}`} style={{ flex: 1, backgroundColor: stop }} />
      ))}
    </View>
    <Text
      style={{
        fontFamily: 'Satoshi',
        fontSize: 12,
        fontWeight: '700',
        marginTop: 6,
        color: palette.text.primary,
      }}
    >
      {name}
    </Text>
    <Text style={{ fontFamily: 'Satoshi', fontSize: 11, color: palette.text.muted }}>
      {stops.join(' → ')}
    </Text>
  </View>
);

const Group = ({
  title,
  entries,
  palette,
}: {
  title: string;
  entries: Entries;
  palette: Palette;
}): React.ReactElement => (
  <View style={{ marginBottom: 24 }}>
    <Text
      style={{
        fontFamily: 'Satoshi',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 12,
        textTransform: 'capitalize',
        color: palette.text.primary,
      }}
    >
      {title}
    </Text>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
      {Object.entries(entries).map(([name, value]) =>
        Array.isArray(value) ? (
          <GradientSwatch key={name} name={name} stops={value} palette={palette} />
        ) : (
          <Swatch key={name} name={name} value={value as string} palette={palette} />
        ),
      )}
    </View>
  </View>
);

export const Overview = {
  render: (_args: unknown, context: { globals: { theme?: ThemeName } }): React.ReactElement => {
    const palette = getTheme(context.globals.theme ?? 'default');
    // grupo → (hex string | lista de stops de gradiente). `scrim` (string) fica fora.
    const groups = palette as unknown as Record<string, Entries>;
    return (
      <View style={{ width: 720 }}>
        {Object.entries(groups)
          .filter(([, entries]) => typeof entries === 'object')
          .map(([group, entries]) => (
            <Group key={group} title={group} entries={entries} palette={palette} />
          ))}
      </View>
    );
  },
};
