import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';
import type { HotelBenefitTone } from '../../molecules/HotelBenefitItem';
import { HotelPolicyRow } from '../../molecules/HotelPolicyRow';
import { HotelDetailsCard } from '../../organisms/HotelDetailsCard';
import { HotelLocationCard } from '../../organisms/HotelLocationCard';
import { HotelAmenitiesCard } from '../../organisms/HotelAmenitiesCard';
import { HotelNearbyCard } from '../../organisms/HotelNearbyCard';
import type { HotelNearbyPoint } from '../../organisms/HotelNearbyCard';
import { HotelReviewsCard } from '../../organisms/HotelReviewsCard';
import type { HotelReviewCategory } from '../../organisms/HotelReviewsCard';
import { HotelTestimonialsCard } from '../../organisms/HotelTestimonialsCard';
import type { HotelTestimonial } from '../../organisms/HotelTestimonialsCard';
import { PackageSummaryFooter } from '../../organisms/PackageSummaryFooter';
import type { FlightSegmentData } from '../../molecules/FlightSegmentRow';

export type PackageHotelDetailsProps = {
  name: string;
  /** Subtítulo do cabeçalho (ex.: cidade/UF). */
  headerSubtitle?: string;
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
  amenities: string[];
  nearbyPoints?: HotelNearbyPoint[];
  /** Avaliações — nota-resumo + categorias. Omitido = sem a seção. */
  reviews?: { stars: number; ratingLabel: string; categories: HotelReviewCategory[] };
  /** Depoimentos. Omitido/vazio = sem a seção. */
  testimonials?: HotelTestimonial[];
  /** Rodapé do pacote (hotel + voos + preço + "Próximo"). */
  footer: {
    roomInfo: string;
    segments: FlightSegmentData[];
    priceLabel: string;
    price: string;
    expanded?: boolean;
  };
  onBack?: () => void;
  onShare?: () => void;
  onSeeAllAmenities?: () => void;
  onSeeAllReviews?: () => void;
  onPressRelevantInfo?: () => void;
  onPressPolicies?: () => void;
  onToggleFooter?: () => void;
  onEditPackage?: () => void;
  onContinue?: () => void;
};

/**
 * PackageHotelDetails — detalhes do hotel dentro do fluxo de pacotes: card
 * principal, localização, descrição, comodidades, proximidade, avaliações,
 * depoimentos e as seções expansíveis (informações/políticas), com o rodapé
 * fixo do pacote. Apresentacional: dados já formatados vêm por props.
 * Reproduz "Pacotes - Detalhes hotel" do Figma; reaproveita os organisms de
 * hospedagem (HotelDetailsCard/HotelLocationCard/HotelAmenitiesCard/…).
 */
export const PackageHotelDetails = ({
  name,
  headerSubtitle,
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
  reviews,
  testimonials,
  footer,
  onBack,
  onShare,
  onSeeAllAmenities,
  onSeeAllReviews,
  onPressRelevantInfo,
  onPressPolicies,
  onToggleFooter,
  onEditPackage,
  onContinue,
}: PackageHotelDetailsProps): React.ReactElement => (
  <View className="flex-1 bg-surface-tag">
    <View className="bg-surface-default pb-xs pt-[40px]">
      <View className="flex-row items-center justify-between px-xxl">
        <Pressable accessibilityRole="button" accessibilityLabel="Voltar" onPress={onBack}>
          <Icon name="back-arrow" size={24} />
        </Pressable>
        <View className="flex-1 items-center gap-xxs px-md">
          <Text numberOfLines={1} className="font-sans text-lg font-bold text-fg-secondary">
            {name}
          </Text>
          {headerSubtitle ? (
            <Text className="text-center font-sans text-xs font-medium text-fg-subtle">
              {headerSubtitle}
            </Text>
          ) : null}
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel="Compartilhar" onPress={onShare}>
          <Icon name="upload" size={24} color={colors.text.subtle} />
        </Pressable>
      </View>
    </View>

    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="gap-lg">
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
        {reviews ? (
          <HotelReviewsCard
            stars={reviews.stars}
            ratingLabel={reviews.ratingLabel}
            categories={reviews.categories}
          />
        ) : null}
        {testimonials?.length ? (
          <HotelTestimonialsCard testimonials={testimonials} onSeeAll={onSeeAllReviews} />
        ) : null}
        <HotelPolicyRow title="Informações relevantes" onPress={onPressRelevantInfo} />
        <HotelPolicyRow title="Políticas de acomodações" onPress={onPressPolicies} />
      </View>
    </ScrollView>

    <PackageSummaryFooter
      hotelName={name}
      roomInfo={footer.roomInfo}
      hotelImage={image}
      segments={footer.segments}
      priceLabel={footer.priceLabel}
      price={footer.price}
      expanded={footer.expanded}
      onToggle={onToggleFooter}
      onEdit={onEditPackage}
      onContinue={onContinue}
    />
  </View>
);
