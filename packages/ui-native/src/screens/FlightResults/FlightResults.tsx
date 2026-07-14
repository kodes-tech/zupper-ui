import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Icon } from '../../atoms/Icon';
import { FilterChip } from '../../atoms/FilterChip';
import { FlightCard } from '../../organisms/FlightCard';
import type { FlightCardProps } from '../../organisms/FlightCard';
import { FareFamilySelection } from '../../organisms/FareFamilySelection';
import type { FareFamily } from '../../organisms/FareFamilySelection';
import { FareSummary } from '../../organisms/FareSummary';
import type { FareSummaryRow } from '../../organisms/FareSummary';

export type FlightSortFilter = 'cheapest' | 'fastest';

export type FlightResultsProps = {
  originCode: string;
  destinationCode: string;
  /** Cidade + estado de origem (ex.: "Sao Paulo, SP"). */
  originLabel: string;
  /** Cidade + estado de destino (ex.: "Recife, PE"). */
  destinationLabel: string;
  /** Período já formatado (ex.: "15 de julho - 28 de julho"). */
  period: string;
  /** Resumo de viajantes (ex.: "1 Viajante"). */
  travelers: string;
  resultsCount: number;
  sortFilter?: FlightSortFilter;
  /** Data do voo de ida já formatada (ex.: "Qua, 15 De Julho 2026"). */
  outboundDate: string;
  outboundFlight: FlightCardProps;
  /** Data do voo de volta já formatada. Omitida = viagem só ida. */
  returnDate?: string;
  returnFlight?: FlightCardProps;
  /** Famílias tarifárias do voo selecionado (LIGHT/STANDARD/FULL/…). Omitida = sem seção de tarifa. */
  fareFamilies?: FareFamily[];
  selectedFareFamilyId?: string;
  onSelectFareFamily?: (id: string) => void;
  /** "Ver tarifa" — abre o comparador completo de famílias. */
  onPressFareDetails?: () => void;
  /** Título da composição de preço (ex.: "Melhor preço", "Sua compra"). */
  fareTitle?: string;
  /** Selo de estrela no título (voo com melhor preço do grupo). */
  showBestPriceBadge?: boolean;
  fareRows: FareSummaryRow[];
  /** Rótulo de parcelamento no rodapé (ex.: "Em até 1x sem juros no cartão de crédito"). */
  installmentsLabel?: string;
  onBack?: () => void;
  onEdit?: () => void;
  onShare?: () => void;
  onOpenFilters?: () => void;
  onChangeSort?: (sort: FlightSortFilter) => void;
};

const resultsLabel = (count: number): string =>
  count === 1 ? '1 voo encontrado' : `${count} voos encontrados`;

/**
 * FlightResults — resultado de busca de voos: resumo da rota (com editar e
 * compartilhar), chips de ordenação, cards de ida/volta (FlightCard), a
 * grade de famílias tarifárias (FareFamilySelection) e a composição de preço
 * do voo selecionado (FareSummary). Extraído do AerialResultScreen do
 * zupper-app (apps/zupper-app + libs/aerial/results, libs/aerial/base-fare).
 *
 * Cobre só o que aparece no resultado com o melhor preço já selecionado —
 * o comparador completo de famílias ("Ver tarifa", em modal), a lista
 * completa de opções de voo e o botão "Comprar" ficam para as próximas telas.
 */
export const FlightResults = ({
  originCode,
  destinationCode,
  originLabel,
  destinationLabel,
  period,
  travelers,
  resultsCount,
  sortFilter = 'cheapest',
  outboundDate,
  outboundFlight,
  returnDate,
  returnFlight,
  fareFamilies,
  selectedFareFamilyId,
  onSelectFareFamily,
  onPressFareDetails,
  fareTitle,
  showBestPriceBadge = false,
  fareRows,
  installmentsLabel = 'Em até 1x sem juros no cartão de crédito',
  onBack,
  onEdit,
  onShare,
  onOpenFilters,
  onChangeSort,
}: FlightResultsProps): React.ReactElement => (
  <View className="flex-1 bg-surface-tag">
    <View className="gap-md bg-surface-default px-xl pb-lg pt-[40px]">
      <View className="w-full flex-row items-center justify-between">
        <Pressable accessibilityRole="button" accessibilityLabel="Voltar" onPress={onBack}>
          <Icon name="back-arrow" size={24} />
        </Pressable>
        <View className="flex-1 flex-row items-center justify-center gap-sm">
          <Text className="font-sans text-routeTitle text-fg-secondary">
            {originCode} - {destinationCode}
          </Text>
          <Pressable accessibilityRole="button" accessibilityLabel="Editar busca" onPress={onEdit}>
            <Icon name="edit" size={20} />
          </Pressable>
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel="Compartilhar" onPress={onShare}>
          <Icon name="social-share" size={20} />
        </Pressable>
      </View>

      <View className="items-center gap-xxs">
        <Text className="font-sans text-caption text-fg-subtle">
          {originLabel} - {destinationLabel}
        </Text>
        <Text className="font-sans text-caption text-fg-subtle">
          {period} - {travelers}
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-sm">
          <FilterChip
            label="Filtrar voos"
            icon={<Icon name="filter-sliders" size={16} />}
            onPress={onOpenFilters}
          />
          <FilterChip
            label="Voos mais baratos"
            selected={sortFilter === 'cheapest'}
            onPress={() => onChangeSort?.('cheapest')}
          />
          <FilterChip
            label="Voos mais rápidos"
            selected={sortFilter === 'fastest'}
            onPress={() => onChangeSort?.('fastest')}
          />
        </View>
      </ScrollView>
    </View>

    <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
      <View className="px-xl py-xs">
        <Text className="font-sans text-md text-fg-subtle">{resultsLabel(resultsCount)}</Text>
      </View>

      <View className="gap-lg px-xl py-lg">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-xs">
            <Icon name="flight-outbound" size={20} />
            <Text className="font-sans text-md font-bold text-fg-secondary">Voo de ida</Text>
          </View>
          <Text className="font-sans text-caption font-medium text-fg-secondary">{outboundDate}</Text>
        </View>
        <FlightCard {...outboundFlight} />

        {returnFlight && returnDate ? (
          <>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-xs">
                <Icon name="flight-return" size={20} />
                <Text className="font-sans text-md font-bold text-fg-secondary">Voo de volta</Text>
              </View>
              <Text className="font-sans text-caption font-medium text-fg-secondary">{returnDate}</Text>
            </View>
            <FlightCard {...returnFlight} />
          </>
        ) : null}
      </View>

      {fareFamilies && fareFamilies.length > 0 ? (
        <View className="bg-surface-default px-xl py-lg">
          <FareFamilySelection
            families={fareFamilies}
            selectedFamilyId={selectedFareFamilyId}
            onSelectFamily={onSelectFareFamily}
            onPressDetails={onPressFareDetails}
          />
        </View>
      ) : null}

      <View className="gap-lg bg-surface-default px-xl py-lg">
        <FareSummary title={fareTitle} showBadge={showBestPriceBadge} rows={fareRows} />

        <View className="flex-row items-center justify-center gap-xs rounded-pill bg-surface-tag px-lg py-sm">
          <Icon name="card" size={16} />
          <Text className="font-sans text-xs font-medium text-fg-subtle">{installmentsLabel}</Text>
        </View>
      </View>
    </ScrollView>
  </View>
);
