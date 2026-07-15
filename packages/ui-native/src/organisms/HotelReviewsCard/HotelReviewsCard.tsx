import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Divider } from '../../atoms/Divider';
import { StarRating } from '../../molecules/StarRating';

export type HotelReviewCategory = {
  /** Ex.: "Comodidades", "Conforto", "Limpeza". */
  label: string;
  /** Nota de 0 a `max` (ex.: 7). */
  value: number;
};

export type HotelReviewsCardProps = {
  /** Número de estrelas do resumo (ex.: 3). */
  stars: number;
  /** Rótulo do resumo (ex.: "Bom 7,0"). */
  ratingLabel: string;
  categories: HotelReviewCategory[];
  /** Nota máxima da escala; padrão 10. */
  max?: number;
};

/** Formata a nota no padrão pt-BR (7 → "7,0"). */
const formatScore = (value: number): string => value.toFixed(1).replace('.', ',');

/** Barra de uma categoria: rótulo + nota + trilha com preenchimento proporcional. */
const ReviewBar = ({ label, value, max }: { label: string; value: number; max: number }) => {
  const pct = Math.max(0, Math.min(1, value / max)) * 100;
  return (
    <View className="gap-xs">
      <View className="flex-row items-center justify-between">
        <Text className="font-sans text-md font-medium text-fg-subtle">{label}</Text>
        <Text className="font-sans text-sm font-medium text-fg-subtle">{formatScore(value)}</Text>
      </View>
      <View className="h-[8px] w-full overflow-hidden rounded-pill bg-border-subtle">
        <LinearGradient
          colors={[...colors.gradient.brand]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ height: 8, width: `${pct}%`, borderRadius: 999 }}
        />
      </View>
    </View>
  );
};

/**
 * HotelReviewsCard — bloco "Avaliações": nota-resumo (estrelas + rótulo) e as
 * notas por categoria em barras de progresso. Apresentacional: notas já vêm por
 * props. Reproduz a Sessão Avaliações do fluxo de pacotes (Figma).
 */
export const HotelReviewsCard = ({
  stars,
  ratingLabel,
  categories,
  max = 10,
}: HotelReviewsCardProps): React.ReactElement => (
  <View className="gap-lg bg-surface-default px-xxl py-xl">
    <View className="gap-xs">
      <Text className="font-sans text-xl font-bold text-fg-secondary">Avaliações</Text>
      <View className="flex-row items-center gap-xs">
        <StarRating rating={stars} size={24} />
        <Text className="font-sans text-xs font-medium text-fg-secondary">{ratingLabel}</Text>
      </View>
    </View>
    <Divider />
    <View className="gap-xl">
      {categories.map((category) => (
        <ReviewBar key={category.label} label={category.label} value={category.value} max={max} />
      ))}
    </View>
  </View>
);
