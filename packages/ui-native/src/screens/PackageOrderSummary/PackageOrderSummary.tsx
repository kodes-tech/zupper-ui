import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { Icon } from '../../atoms/Icon';
import { HotelPolicyRow } from '../../molecules/HotelPolicyRow';
import type { FlightSegmentData } from '../../molecules/FlightSegmentRow';
import { FlightItineraryCard } from '../../organisms/FlightItineraryCard';
import type { FlightItinerary } from '../../organisms/FlightItineraryCard';
import { PurchaseSummaryCard } from '../../organisms/PurchaseSummaryCard';
import type { PurchaseSummaryItem } from '../../organisms/PurchaseSummaryCard';
import { TravelersList } from '../../organisms/TravelersList';
import type { TravelerEntry } from '../../organisms/TravelersList';
import { PackageOrderHotelCard } from '../../organisms/PackageOrderHotelCard';
import type { PackageOrderHotelBenefit } from '../../organisms/PackageOrderHotelCard';
import { PackageRoomCard } from '../../organisms/PackageRoomCard';
import type { PackageRoomCardData } from '../../organisms/PackageRoomCard';
import { BaggageInfo } from '../../organisms/BaggageInfo';
import type { BaggageItem } from '../../organisms/BaggageInfo';
import { PackageSummaryFooter } from '../../organisms/PackageSummaryFooter';
import type { HotelAmenity } from '../../organisms/HotelAmenitiesCard';

export type PackageOrderHotel = {
  name: string;
  image?: ImageSourcePropType;
  starRating?: number;
  address: string;
  distance?: string;
  benefits?: PackageOrderHotelBenefit[];
  amenities?: HotelAmenity[];
  checkIn: string;
  checkOut: string;
  guestsSummary: string;
};

export type PackageOrderSummaryProps = {
  /** Bloco "Sua compra". */
  purchase: { items: PurchaseSummaryItem[]; total: string };
  travelers: TravelerEntry[];
  hotel: PackageOrderHotel;
  rooms: PackageRoomCardData[];
  /** Voos do pacote (ida e volta), cada um com o card do trecho + sua bagagem. */
  flights: { itinerary: FlightItinerary; baggage: BaggageItem[]; disclaimer?: string }[];
  /** Rodapé do pacote (preço + "Próximo"). */
  footer: { roomInfo: string; priceLabel: string; price: string; expanded?: boolean };
  onBack?: () => void;
  onSeeDescription?: () => void;
  onSeeAllAmenities?: () => void;
  onSeeRoomAmenities?: (index: number) => void;
  onPressRelevantInfo?: () => void;
  onPressPolicies?: () => void;
  onToggleFooter?: () => void;
  onEditPackage?: () => void;
  onContinue?: () => void;
};

/**
 * PackageOrderSummary — resumo/checkout do pacote ("Detalhes resumo"): "Sua
 * compra" (preços), viajantes, resumo do hotel, quartos, voos, bagagem e as
 * seções expansíveis (informações/políticas), com o rodapé fixo do pacote.
 * Apresentacional: dados já formatados vêm por props. Reproduz "Pacotes -
 * Detalhes resumo" do Figma; reaproveita FlightSegmentRow/HotelPolicyRow/
 * PackageSummaryFooter e os cards do resumo.
 */
export const PackageOrderSummary = ({
  purchase,
  travelers,
  hotel,
  rooms,
  flights,
  footer,
  onBack,
  onSeeDescription,
  onSeeAllAmenities,
  onSeeRoomAmenities,
  onPressRelevantInfo,
  onPressPolicies,
  onToggleFooter,
  onEditPackage,
  onContinue,
}: PackageOrderSummaryProps): React.ReactElement => {
  // O rodapé usa a versão compacta dos trechos (FlightSegmentRow), derivada
  // dos mesmos itinerários exibidos no corpo.
  const footerSegments: FlightSegmentData[] = flights.map(({ itinerary: f }) => ({
    direction: f.direction,
    originCode: f.originCode,
    destinationCode: f.destinationCode,
    airlineCode: f.airlineCode,
    airlineIcon: f.airlineIcon,
    airlineColor: f.airlineColor,
    stopsLabel: f.stopsLabel,
    departureTime: f.departureTime,
    arrivalTime: f.arrivalTime,
    date: f.headerDate,
  }));

  return (
  <View className="flex-1 bg-surface-tag">
    <View className="bg-surface-default pb-xs pt-[40px]">
      <View className="flex-row items-center justify-between px-xxl">
        <Pressable accessibilityRole="button" accessibilityLabel="Voltar" onPress={onBack}>
          <Icon name="back-arrow" size={24} />
        </Pressable>
        <Text className="font-sans text-lg font-bold text-fg-secondary">Detalhes do pacote</Text>
        <View className="h-[24px] w-[24px]" />
      </View>
    </View>

    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="gap-lg">
        <PurchaseSummaryCard items={purchase.items} total={purchase.total} />
        <TravelersList travelers={travelers} />
        <PackageOrderHotelCard
          {...hotel}
          onSeeDescription={onSeeDescription}
          onSeeAllAmenities={onSeeAllAmenities}
        />
        {rooms.map((room, index) => (
          <PackageRoomCard key={room.title} room={room} onSeeAll={() => onSeeRoomAmenities?.(index)} />
        ))}

        {/* Informações/Políticas vêm antes dos voos (ordem do Figma). */}
        <HotelPolicyRow title="Informações relevantes" onPress={onPressRelevantInfo} />
        <HotelPolicyRow title="Políticas de acomodações" onPress={onPressPolicies} />

        {/* Cada voo (ida/volta) = card do trecho + card de bagagem, em sequência. */}
        {flights.map(({ itinerary, baggage, disclaimer }) => (
          <React.Fragment key={itinerary.direction}>
            <FlightItineraryCard itinerary={itinerary} disclaimer={disclaimer} />
            <BaggageInfo items={baggage} />
          </React.Fragment>
        ))}
      </View>
    </ScrollView>

    <PackageSummaryFooter
      hotelName={hotel.name}
      roomInfo={footer.roomInfo}
      hotelImage={hotel.image}
      segments={footerSegments}
      priceLabel={footer.priceLabel}
      price={footer.price}
      expanded={footer.expanded}
      onToggle={onToggleFooter}
      onEdit={onEditPackage}
      onContinue={onContinue}
    />
  </View>
  );
};
