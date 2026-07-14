import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '../../atoms/Icon';
import { FareFamilyCard } from '../FareFamilyCard';
import type { FareFamilyBenefit } from '../FareFamilyCard';

export type FareFamily = {
  id: string;
  /** Nome da família (ex.: "LIGHT", "STANDARD"). */
  title: string;
  /** Preço já formatado — valor cheio se selecionada, ou diferença se não. */
  price: string;
  /** Cor da faixa de topo (dado por companhia/família, não é token). */
  headerColor: string;
  benefits: FareFamilyBenefit[];
};

export type FareFamilySelectionProps = {
  families: FareFamily[];
  selectedFamilyId?: string;
  onSelectFamily?: (id: string) => void;
  /** "Ver tarifa" — abre o comparador completo de famílias. */
  onPressDetails?: () => void;
};

/**
 * FareFamilySelection — grade de famílias tarifárias (LIGHT/STANDARD/FULL/…)
 * do voo selecionado, com o link "Ver tarifa" pro comparador completo.
 * Extraído do AerialFareSelection do zupper-app (libs/aerial/base-fare).
 */
export const FareFamilySelection = ({
  families,
  selectedFamilyId,
  onSelectFamily,
  onPressDetails,
}: FareFamilySelectionProps): React.ReactElement => (
  <View className="gap-md">
    <View className="flex-row items-center justify-between">
      <Text className="font-sans text-lg font-bold text-fg-secondary">Tarifa</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Ver tarifa"
        onPress={onPressDetails}
        className="flex-row items-center gap-xxs"
      >
        <Text className="font-sans text-xs font-medium text-fg-link">Ver tarifa</Text>
        <Icon name="chevron-right" size={12} />
      </Pressable>
    </View>

    <View className="flex-row flex-wrap justify-between gap-y-md">
      {families.map((family) => (
        <FareFamilyCard
          key={family.id}
          title={family.title}
          price={family.price}
          headerColor={family.headerColor}
          benefits={family.benefits}
          selected={family.id === selectedFamilyId}
          onSelect={() => onSelectFamily?.(family.id)}
        />
      ))}
    </View>
  </View>
);
