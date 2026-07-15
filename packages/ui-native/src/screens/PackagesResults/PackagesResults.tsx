import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';
import { PackageResultCard } from '../../organisms/PackageResultCard';
import type { PackageResultCardData } from '../../organisms/PackageResultCard';

export type PackagesResultsSort = 'baratos' | 'recomendados';

export type PackagesResultsProps = {
  /** Ex.: "FLN - CGH". */
  routeLabel: string;
  /** Ex.: "Florianópolis, SC - São Paulo, SP". */
  routeDetails: string;
  /** Ex.: "24 de Maio - 26 de Maio - 1 viajante". */
  searchSummary: string;
  totalResults: number;
  /** Card "Melhor pacote encontrado", com selo e os dois CTAs. */
  featured: PackageResultCardData;
  /** Demais pacotes, um CTA cada. */
  others: PackageResultCardData[];
  sort?: PackagesResultsSort;
  onBack?: () => void;
  onEditSearch?: () => void;
  onShare?: () => void;
  onOpenFilters?: () => void;
  onChangeSort?: (sort: PackagesResultsSort) => void;
  onSelectFeatured?: () => void;
  onCustomizeFeatured?: () => void;
  onSelectPackage?: (index: number) => void;
};

const SORTS: { key: PackagesResultsSort; label: string }[] = [
  { key: 'baratos', label: 'Pacotes mais baratos' },
  { key: 'recomendados', label: 'Recomendados' },
];

/**
 * PackagesResults — resultados de busca de pacotes: cabeçalho com a rota e o
 * resumo da busca, barra de filtro/ordenação, o pacote em destaque ("Melhor
 * pacote encontrado") e os demais pacotes selecionados. Apresentacional:
 * pacotes e ações vêm por props. Reproduz Pacotes - Resultados de busca do
 * Figma.
 */
export const PackagesResults = ({
  routeLabel,
  routeDetails,
  searchSummary,
  totalResults,
  featured,
  others,
  sort = 'baratos',
  onBack,
  onEditSearch,
  onShare,
  onOpenFilters,
  onChangeSort,
  onSelectFeatured,
  onCustomizeFeatured,
  onSelectPackage,
}: PackagesResultsProps): React.ReactElement => (
  <View className="flex-1 bg-surface-tag">
    <View className="bg-surface-default pb-xl pt-[40px]">
      <View className="h-[76px] flex-row items-start justify-between px-xxl">
        <Pressable accessibilityRole="button" accessibilityLabel="Voltar" onPress={onBack}>
          <Icon name="back-arrow" size={24} />
        </Pressable>
        <View className="flex-1 items-center gap-xxs">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Editar busca"
            onPress={onEditSearch}
            className="flex-row items-center gap-xs"
          >
            <Text className="font-sans text-lg font-bold text-fg-secondary">{routeLabel}</Text>
            <Icon name="edit" size={24} color={colors.text.subtle} />
          </Pressable>
          <Text className="text-center font-sans text-xs font-medium text-fg-subtle">{routeDetails}</Text>
          <Text className="text-center font-sans text-xs font-medium text-fg-subtle">{searchSummary}</Text>
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel="Compartilhar" onPress={onShare}>
          <Icon name="social-share" size={24} color={colors.text.subtle} />
        </Pressable>
      </View>

      <View className="flex-row items-center gap-md border-b-4 border-border-subtle px-xxl pb-lg pt-lg">
        <Pressable
          accessibilityRole="button"
          onPress={onOpenFilters}
          className="flex-row items-center gap-xs rounded-sm border border-border-default px-md py-xs"
        >
          <Icon name="hotel-filter" size={20} color={colors.text.subtle} />
          <Text className="font-sans text-xs font-medium text-fg-subtle">Filtrar voos</Text>
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
          {totalResults} {totalResults === 1 ? 'pacote encontrado' : 'pacotes encontrados'}
        </Text>
      </View>

      <View className="gap-lg px-xxl">
        <Text className="font-sans text-lg font-bold text-fg-secondary">Melhor pacote encontrado</Text>
        <PackageResultCard
          featured
          data={featured}
          onPressPrimary={onSelectFeatured}
          onPressSecondary={onCustomizeFeatured}
        />
      </View>

      {others.length ? (
        <View className="gap-lg px-xxl pt-[20px]">
          <Text className="font-sans text-lg font-bold text-fg-secondary">
            Confira outros pacotes selecionados
          </Text>
          <View className="gap-lg">
            {others.map((data, index) => (
              <PackageResultCard key={index} data={data} onPressPrimary={() => onSelectPackage?.(index)} />
            ))}
          </View>
        </View>
      ) : null}
    </ScrollView>
  </View>
);
