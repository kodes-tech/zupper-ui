import React from 'react';
import { Image, Text, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Button } from '../../atoms/Button';
import { Divider } from '../../atoms/Divider';
import { Icon } from '../../atoms/Icon';
import { HotelBenefitItem } from '../../molecules/HotelBenefitItem';
import type { HotelBenefitTone } from '../../molecules/HotelBenefitItem';
import { HotelStayDetails } from '../../molecules/HotelStayDetails';
import { HotelPriceSummary } from '../../molecules/HotelPriceSummary';

export type HotelRoomUnit = {
  name: string;
  image?: ImageSourcePropType;
  /** Categoria/descrição do quarto (ex.: "Superior, vista mar"). */
  description?: string;
  cancellation?: { text: string; tone: HotelBenefitTone };
  amenities?: string[];
};

export type HotelRoomOptionData = {
  id: string;
  /** Título do card (ex.: "Quarto 1" ou "Combo 1 - 2 Quartos"). */
  title: string;
  /** Um ou mais quartos físicos (combo = mais de um). */
  rooms: HotelRoomUnit[];
  checkIn: string;
  checkOut: string;
  guestsSummary: string;
  priceLabel: string;
  price: string;
  /** Ex.: "Total de R$ 3.480 + taxas". */
  totalNote: string;
  selected?: boolean;
};

export type HotelRoomCardProps = {
  option: HotelRoomOptionData;
  /** "quarto" (padrão) ou "combo" — só muda o texto do botão. */
  kind?: 'quarto' | 'combo';
  onSelect?: () => void;
};

const RoomUnitHeader = ({ room }: { room: HotelRoomUnit }) => (
  <View className="flex-row gap-md">
    {room.image ? (
      <Image source={room.image} resizeMode="cover" className="h-[64px] w-[64px] rounded-sm" />
    ) : (
      <View className="h-[64px] w-[64px] items-center justify-center rounded-sm bg-surface-tag">
        <Icon name="hotel-placeholder" size={28} color={colors.brand.zupper} />
      </View>
    )}
    <View className="flex-1 gap-xs">
      <Text className="font-sans text-lg font-bold text-fg-secondary">{room.name}</Text>
      {room.cancellation ? (
        <HotelBenefitItem
          icon="hotel-circle-check"
          text={room.cancellation.text}
          tone={room.cancellation.tone}
        />
      ) : null}
      {room.description ? (
        <Text className="font-sans text-xs font-medium text-fg-subtle">{room.description}</Text>
      ) : null}
    </View>
  </View>
);

/**
 * HotelRoomCard — uma opção selecionável na tela de escolha de quarto: um ou
 * mais quartos (combo), estadia, preço e o botão de seleção. Apresentacional:
 * o estado `selected` e o texto do CTA vêm de fora. Reproduz HotelRoomCard +
 * HotelHeaderInfo do zupper-app.
 */
export const HotelRoomCard = ({
  option,
  kind = 'quarto',
  onSelect,
}: HotelRoomCardProps): React.ReactElement => (
  <View className="gap-xl bg-surface-default px-xxl py-xxl">
    <Text className="font-sans text-lg font-medium text-fg-secondary">{option.title}</Text>

    <View className="gap-lg">
      {option.rooms.map((room, index) => (
        <View key={`${option.id}-${index}`} className="gap-md">
          <RoomUnitHeader room={room} />
          {room.amenities?.length ? (
            <>
              <Divider />
              <View className="flex-row flex-wrap gap-x-lg gap-y-xs">
                {room.amenities.map((amenity) => (
                  <View key={amenity} className="flex-row items-center gap-xxs">
                    <Icon name="amenity-check" size={18} color={colors.brand.zupper} />
                    <Text className="font-sans text-xs font-medium text-fg-subtle">{amenity}</Text>
                  </View>
                ))}
              </View>
            </>
          ) : null}
        </View>
      ))}
    </View>

    <Divider />
    <HotelStayDetails
      checkIn={option.checkIn}
      checkOut={option.checkOut}
      guestsSummary={option.guestsSummary}
    />

    <Divider />
    <HotelPriceSummary label={option.priceLabel} price={option.price} />
    <Divider />
    <Text className="font-sans text-md font-bold text-fg-subtle">{option.totalNote}</Text>

    {option.selected ? (
      <Button
        label={`${kind === 'combo' ? 'Combo' : 'Quarto'} selecionado`}
        icon={<Icon name="hotel-circle-check" size={20} color={colors.text.inverse} />}
        iconPosition="left"
        fullWidth
        onPress={onSelect}
      />
    ) : (
      <Button
        label={`Selecionar ${kind}`}
        variant="secondary"
        fullWidth
        onPress={onSelect}
      />
    )}
  </View>
);
