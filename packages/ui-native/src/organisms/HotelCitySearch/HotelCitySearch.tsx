import React from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';
import { HotelModalSheet } from '../HotelModalSheet';

export type HotelCityOption = {
  id: string;
  /** Ex.: "Recife, PE - Brasil". */
  label: string;
};

export type HotelCitySearchProps = {
  query: string;
  onChangeQuery?: (text: string) => void;
  cities: HotelCityOption[];
  onSelectCity?: (id: string) => void;
  onClose?: () => void;
};

/**
 * HotelCitySearch — modal de busca de cidade (destino da hospedagem): campo
 * de busca com foco automático e a lista de resultados. Apresentacional: a
 * busca reativa (debounce/API) fica no app consumidor. Reproduz
 * CitySearchInput (modo `isEdit`) do zupper-app.
 */
export const HotelCitySearch = ({
  query,
  onChangeQuery,
  cities,
  onSelectCity,
  onClose,
}: HotelCitySearchProps): React.ReactElement => (
  <HotelModalSheet title="Busca de cidades" onClose={onClose}>
    <View className="gap-lg">
      <View className="h-[56px] flex-row items-center gap-xs rounded-md border border-border-default bg-surface-default px-md">
        <Icon name="travel-pinmap" size={20} color={colors.brand.zupper} />
        <TextInput
          value={query}
          onChangeText={onChangeQuery}
          placeholder="Qual seu destino ?"
          autoFocus
          returnKeyType="done"
          className="flex-1 font-sans text-md text-fg-secondary"
        />
      </View>

      <Text className="font-sans text-md text-fg-subtle">Resultados</Text>

      <ScrollView showsVerticalScrollIndicator={false} className="max-h-[280px]">
        <View className="gap-xs">
          {cities.map((city) => (
            <Pressable
              key={city.id}
              accessibilityRole="button"
              onPress={() => onSelectCity?.(city.id)}
              className="flex-row items-center gap-lg py-md"
            >
              <Icon name="travel-pinmap" size={20} color={colors.text.subtle} />
              <Text className="font-sans text-md font-medium text-fg-subtle">{city.label}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  </HotelModalSheet>
);
