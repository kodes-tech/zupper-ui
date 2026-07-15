import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { Icon } from '../../atoms/Icon';
import { Button } from '../../atoms/Button';
import { HotelSearchSummary } from '../../molecules/HotelSearchSummary';
import type { HotelBenefitTone } from '../../molecules/HotelBenefitItem';
import { HotelDetailsCard } from '../../organisms/HotelDetailsCard';
import { HotelLocationCard } from '../../organisms/HotelLocationCard';
import { HotelAmenitiesCard } from '../../organisms/HotelAmenitiesCard';
import type { HotelAmenity } from '../../organisms/HotelAmenitiesCard';
import { HotelNearbyCard } from '../../organisms/HotelNearbyCard';
import type { HotelNearbyPoint } from '../../organisms/HotelNearbyCard';

export type HotelDetailsProps = {
  destination: string;
  searchDetails: string;
  name: string;
  image?: ImageSourcePropType;
  starRating?: number;
  checkIn: string;
  checkOut: string;
  guestsSummary: string;
  breakfast?: boolean;
  cancellation?: { text: string; tone: HotelBenefitTone };
  priceLabel: string;
  price: string;
  address: string;
  description: string;
  amenities: (string | HotelAmenity)[];
  nearbyPoints?: HotelNearbyPoint[];
  onBack?: () => void;
  onEditSearch?: () => void;
  onSeeAllAmenities?: () => void;
  onSelectRooms?: () => void;
};

/**
 * HotelDetails — tela de detalhes do hotel: resumo da busca no topo, card
 * principal (imagem/estrelas/estadia/benefícios/preço), localização,
 * descrição, comodidades, pontos de interesse e o rodapé fixo com o CTA
 * "Selecionar quartos". Apresentacional: dados já formatados vêm por props.
 * Reproduz HotelDetailsScreen do zupper-app.
 */
export const HotelDetails = ({
  destination,
  searchDetails,
  name,
  image,
  starRating,
  checkIn,
  checkOut,
  guestsSummary,
  breakfast,
  cancellation,
  priceLabel,
  price,
  address,
  description,
  amenities,
  nearbyPoints = [],
  onBack,
  onEditSearch,
  onSeeAllAmenities,
  onSelectRooms,
}: HotelDetailsProps): React.ReactElement => (
  <View className="flex-1 bg-surface-tag">
    <View className="bg-surface-default pb-lg pt-[40px]">
      <View className="flex-row items-start justify-between px-xxl">
        <Pressable accessibilityRole="button" accessibilityLabel="Voltar" onPress={onBack}>
          <Icon name="back-arrow" size={24} />
        </Pressable>
        <View className="flex-1">
          <HotelSearchSummary destination={destination} details={searchDetails} onEdit={onEditSearch} />
        </View>
        <View className="h-[24px] w-[24px]" />
      </View>
    </View>

    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="gap-[20px]">
        <HotelDetailsCard
          name={name}
          image={image}
          starRating={starRating}
          checkIn={checkIn}
          checkOut={checkOut}
          guestsSummary={guestsSummary}
          breakfast={breakfast}
          cancellation={cancellation}
          priceLabel={priceLabel}
          price={price}
        />
        <HotelLocationCard address={address} />
        <View className="gap-lg bg-surface-default px-xxl py-xl">
          <Text className="font-sans text-xl font-bold text-fg-secondary">Descrição</Text>
          <Text className="font-sans text-md text-fg-subtle">{description}</Text>
        </View>
        <HotelAmenitiesCard amenities={amenities} onSeeAll={onSeeAllAmenities} />
        <HotelNearbyCard points={nearbyPoints} />
      </View>
    </ScrollView>

    <View className="bg-surface-default px-xl py-lg">
      <Button label="Selecionar quartos" fullWidth onPress={onSelectRooms} />
    </View>
  </View>
);
