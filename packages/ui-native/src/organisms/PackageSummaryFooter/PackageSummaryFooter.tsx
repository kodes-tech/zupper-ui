import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';
import { FlightSegmentRow } from '../../molecules/FlightSegmentRow';
import type { FlightSegmentData } from '../../molecules/FlightSegmentRow';

export type PackageSummaryFooterProps = {
  hotelName: string;
  /** Ex.: "Quarto Basic (2 Adultos)". */
  roomInfo: string;
  hotelImage?: ImageSourcePropType;
  /** IDA e VOLTA, nesta ordem. */
  segments: FlightSegmentData[];
  /** Ex.: "Pacote - 2 adultos (3 dias)". */
  priceLabel: string;
  /** Preço já formatado (ex.: "R$ 1.234"). */
  price: string;
  ctaLabel?: string;
  /** Expande/recolhe o detalhamento (hotel + voos). Padrão recolhido. */
  expanded?: boolean;
  onToggle?: () => void;
  /** "Alterar" — voltar para a seleção. */
  onEdit?: () => void;
  onContinue?: () => void;
};

/**
 * PackageSummaryFooter — rodapé fixo do pacote: cabeçalho "Ver detalhes"
 * (expande o resumo com hotel + voos de ida/volta e o link "Alterar") e a
 * barra inferior com o preço total e o CTA "Próximo". Apresentacional: dados
 * já formatados por props; o estado expandido é controlado pelo consumidor.
 * Reproduz o rodapé "Detalhes pacotes" do fluxo de pacotes (Figma).
 */
export const PackageSummaryFooter = ({
  hotelName,
  roomInfo,
  hotelImage,
  segments,
  priceLabel,
  price,
  ctaLabel = 'Próximo',
  expanded = false,
  onToggle,
  onEdit,
  onContinue,
}: PackageSummaryFooterProps): React.ReactElement => (
  <View className="bg-surface-default">
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={expanded ? 'Ocultar detalhes' : 'Ver detalhes'}
      accessibilityState={{ expanded }}
      onPress={onToggle}
      className="flex-row items-center justify-center gap-xs border-b border-border-subtle py-xs"
    >
      <Text className="font-sans text-xs font-medium text-brand-strong">
        {expanded ? 'Ocultar detalhes' : 'Ver detalhes'}
      </Text>
      <Icon
        name="dropdown-arrow"
        size={16}
        color={colors.brand.strong}
        style={{ transform: [{ rotate: expanded ? '-90deg' : '90deg' }] }}
      />
    </Pressable>

    {expanded ? (
      <View className="gap-md px-xxl pb-xs pt-md">
        <View className="flex-row items-center gap-lg">
          {hotelImage ? (
            <Image source={hotelImage} resizeMode="cover" className="h-[44px] w-[44px] rounded-sm" />
          ) : (
            <View className="h-[44px] w-[44px] items-center justify-center rounded-sm bg-surface-tag">
              <Icon name="hotel-placeholder" size={20} color={colors.text.subtle} />
            </View>
          )}
          <View className="flex-1 gap-xxs">
            <Text numberOfLines={1} className="font-sans text-lg font-bold text-fg-secondary">
              {hotelName}
            </Text>
            <Text className="font-sans text-xs font-medium text-fg-subtle">{roomInfo}</Text>
          </View>
        </View>

        {segments.map((segment, index) => (
          <FlightSegmentRow key={index} segment={segment} />
        ))}

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Alterar"
          onPress={onEdit}
          className="flex-row items-center justify-center gap-xs py-xs"
        >
          <Text className="font-sans text-xs font-medium text-brand-strong">Alterar</Text>
          <Icon name="travel-chevron-right" size={16} color={colors.brand.strong} />
        </Pressable>
      </View>
    ) : null}

    <View className="flex-row items-center justify-between border-t border-border-default px-xxl py-lg">
      <View className="gap-xxs">
        <Text className="font-sans text-xs font-medium text-fg-subtle">{priceLabel}</Text>
        <Text className="font-sans text-buttonLabelLg text-brand-zupper">{price}</Text>
      </View>
      <Button label={ctaLabel} onPress={onContinue} />
    </View>
  </View>
);
