import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';
import type { IconName } from '../../atoms/Icon';

/** Comodidade com rótulo e ícone opcional (ex.: `amenity-wifi`). */
export type HotelAmenity = { label: string; icon?: IconName };

export type HotelAmenitiesCardProps = {
  /** Aceita strings simples (ícone padrão) ou objetos com ícone específico. */
  amenities: (string | HotelAmenity)[];
  /** Quantos itens mostrar antes do link "Ver todas"; padrão 15 (como no app). */
  limit?: number;
  onSeeAll?: () => void;
};

const normalize = (amenity: string | HotelAmenity): HotelAmenity =>
  typeof amenity === 'string' ? { label: amenity } : amenity;

/**
 * HotelAmenitiesCard — bloco "Comodidades do local": lista com um ícone por
 * comodidade + link "Ver todas as comodidades" quando há mais itens que o
 * limite. Apresentacional — a lista completa (modal) é responsabilidade do app
 * consumidor via `onSeeAll`. Reproduz HotelAmenityCard do zupper-app.
 */
export const HotelAmenitiesCard = ({
  amenities,
  limit = 15,
  onSeeAll,
}: HotelAmenitiesCardProps): React.ReactElement => {
  const visible = amenities.slice(0, limit).map(normalize);
  return (
    <View className="gap-lg bg-surface-default px-xxl py-xl">
      <Text className="font-sans text-xl font-bold text-fg-secondary">Comodidades do local</Text>
      <View>
        {visible.map((amenity) => (
          <View key={amenity.label} className="h-[36px] flex-row items-center gap-xs">
            <Icon name={amenity.icon ?? 'amenity-check'} size={24} color={colors.text.subtle} />
            <Text className="font-sans text-md font-medium text-fg-subtle">{amenity.label}</Text>
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
