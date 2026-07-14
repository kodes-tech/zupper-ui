import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';

export type HotelPriceSummaryProps = {
  /** Ex.: "A partir de / preço para 10 noites + taxas". */
  label: string;
  /** Valor já formatado (ex.: "R$ 3.480"). */
  price: string;
  /** Nota extra ao lado do preço (ex.: "/ Média por quarto"), em combo. */
  note?: string;
  /** Nota de taxas com o ícone de check; padrão "Impostos e taxas inclusos". */
  taxesNote?: string;
};

/**
 * HotelPriceSummary — bloco de preço reutilizado no card de detalhes e no card
 * de quarto: rótulo, valor em destaque e a nota de taxas com ícone de check.
 * Extraído de HotelPriceDisplay do zupper-app.
 */
export const HotelPriceSummary = ({
  label,
  price,
  note,
  taxesNote = 'Impostos e taxas inclusos',
}: HotelPriceSummaryProps): React.ReactElement => (
  <View className="gap-xs">
    <Text className="font-sans text-xs font-medium text-fg-subtle">{label}</Text>
    <View className="flex-row items-center gap-xs">
      <Text className="font-sans text-xl font-bold text-fg-secondary">{price}</Text>
      {note ? <Text className="font-sans text-xs font-medium text-fg-subtle">{note}</Text> : null}
    </View>
    <View className="flex-row items-center gap-xs">
      <Icon name="hotel-circle-check" size={20} color={colors.feedback.success} />
      <Text className="font-sans text-xs font-medium text-fg-subtle">{taxesNote}</Text>
    </View>
  </View>
);
