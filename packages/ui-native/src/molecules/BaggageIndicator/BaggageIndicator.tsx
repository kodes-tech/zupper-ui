import React from 'react';
import { View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';

export type BaggageIndicatorProps = {
  /** Item pessoal (mochila) incluído na tarifa. Padrão: incluído. */
  personalItem?: boolean;
  /** Bagagem despachada incluída na tarifa. Padrão: não incluído. */
  checkedBaggage?: boolean;
  /** Bagagem de mão incluída na tarifa. Padrão: incluído. */
  carryOn?: boolean;
};

/**
 * BaggageIndicator — franquia de bagagem do voo (item pessoal / despachada /
 * mão): cada ícone fica na cor da marca quando incluído, ou neutro quando não.
 * Extraído do FlightBaggageSummary do zupper-app (libs/aerial/flights) — mesma
 * ordem (pessoal, despachada, mão) e mesmo par de cores (incluído/excluído).
 */
export const BaggageIndicator = ({
  personalItem = true,
  checkedBaggage = false,
  carryOn = true,
}: BaggageIndicatorProps): React.ReactElement => {
  const included = colors.brand.zupper;
  const excluded = colors.border.default;

  return (
    <View accessibilityLabel="Franquia de bagagem" className="flex-row items-center gap-sm">
      <Icon testID="baggage-personal" name="baggage-personal" size={20} color={personalItem ? included : excluded} />
      <Icon testID="baggage-checked" name="baggage-checked" size={20} color={checkedBaggage ? included : excluded} />
      <Icon testID="baggage-carryon" name="baggage-carryon" size={20} color={carryOn ? included : excluded} />
    </View>
  );
};
