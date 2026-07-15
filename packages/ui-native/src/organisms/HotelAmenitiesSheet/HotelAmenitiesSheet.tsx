import React from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';
import { BottomSheet } from '../BottomSheet';

export type HotelAmenitiesSheetProps = {
  /** Lista completa de comodidades (já ordenada, se aplicável). */
  amenities: string[];
  /** Termo de busca atual — filtragem é responsabilidade do app consumidor. */
  query?: string;
  onChangeQuery?: (text: string) => void;
  onDismiss?: () => void;
};

/**
 * HotelAmenitiesSheet — sheet "Comodidades": campo de busca no topo e a lista
 * completa (ícone de check + nome), sem agrupamento por categoria. Sem
 * rodapé — fecha pelo dismiss do sheet. Apresentacional: a filtragem por
 * texto é responsabilidade do app consumidor (recebe `amenities` já filtrada
 * ou o texto completo). Reproduz HotelAmenityListModal do zupper-app.
 */
export const HotelAmenitiesSheet = ({
  amenities,
  query = '',
  onChangeQuery,
  onDismiss,
}: HotelAmenitiesSheetProps): React.ReactElement => (
  <BottomSheet title="Comodidades" onDismiss={onDismiss}>
    <View className="gap-lg px-screenMargin pb-lg pt-md">
      <View className="h-[48px] flex-row items-center gap-xs rounded-md border border-border-default bg-surface-default px-md">
        <Icon name="search" size={20} color={colors.text.subtle} />
        <TextInput
          value={query}
          onChangeText={onChangeQuery}
          placeholder="Pesquisar comodidades"
          className="flex-1 font-sans text-md text-fg-secondary"
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="max-h-[360px]">
        <View className="gap-md">
          {amenities.map((amenity) => (
            <View key={amenity} className="flex-row items-center gap-md">
              <Icon name="check" size={18} color={colors.brand.zupper} />
              <Text className="flex-1 font-sans text-md font-medium text-fg-secondary">{amenity}</Text>
            </View>
          ))}
          {amenities.length === 0 ? (
            <Text className="py-lg text-center font-sans text-md text-fg-subtle">
              Nenhuma comodidade encontrada
            </Text>
          ) : null}
        </View>
      </ScrollView>
    </View>
  </BottomSheet>
);
