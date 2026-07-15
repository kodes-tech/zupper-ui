import React from 'react';
import { Image, Text, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Button } from '../../atoms/Button';
import { Divider } from '../../atoms/Divider';
import { Icon } from '../../atoms/Icon';

export type PackageOfferCardData = {
  id: string;
  /** Foto do destino; ausente = placeholder com ícone de pacote. */
  image?: ImageSourcePropType;
  /** Selo no canto da foto (ex.: "Com café da manhã", "Passeios inclusos"). */
  tag?: string;
  /** Ex.: "Pacote exclusivo para Salvador - Bahia". */
  title: string;
  /** Ex.: "De Rio de Janeiro (01-05 Set)". */
  originInfo: string;
  /** Ex.: "Salvador Express Praia Hotel". */
  hotelName: string;
  /** Ex.: "Preço por pessoa". */
  priceLabel: string;
  /** Ex.: "R$ 155". */
  price: string;
};

export type PackageOfferCardProps = {
  offer: PackageOfferCardData;
  onSeeOffer?: () => void;
};

/**
 * PackageOfferCard — card de oferta de pacote da Home ("Pacotes irresistíveis"
 * / "Pacotes com destinos marítimos"): foto com selo, título, origem+datas,
 * hotel incluído e o preço por pessoa com o CTA "Ver oferta". Apresentacional:
 * dados já formatados vêm por props. Reproduz Cards Produtos do Figma.
 */
export const PackageOfferCard = ({ offer, onSeeOffer }: PackageOfferCardProps): React.ReactElement => (
  <View className="w-[252px] gap-lg overflow-hidden rounded-md border border-border-default bg-surface-default pb-lg">
    <View className="relative">
      {offer.image ? (
        <Image source={offer.image} resizeMode="cover" className="h-[172px] w-full" />
      ) : (
        <View className="h-[172px] w-full items-center justify-center bg-surface-tag">
          <Icon name="travel-pacotes" size={40} color={colors.text.subtle} />
        </View>
      )}
      {offer.tag ? (
        <View className="absolute right-0 top-0 items-center justify-center rounded-tr-md bg-brand-base p-xs">
          <Text className="font-sans text-xs font-medium text-fg-inverse">{offer.tag}</Text>
        </View>
      ) : null}
    </View>

    <View className="gap-lg px-lg">
      <Text numberOfLines={2} className="font-sans text-lg font-bold text-fg-secondary">
        {offer.title}
      </Text>

      <Divider />

      <View className="gap-xs">
        <View className="flex-row items-center gap-xs">
          <Icon name="travel-voos" size={24} color={colors.text.subtle} />
          <Text className="font-sans text-xs font-medium text-fg-subtle">{offer.originInfo}</Text>
        </View>
        <View className="flex-row items-center gap-xs">
          <Icon name="travel-hospedagens" size={24} color={colors.text.subtle} />
          <Text numberOfLines={1} className="flex-1 font-sans text-xs font-medium text-fg-subtle">
            {offer.hotelName}
          </Text>
        </View>
      </View>

      <Divider />

      <View className="flex-row items-center justify-between">
        <View className="gap-xs">
          <Text className="font-sans text-xs font-medium text-fg-subtle">{offer.priceLabel}</Text>
          <Text className="font-sans text-xl font-bold text-fg-secondary">{offer.price}</Text>
        </View>
        <Button label="Ver oferta" onPress={onSeeOffer} />
      </View>
    </View>
  </View>
);
