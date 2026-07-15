import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Image, Text, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Button } from '../../atoms/Button';
import { Divider } from '../../atoms/Divider';
import { Icon } from '../../atoms/Icon';
import { FlightSegmentRow } from '../../molecules/FlightSegmentRow';
import type { FlightSegmentData } from '../../molecules/FlightSegmentRow';

export type PackageResultCardData = {
  hotelName: string;
  /** Ex.: "Quarto Basic (2 Adultos)". */
  roomInfo: string;
  hotelImage?: ImageSourcePropType;
  /** IDA e VOLTA, nesta ordem. */
  segments: FlightSegmentData[];
  priceLabel: string;
  price: string;
  primaryCtaLabel: string;
  /** Segundo CTA (outline); só o card em destaque tem os dois. */
  secondaryCtaLabel?: string;
};

export type PackageResultCardProps = {
  data: PackageResultCardData;
  /** Card "Melhor pacote encontrado": selo gradiente + 2 CTAs. */
  featured?: boolean;
  onPressPrimary?: () => void;
  onPressSecondary?: () => void;
};

/**
 * PackageResultCard — card de resultado de pacote (hotel + voos): thumb e
 * nome do hotel/quarto, os trechos de ida e volta e o preço total do pacote,
 * com o(s) CTA(s). O card em destaque ("Melhor pacote encontrado") ganha o
 * selo gradiente e um segundo CTA outline. Apresentacional: tudo já
 * formatado por props. Reproduz Cards Pacotes do Figma.
 */
export const PackageResultCard = ({
  data,
  featured = false,
  onPressPrimary,
  onPressSecondary,
}: PackageResultCardProps): React.ReactElement => (
  <View className="w-full gap-lg overflow-hidden rounded-sm border border-border-subtle bg-surface-default pb-lg">
    {featured ? (
      <LinearGradient
        colors={[...colors.gradient.searchCta]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 4 }}
      >
        <Text className="font-sans text-xs font-medium text-fg-inverse">PACOTE SUGERIDO</Text>
      </LinearGradient>
    ) : null}

    <View className="gap-lg px-lg">
      <View className="flex-row items-center gap-lg">
        {data.hotelImage ? (
          <Image source={data.hotelImage} resizeMode="cover" className="h-[48px] w-[48px] rounded-sm" />
        ) : (
          <View className="h-[48px] w-[48px] items-center justify-center rounded-sm bg-surface-tag">
            <Icon name="hotel-placeholder" size={24} color={colors.text.subtle} />
          </View>
        )}
        <View className="flex-1 gap-xxs">
          <Text numberOfLines={1} className="font-sans text-lg font-bold text-fg-secondary">
            {data.hotelName}
          </Text>
          <Text className="font-sans text-xs font-medium text-fg-subtle">{data.roomInfo}</Text>
        </View>
      </View>

      <Divider />

      <View className="gap-lg">
        {data.segments.map((segment, index) => (
          <FlightSegmentRow key={index} segment={segment} />
        ))}
      </View>

      <Divider />

      <View className="gap-xs">
        <Text
          className={`font-sans text-xs font-medium ${featured ? 'text-fg-subtle' : 'text-brand-strong'}`}
        >
          {data.priceLabel}
        </Text>
        <Text className="font-sans text-xl font-bold text-fg-secondary">{data.price}</Text>
      </View>

      {featured ? (
        <View className="gap-lg">
          <Button label={data.primaryCtaLabel} fullWidth onPress={onPressPrimary} />
          {data.secondaryCtaLabel ? (
            <Button
              label={data.secondaryCtaLabel}
              variant="secondary"
              fullWidth
              onPress={onPressSecondary}
            />
          ) : null}
        </View>
      ) : (
        <Button label={data.primaryCtaLabel} variant="secondary" fullWidth onPress={onPressPrimary} />
      )}
    </View>
  </View>
);
