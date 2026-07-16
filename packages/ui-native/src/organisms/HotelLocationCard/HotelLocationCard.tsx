import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';

export type HotelLocationCardProps = {
  /** Endereço em uma linha (ex.: "Av. Boa Viagem, 1500 - Recife, PE"). */
  address: string;
};

/**
 * HotelLocationCard — bloco "Localização" da tela de detalhes: título, mapa e
 * o endereço. O mapa real (ZMapView) não é portável para o design system —
 * aqui é uma superfície de destaque com o pino, só ilustrativa. Reproduz
 * HotelLocateCard do zupper-app.
 */
export const HotelLocationCard = ({ address }: HotelLocationCardProps): React.ReactElement => (
  <View className="gap-md bg-surface-default py-xl">
    <Text className="px-xxl font-sans text-xl font-bold text-fg-secondary">Localização</Text>
    <View className="h-[200px] w-full items-center justify-center bg-brand-cardSurface">
      <Icon name="travel-pinmap" size={40} color={colors.brand.strong} />
    </View>
    <View className="flex-row items-center gap-xs px-xxl">
      <Icon name="travel-pinmap" size={20} color={colors.text.subtle} />
      <Text className="flex-1 font-sans text-xs font-medium text-fg-subtle">{address}</Text>
    </View>
  </View>
);
