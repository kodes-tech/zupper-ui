import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from '../../atoms/Icon';

export type FareSummaryRow = {
  /** Rótulo da linha (ex.: "Tarifa por adulto"). */
  label: string;
  /** Valor já formatado (ex.: "R$ 1.963,27"). */
  value: string;
  /** Destaca a linha (ex.: "TOTAL A PAGAR"). */
  bold?: boolean;
  /** Divisória logo abaixo da linha. */
  withDivider?: boolean;
};

export type FareSummaryProps = {
  /** Título da seção (ex.: "Melhor preço", "Sua compra"). Omitido = sem cabeçalho. */
  title?: string;
  /** Selo de estrela ao lado do título (voo com melhor preço do grupo). */
  showBadge?: boolean;
  rows: FareSummaryRow[];
};

/**
 * FareSummary — tabela de composição de preço (tarifa, taxas, total). Extraído
 * do PriceSummary do zupper-app (libs/app-ui/organisms/priceSummary): título
 * com estrela opcional (melhor preço do grupo) + linhas rótulo/valor com
 * divisórias.
 */
export const FareSummary = ({ title, showBadge = false, rows }: FareSummaryProps): React.ReactElement => (
  <View className="gap-md">
    {title ? (
      <View className="flex-row items-center gap-xs">
        {showBadge ? <Icon name="star" size={16} /> : null}
        <Text className="font-sans text-lg font-bold text-fg-subtle">{title}</Text>
      </View>
    ) : null}

    <View className="gap-sm">
      {rows.map((row, index) => (
        <React.Fragment key={`${row.label}-${index}`}>
          <View className="flex-row items-center justify-between">
            <Text className={`font-sans text-md text-fg-subtle ${row.bold ? 'font-bold' : 'font-normal'}`}>
              {row.label}
            </Text>
            <Text className={`font-sans text-xs text-fg-subtle ${row.bold ? 'font-bold' : 'font-normal'}`}>
              {row.value}
            </Text>
          </View>
          {row.withDivider ? <View className="h-[2px] w-full bg-border-default" /> : null}
        </React.Fragment>
      ))}
    </View>
  </View>
);
