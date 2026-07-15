import React from 'react';
import { Text, View } from 'react-native';
import { Divider } from '../../atoms/Divider';

export type PurchaseSummaryItem = {
  /** Ex.: "Tarifa por adulto", "Taxas e impostos". */
  label: string;
  /** Valor já formatado (ex.: "R$ 654,51"). */
  value: string;
};

export type PurchaseSummaryCardProps = {
  items: PurchaseSummaryItem[];
  /** Rótulo do total; padrão "TOTAL A PAGAR". */
  totalLabel?: string;
  /** Total já formatado (ex.: "R$ 1.255,12"). */
  total: string;
};

/**
 * PurchaseSummaryCard — bloco "Sua compra": linhas de valor (tarifa, taxas,
 * pagar na hospedagem…) e o total destacado. Apresentacional: valores já
 * formatados vêm por props. Reproduz "Sua compra" do resumo do pacote (Figma).
 */
export const PurchaseSummaryCard = ({
  items,
  totalLabel = 'TOTAL A PAGAR',
  total,
}: PurchaseSummaryCardProps): React.ReactElement => (
  <View className="gap-lg bg-surface-default px-xxl py-xl">
    <Text className="font-sans text-xl font-bold text-fg-secondary">Sua compra</Text>
    <View className="gap-md">
      {items.map((item) => (
        <View key={item.label} className="flex-row items-center justify-between gap-md">
          <Text className="flex-1 font-sans text-md font-medium text-fg-secondary">{item.label}</Text>
          <Text className="font-sans text-md font-medium text-fg-secondary">{item.value}</Text>
        </View>
      ))}
    </View>
    <Divider />
    <View className="flex-row items-center justify-between gap-md">
      <Text className="font-sans text-md font-bold text-fg-secondary">{totalLabel}</Text>
      <Text className="font-sans text-lg font-bold text-fg-secondary">{total}</Text>
    </View>
  </View>
);
