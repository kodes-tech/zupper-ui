import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';
import { HotelSearchSummary } from '../../molecules/HotelSearchSummary';
import { HotelCard } from '../../organisms/HotelCard';
import type { HotelCardData } from '../../organisms/HotelCard';

export type HotelSortKey = 'recomendados' | 'barato';

export type HotelResultsProps = {
  destination: string;
  /** Linha de datas + hóspedes do resumo. */
  searchDetails: string;
  /** Total de resultados (ex.: 128). */
  totalResults: number;
  hotels: HotelCardData[];
  sort?: HotelSortKey;
  onBack?: () => void;
  onEditSearch?: () => void;
  onOpenFilters?: () => void;
  onChangeSort?: (sort: HotelSortKey) => void;
  onSelectHotel?: (index: number) => void;
  onSeeMap?: (index: number) => void;
};

const SORTS: { key: HotelSortKey; label: string }[] = [
  { key: 'recomendados', label: 'Mais recomendados' },
  { key: 'barato', label: 'Mais barato' },
];

/**
 * HotelResults — lista de resultados de hotéis: topo com resumo da busca, barra
 * de filtro/ordenação e a lista de HotelCard. Apresentacional: hotéis e ações
 * vêm por props. Reproduz HotelResultScreen + HotelResultHeader do zupper-app.
 */
export const HotelResults = ({
  destination,
  searchDetails,
  totalResults,
  hotels,
  sort = 'recomendados',
  onBack,
  onEditSearch,
  onOpenFilters,
  onChangeSort,
  onSelectHotel,
  onSeeMap,
}: HotelResultsProps): React.ReactElement => (
  <View className="flex-1 bg-surface-tag">
    {/* Cabeçalho: voltar + resumo + ordenação */}
    <View className="bg-surface-default pb-xl pt-[40px]">
      <View className="flex-row items-start justify-between px-xxl">
        <Pressable accessibilityRole="button" accessibilityLabel="Voltar" onPress={onBack}>
          <Icon name="back-arrow" size={24} />
        </Pressable>
        <View className="flex-1">
          <HotelSearchSummary destination={destination} details={searchDetails} onEdit={onEditSearch} />
        </View>
        <View className="h-[24px] w-[24px]" />
      </View>

      <View className="flex-row items-center gap-md border-b-4 border-border-subtle px-xxl pb-lg">
        <Pressable
          accessibilityRole="button"
          onPress={onOpenFilters}
          className="flex-row items-center gap-xs rounded-sm border border-border-default px-md py-xs"
        >
          <Icon name="hotel-filter" size={20} color={colors.text.subtle} />
          <Text className="font-sans text-xs font-medium text-fg-subtle">Filtrar</Text>
        </Pressable>
        {SORTS.map((option) => {
          const active = option.key === sort;
          return (
            <Pressable
              key={option.key}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              onPress={() => onChangeSort?.(option.key)}
              className={`flex-row items-center rounded-sm border px-lg py-md ${
                active ? 'border-brand-strong' : 'border-border-default'
              }`}
            >
              <Text
                className={`font-sans text-xs font-medium ${
                  active ? 'text-brand-strong' : 'text-fg-subtle'
                }`}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>

    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="px-xxl py-lg">
        <Text className="font-sans text-md text-fg-subtle">
          {totalResults} {totalResults === 1 ? 'resultado encontrado' : 'resultados encontrados'}
        </Text>
      </View>
      <View className="px-xxl">
        {hotels.map((hotel, index) => (
          <HotelCard
            key={`${hotel.name}-${index}`}
            hotel={hotel}
            onSeeOffer={() => onSelectHotel?.(index)}
            onSeeMap={() => onSeeMap?.(index)}
          />
        ))}
      </View>
    </ScrollView>
  </View>
);
