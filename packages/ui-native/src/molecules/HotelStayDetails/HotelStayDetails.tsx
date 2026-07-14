import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';
import type { IconName } from '../../atoms/Icon';

export type HotelStayDetailsProps = {
  /** Ex.: "Ter, 10 Set - 14:00". */
  checkIn: string;
  /** Ex.: "Sex, 20 Set - 12:00". */
  checkOut: string;
  /** Ex.: "1 quarto, 2 adultos". */
  guestsSummary: string;
};

const Row = ({ icon, label, value }: { icon: IconName; label: string; value: string }) => (
  <View className="flex-row items-center justify-between gap-md">
    <View className="flex-row items-center gap-xs">
      <Icon name={icon} size={16} color={colors.text.subtle} />
      <Text className="font-sans text-xs font-medium text-fg-subtle">{label}</Text>
    </View>
    <Text numberOfLines={1} className="flex-shrink text-right font-sans text-md font-bold text-fg-secondary">
      {value}
    </Text>
  </View>
);

/**
 * HotelStayDetails — as três linhas fixas de entrada/saída/quartos+hóspedes
 * exibidas no card de detalhes e no card de quarto. Extraído de
 * HotelCheckInAndRoomsDisplay do zupper-app.
 */
export const HotelStayDetails = ({
  checkIn,
  checkOut,
  guestsSummary,
}: HotelStayDetailsProps): React.ReactElement => (
  <View className="gap-xs">
    <Row icon="travel-calendar" label="Entrada" value={checkIn} />
    <Row icon="travel-calendar" label="Saída" value={checkOut} />
    <Row icon="travel-guests" label="Quartos e hóspedes" value={guestsSummary} />
  </View>
);
