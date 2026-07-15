import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';
import { BottomSheet } from '../BottomSheet';

export type HotelLocationSheetProps = {
  hotelName: string;
  address: string;
  onDismiss?: () => void;
};

/**
 * HotelLocationSheet — sheet "Ver no mapa": nome do hotel + endereço (ícone de
 * pin) e uma ilustração no lugar do mapa real. Reproduz HotelLocateCardModal
 * do zupper-app, mas sem integrar um MapView real — mapa não é portável para
 * o design system (mesma decisão tomada em HotelLocationCard).
 */
export const HotelLocationSheet = ({
  hotelName,
  address,
  onDismiss,
}: HotelLocationSheetProps): React.ReactElement => (
  <BottomSheet title="Ver no mapa" onDismiss={onDismiss}>
    <View className="gap-lg px-screenMargin pb-lg pt-md">
      <View className="flex-row items-start gap-md">
        <Icon name="pin-map" size={20} color={colors.brand.zupper} />
        <View className="flex-1 gap-xs">
          <Text className="font-sans text-md font-bold text-fg-primary">{hotelName}</Text>
          <Text className="font-sans text-sm text-fg-muted">{address}</Text>
        </View>
      </View>

      <View className="h-[220px] items-center justify-center rounded-md bg-surface-tag">
        <Icon name="pin-map" size={40} color={colors.text.subtle} />
        <Text className="mt-xs font-sans text-sm text-fg-subtle">Mapa indisponível na pré-visualização</Text>
      </View>
    </View>
  </BottomSheet>
);
