import React from 'react';
import { Text, View } from 'react-native';

export type RangeSliderProps = {
  /** Limites do trilho. */
  min: number;
  max: number;
  /** Valores selecionados (dois thumbs). */
  values: [number, number];
  /** Formata os rótulos exibidos abaixo (ex.: moeda ou "Xh"). */
  formatLabel?: (value: number) => string;
};

const clampPct = (value: number, min: number, max: number): number => {
  if (max <= min) return 0;
  return Math.max(0, Math.min(1, (value - min) / (max - min))) * 100;
};

/**
 * RangeSlider — trilho de faixa com dois thumbs (mínimo/máximo) e os rótulos
 * das extremidades. Apresentacional: mostra a faixa selecionada a partir dos
 * valores; o gesto de arrastar fica a cargo do app consumidor (mesma filosofia
 * do DateRangeCalendar). Reproduz o RangedFilter do zupper-app (preço/duração).
 */
export const RangeSlider = ({
  min,
  max,
  values,
  formatLabel = (v) => String(v),
}: RangeSliderProps): React.ReactElement => {
  const [low, high] = values;
  const lowPct = clampPct(low, min, max);
  const highPct = clampPct(high, min, max);
  return (
    <View className="gap-md">
      <View className="h-[20px] justify-center">
        {/* trilho */}
        <View className="h-[4px] w-full rounded-pill bg-border-subtle" />
        {/* faixa preenchida */}
        <View
          className="absolute h-[4px] rounded-pill bg-brand-zupper"
          style={{ left: `${lowPct}%`, right: `${100 - highPct}%` }}
        />
        {/* thumbs */}
        <View
          className="absolute h-[20px] w-[20px] rounded-pill border-2 border-brand-zupper bg-surface-default"
          style={{ left: `${lowPct}%`, marginLeft: -10 }}
        />
        <View
          className="absolute h-[20px] w-[20px] rounded-pill border-2 border-brand-zupper bg-surface-default"
          style={{ left: `${highPct}%`, marginLeft: -10 }}
        />
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="font-sans text-xs font-medium text-fg-subtle">{formatLabel(low)}</Text>
        <Text className="font-sans text-xs font-medium text-fg-subtle">{formatLabel(high)}</Text>
      </View>
    </View>
  );
};
