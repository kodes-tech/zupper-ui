import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';

export type HotelAmenitiesCardProps = {
  amenities: string[];
  /** Quantos itens mostrar antes do link "Ver todas"; padrão 15 (como no app). */
  limit?: number;
  onSeeAll?: () => void;
};

/**
 * HotelAmenitiesCard — bloco "Comodidades do local": lista com check + link
 * "Ver todas as comodidades" quando há mais itens que o limite. Apresentacional
 * — a lista completa (modal) é responsabilidade do app consumidor via
 * `onSeeAll`. Reproduz HotelAmenityCard do zupper-app.
 */
export const HotelAmenitiesCard = ({
  amenities,
  limit = 15,
  onSeeAll,
}: HotelAmenitiesCardProps): React.ReactElement => {
  const visible = amenities.slice(0, limit);
  return (
    <View className="gap-lg bg-surface-default px-xxl py-xl">
      <Text className="font-sans text-xl font-bold text-fg-secondary">Comodidades do local</Text>
      <View className="gap-md">
        {visible.map((amenity) => (
          <View key={amenity} className="flex-row items-center gap-md">
            <Icon name="amenity-check" size={18} color={colors.brand.zupper} />
            <Text className="font-sans text-md text-fg-subtle">{amenity}</Text>
          </View>
        ))}
      </View>
      {amenities.length > limit ? (
        <Pressable accessibilityRole="button" onPress={onSeeAll}>
          <Text className="font-sans text-xs font-medium text-fg-link underline">
            Ver todas as comodidades
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
};
