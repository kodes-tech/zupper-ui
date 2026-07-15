import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { Icon } from '../../atoms/Icon';
import { HotelPolicyRow } from '../../molecules/HotelPolicyRow';
import { FlightSegmentRow } from '../../molecules/FlightSegmentRow';
import type { FlightSegmentData } from '../../molecules/FlightSegmentRow';
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
  /** Trechos de voo (IDA/VOLTA). */
  segments: FlightSegmentData[];
  /** Informações de bagagem. */
  baggage: BaggageItem[];
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
  segments,
  baggage,
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
}: PackageOrderSummaryProps): React.ReactElement => (
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
        <View className="gap-lg bg-surface-default px-xxl py-xl">
          <Text className="font-sans text-xl font-bold text-fg-secondary">Voos</Text>
          <View className="gap-lg">
            {segments.map((segment, index) => (
              <FlightSegmentRow key={index} segment={segment} />
            ))}
          </View>
        </View>
        <BaggageInfo items={baggage} />
        <HotelPolicyRow title="Informações relevantes" onPress={onPressRelevantInfo} />
        <HotelPolicyRow title="Políticas de acomodações" onPress={onPressPolicies} />
      </View>
    </ScrollView>

    <PackageSummaryFooter
      hotelName={hotel.name}
      roomInfo={footer.roomInfo}
      hotelImage={hotel.image}
      segments={segments}
      priceLabel={footer.priceLabel}
      price={footer.price}
      expanded={footer.expanded}
      onToggle={onToggleFooter}
      onEdit={onEditPackage}
      onContinue={onContinue}
    />
  </View>
);
