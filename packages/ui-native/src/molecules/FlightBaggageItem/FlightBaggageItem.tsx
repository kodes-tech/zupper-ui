import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';
import type { IconName } from '../../atoms/Icon';

export type FlightBaggageItemProps = {
  icon: IconName;
  /** Título do item (ex.: "Inclui bagagem de mão"). Muda conforme `included`. */
  title: string;
  /** Descrição de apoio (ex.: "Tamanho limitado a caber..."). Muda conforme `included`. */
  subtitle: string;
  /** Incluído na tarifa — colore o ícone na cor da marca; não incluído usa cinza neutro. */
  included?: boolean;
};

/**
 * FlightBaggageItem — item da seção "Bagagem" dos detalhes do voo: ícone +
 * título + descrição, coloridos conforme incluído/não incluído na tarifa.
 * Extraído do FlightBaggageSection (libs/aerial/flights) do zupper-app.
 */
export const FlightBaggageItem = ({
  icon,
  title,
  subtitle,
  included = false,
}: FlightBaggageItemProps): React.ReactElement => (
  <View className="gap-xs">
    <View className="flex-row items-center gap-sm">
      <Icon name={icon} size={24} color={included ? colors.brand.zupper : colors.border.default} />
      <Text className="font-sans text-md font-medium text-fg-secondary">{title}</Text>
    </View>
    <Text className="pl-[36px] font-sans text-md font-medium text-fg-subtle">{subtitle}</Text>
  </View>
);
