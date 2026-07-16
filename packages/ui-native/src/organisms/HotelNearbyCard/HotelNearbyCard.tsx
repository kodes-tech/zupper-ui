import React from 'react';
import { Text, View } from 'react-native';

export type HotelNearbyPoint = {
  name: string;
  /** Distância já formatada (ex.: "1.2 km"). */
  distance: string;
};

export type HotelNearbyCardProps = {
  points: HotelNearbyPoint[];
};

/**
 * HotelNearbyCard — bloco "O que tem por perto": pontos de interesse com
 * distância. Reproduz HotelInterestPointCard do zupper-app; some quando não há
 * pontos (o app também não renderiza a seção nesse caso).
 */
export const HotelNearbyCard = ({ points }: HotelNearbyCardProps): React.ReactElement | null => {
  if (!points.length) return null;
  return (
    <View className="gap-lg bg-surface-default px-xxl py-xl">
      <Text className="font-sans text-xl font-bold text-fg-secondary">O que tem por perto</Text>
      <View className="gap-lg">
        {points.map((point) => (
          <View key={point.name} className="flex-row items-center gap-xs">
            <Text className="font-sans text-md font-bold text-fg-secondary">{point.name}</Text>
            <Text className="font-sans text-xs font-medium text-fg-subtle">({point.distance})</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
