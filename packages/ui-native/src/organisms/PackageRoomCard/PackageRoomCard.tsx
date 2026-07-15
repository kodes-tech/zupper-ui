import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';
import { HotelBenefitItem } from '../../molecules/HotelBenefitItem';

export type PackageRoomCardData = {
  /** Título do quarto (ex.: "Quarto 1"). */
  title: string;
  image?: ImageSourcePropType;
  /** Cancelamento (ex.: "Cancelamento grátis até 00/00/0000"). */
  cancellation?: string;
  /** Comodidades do quarto, exibidas em 2 colunas com check. */
  amenities: string[];
};

export type PackageRoomCardProps = {
  room: PackageRoomCardData;
  onSeeAll?: () => void;
};

/**
 * PackageRoomCard — card de quarto do resumo do pacote: miniatura, título,
 * cancelamento e a lista "O que possui no quarto?" em duas colunas, com o
 * link "Ver todas as comodidades". Apresentacional: dados já vêm por props.
 * Reproduz o card de quarto do resumo do pacote (Figma).
 */
export const PackageRoomCard = ({ room, onSeeAll }: PackageRoomCardProps): React.ReactElement => (
  <View className="gap-lg bg-surface-default px-xxl py-xl">
    <View className="flex-row items-center gap-lg">
      {room.image ? (
        <Image source={room.image} resizeMode="cover" className="h-[44px] w-[44px] rounded-sm" />
      ) : (
        <View className="h-[44px] w-[44px] items-center justify-center rounded-sm bg-surface-tag">
          <Icon name="hotel-placeholder" size={20} color={colors.text.subtle} />
        </View>
      )}
      <View className="flex-1 gap-xxs">
        <Text className="font-sans text-lg font-bold text-fg-secondary">{room.title}</Text>
        {room.cancellation ? (
          <HotelBenefitItem icon="hotel-circle-check" text={room.cancellation} tone="success" iconSize={16} />
        ) : null}
      </View>
    </View>

    <Text className="font-sans text-md font-bold text-fg-secondary">O que possui no quarto?</Text>
    <View className="flex-row flex-wrap gap-y-md">
      {room.amenities.map((amenity) => (
        <View key={amenity} className="w-1/2 flex-row items-center gap-xs pr-md">
          <Icon name="amenity-check" size={18} color={colors.brand.zupper} />
          <Text numberOfLines={1} className="flex-1 font-sans text-xs font-medium text-fg-subtle">
            {amenity}
          </Text>
        </View>
      ))}
    </View>

    <Pressable accessibilityRole="button" onPress={onSeeAll}>
      <Text className="font-sans text-xs font-medium text-fg-link underline">
        Ver todas as comodidades
      </Text>
    </Pressable>
  </View>
);
