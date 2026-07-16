import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Button } from '../../atoms/Button';
import { Divider } from '../../atoms/Divider';
import { Icon } from '../../atoms/Icon';
import { StarRating } from '../../molecules/StarRating';
import { HotelBenefitItem } from '../../molecules/HotelBenefitItem';
import type { HotelBenefitTone } from '../../molecules/HotelBenefitItem';

export type HotelCancellation = { text: string; tone: HotelBenefitTone };

export type HotelCardData = {
  name: string;
  /** Foto principal; ausente = placeholder com ícone de cama. */
  image?: ImageSourcePropType;
  starRating?: number;
  /** Endereço em uma linha. */
  address: string;
  /** Mostra o link "Ver no mapa". */
  hasMap?: boolean;
  /** Café da manhã incluído. */
  breakfast?: boolean;
  cancellation?: HotelCancellation;
  /** Comodidades exibidas como chips (com check). */
  amenities?: string[];
  /** Rótulo do preço (ex.: "Preço para 3 diárias"). */
  priceLabel: string;
  /** Preço já formatado (ex.: "R$ 1.234"). */
  price: string;
  /** Nota de taxas (ex.: "Taxas incluídas"). */
  taxNote?: string;
  /** Parcelamento (ex.: "em até 10x"). */
  installments?: string;
};

export type HotelCardProps = {
  hotel: HotelCardData;
  onSeeOffer?: () => void;
  onSeeMap?: () => void;
};

/** Pill de parcelamento ("em até 10x") com o ícone de cartão, tom sucesso. */
const InstallmentsTag = ({ label }: { label: string }) => (
  <View className="flex-row items-center gap-xs self-start rounded-sm bg-feedback-successSurface px-md py-xxs">
    <Icon name="payment-card" size={16} color={colors.feedback.successStrong} />
    <Text className="font-sans text-xs font-medium text-feedback-successStrong">{label}</Text>
  </View>
);

/**
 * HotelCard — card de hotel da lista de resultados: imagem, nome, estrelas,
 * endereço (+ "Ver no mapa"), benefícios (café/cancelamento), comodidades e o
 * bloco de preço com o CTA "Ver oferta". Apresentacional: tudo por props, preço
 * já formatado. Reproduz HotelResultCard do zupper-app.
 */
export const HotelCard = ({ hotel, onSeeOffer, onSeeMap }: HotelCardProps): React.ReactElement => (
  <View className="mb-lg overflow-hidden rounded-md border border-border-default bg-surface-default pb-lg">
    {hotel.image ? (
      <Image source={hotel.image} resizeMode="cover" className="h-[172px] w-full" />
    ) : (
      <View className="h-[172px] w-full items-center justify-center bg-surface-tag">
        <Icon name="hotel-placeholder" size={40} color={colors.text.subtle} />
      </View>
    )}

    <View className="mt-lg gap-xs px-[14px]">
      <Text className="font-sans text-buttonLabelLg text-fg-secondary">{hotel.name}</Text>
      {hotel.starRating ? <StarRating rating={hotel.starRating} /> : null}
    </View>

    <View className="px-xl pt-md">
      <Divider />
    </View>

    <View className="gap-md px-xl pt-md">
      {/* Endereço + ver no mapa */}
      <View className="flex-row items-center justify-between gap-md">
        <View className="flex-1 flex-row items-center gap-xxs">
          <Icon name="travel-pinmap" size={20} color={colors.text.subtle} />
          <Text numberOfLines={2} className="flex-1 font-sans text-xs font-medium text-fg-subtle">
            {hotel.address}
          </Text>
        </View>
        {hotel.hasMap ? (
          <Pressable accessibilityRole="button" onPress={onSeeMap}>
            <Text className="font-sans text-xs font-medium text-fg-link underline">Ver no mapa</Text>
          </Pressable>
        ) : null}
      </View>

      {/* Benefícios */}
      {hotel.breakfast ? (
        <HotelBenefitItem icon="amenity-coffee" text="Café da manhã incluído" tone="success" />
      ) : null}
      {hotel.cancellation ? (
        <HotelBenefitItem
          icon="hotel-circle-check"
          text={hotel.cancellation.text}
          tone={hotel.cancellation.tone}
        />
      ) : null}

      {/* Comodidades */}
      {hotel.amenities?.length ? (
        <View className="flex-row flex-wrap gap-x-lg gap-y-xs">
          {hotel.amenities.map((amenity) => (
            <View key={amenity} className="flex-row items-center gap-xxs">
              <Icon name="amenity-check" size={18} color={colors.brand.zupper} />
              <Text className="font-sans text-xs font-medium text-fg-subtle">{amenity}</Text>
            </View>
          ))}
        </View>
      ) : null}

      <Divider />

      {/* Preço + CTA */}
      <View className="flex-row items-center justify-between gap-md">
        <View className="flex-1 gap-xs">
          <Text className="font-sans text-xs font-medium text-fg-subtle">{hotel.priceLabel}</Text>
          <Text className="font-sans text-xl font-bold text-fg-secondary">{hotel.price}</Text>
        </View>
        <View className="w-[140px]">
          <Button label="Ver oferta" fullWidth onPress={onSeeOffer} />
        </View>
      </View>

      {hotel.taxNote || hotel.installments ? (
        <View className="gap-md">
          {hotel.taxNote ? (
            <Text className="text-center font-sans text-md font-bold text-fg-muted">{hotel.taxNote}</Text>
          ) : null}
          {hotel.installments ? <InstallmentsTag label={hotel.installments} /> : null}
        </View>
      ) : null}
    </View>
  </View>
);
