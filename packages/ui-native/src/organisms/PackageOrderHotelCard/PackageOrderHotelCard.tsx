import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Divider } from '../../atoms/Divider';
import { Icon } from '../../atoms/Icon';
import type { IconName } from '../../atoms/Icon';
import { StarRating } from '../../molecules/StarRating';
import { HotelBenefitItem } from '../../molecules/HotelBenefitItem';
import type { HotelBenefitTone } from '../../molecules/HotelBenefitItem';
import { HotelStayDetails } from '../../molecules/HotelStayDetails';
import type { HotelAmenity } from '../HotelAmenitiesCard';

export type PackageOrderHotelBenefit = { icon: IconName; text: string; tone?: HotelBenefitTone };

export type PackageOrderHotelCardProps = {
  name: string;
  image?: ImageSourcePropType;
  starRating?: number;
  /** Endereço em uma linha (ex.: "Av. Ibirapuera, 2927 - Ibirapuera - São Paulo"). */
  address: string;
  /** Distância já formatada (ex.: "5km do Centro"). */
  distance?: string;
  benefits?: PackageOrderHotelBenefit[];
  /** Comodidades resumidas, em 2 colunas (ícone + rótulo). */
  amenities?: HotelAmenity[];
  checkIn: string;
  checkOut: string;
  guestsSummary: string;
  onSeeDescription?: () => void;
  onSeeAllAmenities?: () => void;
};

/**
 * PackageOrderHotelCard — resumo do hotel no resumo do pacote: miniatura,
 * nome, estrelas, endereço/distância, "Ver descrição completa", benefícios,
 * comodidades resumidas (2 colunas) e os detalhes da estadia. Apresentacional.
 * Reproduz o card de hotel do resumo do pacote (Figma).
 */
export const PackageOrderHotelCard = ({
  name,
  image,
  starRating,
  address,
  distance,
  benefits = [],
  amenities = [],
  checkIn,
  checkOut,
  guestsSummary,
  onSeeDescription,
  onSeeAllAmenities,
}: PackageOrderHotelCardProps): React.ReactElement => (
  <View className="gap-lg bg-surface-default px-xxl py-xl">
    <View className="flex-row items-center gap-lg">
      {image ? (
        <Image source={image} resizeMode="cover" className="h-[44px] w-[44px] rounded-sm" />
      ) : (
        <View className="h-[44px] w-[44px] items-center justify-center rounded-sm bg-surface-tag">
          <Icon name="hotel-placeholder" size={20} color={colors.text.subtle} />
        </View>
      )}
      <View className="flex-1 gap-xxs">
        <Text className="font-sans text-lg font-bold text-fg-secondary">{name}</Text>
        {starRating ? <StarRating rating={starRating} /> : null}
      </View>
    </View>

    <View className="flex-row items-start gap-xs">
      <Icon name="travel-pinmap" size={20} color={colors.text.subtle} />
      <Text className="flex-1 font-sans text-xs font-medium text-fg-subtle">
        {address}
        {distance ? ` (${distance})` : ''}
      </Text>
    </View>

    <Pressable accessibilityRole="button" onPress={onSeeDescription}>
      <Text className="font-sans text-xs font-medium text-fg-link underline">Ver descrição completa</Text>
    </Pressable>

    {benefits.length ? (
      <>
        <Divider />
        <View className="flex-row flex-wrap gap-y-md">
          {benefits.map((benefit) => (
            <View key={benefit.text} className="w-1/2 pr-md">
              <HotelBenefitItem icon={benefit.icon} text={benefit.text} tone={benefit.tone} iconSize={18} />
            </View>
          ))}
        </View>
      </>
    ) : null}

    {amenities.length ? (
      <>
        <View className="flex-row flex-wrap gap-y-md">
          {amenities.map((amenity) => (
            <View key={amenity.label} className="w-1/2 flex-row items-center gap-xs pr-md">
              <Icon name={amenity.icon ?? 'amenity-check'} size={18} color={colors.text.subtle} />
              <Text numberOfLines={1} className="flex-1 font-sans text-xs font-medium text-fg-subtle">
                {amenity.label}
              </Text>
            </View>
          ))}
        </View>
        <Pressable accessibilityRole="button" onPress={onSeeAllAmenities}>
          <Text className="font-sans text-xs font-medium text-fg-link underline">
            Ver todas as comodidades
          </Text>
        </Pressable>
      </>
    ) : null}

    <Divider />
    <HotelStayDetails checkIn={checkIn} checkOut={checkOut} guestsSummary={guestsSummary} />
  </View>
);
