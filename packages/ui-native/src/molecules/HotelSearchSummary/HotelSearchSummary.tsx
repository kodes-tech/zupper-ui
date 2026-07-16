import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '../../atoms/Icon';

export type HotelSearchSummaryProps = {
  /** Destino (ex.: "Recife - PE"). */
  destination: string;
  /** Linha de datas + hóspedes (ex.: "10 set - 20 set · 2 hóspedes"). */
  details: string;
  onEdit?: () => void;
};

/**
 * HotelSearchSummary — resumo da busca exibido no topo das telas de hotel:
 * destino em negrito (com lápis de editar) e a linha de datas/hóspedes.
 * Centralizado. Extraído de HotelHeaderSearchSummary do zupper-app.
 */
export const HotelSearchSummary = ({
  destination,
  details,
  onEdit,
}: HotelSearchSummaryProps): React.ReactElement => (
  <View className="items-center gap-xs pb-lg">
    <View className="flex-row items-center gap-lg">
      <Text className="font-sans text-sm font-bold text-fg-secondary">{destination}</Text>
      <Pressable accessibilityRole="button" accessibilityLabel="Editar busca" onPress={onEdit}>
        <Icon name="edit" size={20} />
      </Pressable>
    </View>
    <Text className="font-sans text-xs font-medium text-fg-subtle">{details}</Text>
  </View>
);
