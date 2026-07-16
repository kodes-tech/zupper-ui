import React from 'react';
import { Image, Text, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Divider } from '../../atoms/Divider';
import { Icon } from '../../atoms/Icon';
import { StarRating } from '../../molecules/StarRating';
import { HotelStayDetails } from '../../molecules/HotelStayDetails';
import { HotelBenefitItem } from '../../molecules/HotelBenefitItem';
import type { HotelBenefitTone } from '../../molecules/HotelBenefitItem';
import { HotelPriceSummary } from '../../molecules/HotelPriceSummary';

export type HotelDetailsCardProps = {
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
};

/**
 * HotelDetailsCard — cartão principal da tela de detalhes: imagem, nome,
 * estrelas, entrada/saída/hóspedes, benefícios e o preço. Reproduz
 * HotelDetailsCard do zupper-app (mesma composição do HotelCard de
 * resultados, sem o CTA "Ver oferta" — o CTA da tela fica no rodapé fixo).
 */
export const HotelDetailsCard = ({
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
}: HotelDetailsCardProps): React.ReactElement => (
  <View className="bg-surface-default pb-xl">
    {image ? (
      <Image source={image} resizeMode="cover" className="h-[172px] w-full" />
    ) : (
      <View className="h-[172px] w-full items-center justify-center bg-surface-tag">
        <Icon name="hotel-placeholder" size={40} color={colors.text.subtle} />
      </View>
    )}

    <View className="mt-lg gap-xs px-[14px]">
      <Text className="font-sans text-buttonLabelLg text-fg-secondary">{name}</Text>
    </View>

    <View className="gap-md px-xl pt-md">
      {starRating ? <StarRating rating={starRating} /> : null}
      <Divider />
      <HotelStayDetails checkIn={checkIn} checkOut={checkOut} guestsSummary={guestsSummary} />
      {breakfast || cancellation ? (
        <View className="gap-xs pt-xl">
          {breakfast ? (
            <HotelBenefitItem icon="amenity-coffee" text="Café da manhã incluído" tone="success" />
          ) : null}
          {cancellation ? (
            <HotelBenefitItem icon="hotel-circle-check" text={cancellation.text} tone={cancellation.tone} />
          ) : null}
        </View>
      ) : null}
      <Divider />
      <HotelPriceSummary label={priceLabel} price={price} />
    </View>
  </View>
);
