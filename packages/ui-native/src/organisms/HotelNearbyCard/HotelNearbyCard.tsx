import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';

export type HotelNearbyPoint = {
  /** Nome do ponto de interesse, em destaque (ex.: "Parque Ibirapuera"). */
  name: string;
  /** Endereço em uma linha (ex.: "Av. Ibirapuera, 2927 - Ibirapuera"). */
  address: string;
  /** Distância já formatada (ex.: "5km do Centro"). */
  distance: string;
  /** Mostra o link "Ver no maps". */
  hasMap?: boolean;
};

export type HotelNearbyCardProps = {
  points: HotelNearbyPoint[];
  onSeeMap?: (index: number) => void;
};

/**
 * HotelNearbyCard — bloco "Interesses na proximidade": pontos de interesse
 * com nome, endereço + distância e o link "Ver no maps", separados por
 * divisórias. Some quando não há pontos. Reproduz a Sessão Proximidade do
 * fluxo de pacotes/hospedagem (Figma).
 */
export const HotelNearbyCard = ({
  points,
  onSeeMap,
}: HotelNearbyCardProps): React.ReactElement | null => {
  if (!points.length) return null;
  return (
    <View className="gap-lg bg-surface-default px-xxl py-xl">
      <Text className="font-sans text-xl font-bold text-fg-secondary">Interesses na proximidade</Text>
      <View className="gap-md">
        {points.map((point, index) => (
          <View key={point.name} className="gap-md">
            <View className="gap-xxs">
              <Text className="font-sans text-md font-bold text-fg-secondary">{point.name}</Text>
              <View className="flex-row items-center justify-between gap-md">
                <View className="flex-1 flex-row items-center gap-xs">
                  <Icon name="travel-pinmap" size={24} color={colors.text.subtle} />
                  <View className="flex-1">
                    <Text className="font-sans text-md font-medium text-fg-subtle">{point.address}</Text>
                    <Text className="font-sans text-xs font-medium text-fg-subtle">
                      ({point.distance})
                    </Text>
                  </View>
                </View>
                {point.hasMap ? (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`Ver ${point.name} no mapa`}
                    onPress={() => onSeeMap?.(index)}
                  >
                    <Text className="font-sans text-xs font-medium text-fg-link underline">
                      Ver no maps
                    </Text>
                  </Pressable>
                ) : null}
              </View>
            </View>
            {index < points.length - 1 ? <View className="border-b border-border-subtle" /> : null}
          </View>
        ))}
      </View>
    </View>
  );
};
