import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';

export type FareFamilyBenefit = {
  /** Rótulo do benefício (ex.: "Bagagem", "Bagagem (01 peça)", "Reembolso Integral"). */
  label: string;
  included: boolean;
};

export type FareFamilyCardProps = {
  /** Nome da família (ex.: "LIGHT", "STANDARD"). Exibido em maiúsculas. */
  title: string;
  /** Preço já formatado — valor cheio se selecionada, ou diferença ("+ R$ 200,95") se não. */
  price: string;
  /**
   * Cor da faixa de topo. Vem dos dados (por companhia/família — ex.: a API do
   * zupper-app manda `familyColor`), não é um token do design system: cada
   * companhia tem sua própria paleta de famílias tarifárias.
   */
  headerColor: string;
  benefits: FareFamilyBenefit[];
  selected?: boolean;
  onSelect?: () => void;
};

/** Botão "Selecionar" / "Selecionado" — preenche com `headerColor` quando selecionado. */
const SelectFareButton = ({
  selected,
  headerColor,
  onPress,
}: {
  selected: boolean;
  headerColor: string;
  onPress?: () => void;
}) => (
  <Pressable
    accessibilityRole="button"
    accessibilityLabel={selected ? 'Selecionado' : 'Selecionar'}
    accessibilityState={{ selected }}
    onPress={onPress}
    style={selected ? { backgroundColor: headerColor, borderColor: headerColor } : undefined}
    className={`h-[32px] flex-row items-center justify-center gap-xxs rounded-sm border ${
      selected ? 'border-transparent' : 'border-border-default'
    }`}
  >
    {selected ? <Icon name="check-circle" size={14} color={colors.text.inverse} /> : null}
    <Text className={`font-sans text-xs font-medium ${selected ? 'text-fg-inverse' : 'text-fg-subtle'}`}>
      {selected ? 'Selecionado' : 'Selecionar'}
    </Text>
  </Pressable>
);

/**
 * FareFamilyCard — card de família tarifária (LIGHT/STANDARD/FULL/…): faixa de
 * topo na cor da família, preço, lista de benefícios (check verde / x
 * vermelho) e botão de seleção. Extraído do AerialFareCard do zupper-app
 * (libs/aerial/base-fare). `headerColor` é dado (cor por companhia/família),
 * por isso vai via `style`, não `className`.
 */
export const FareFamilyCard = ({
  title,
  price,
  headerColor,
  benefits,
  selected = false,
  onSelect,
}: FareFamilyCardProps): React.ReactElement => (
  <View className="w-[48%] min-w-[160px]">
    <View style={{ backgroundColor: headerColor }} className="h-[40px] items-center justify-center rounded-t-md px-md">
      <Text className="font-sans text-xs font-medium text-fg-inverse">{title.toLocaleUpperCase()}</Text>
    </View>

    <View
      style={selected ? { borderColor: headerColor } : undefined}
      className={`gap-sm rounded-b-md border-2 p-md ${selected ? '' : 'border-border-default'}`}
    >
      <View className="items-center border-b border-border-default pb-sm">
        <Text className="font-sans text-md font-bold text-fg-secondary">{price}</Text>
      </View>

      <View className="gap-xs">
        {benefits.map((benefit, index) => (
          <View key={`${benefit.label}-${index}`} className="flex-row items-center gap-xs">
            <Icon
              testID={`benefit-icon-${index}`}
              name={benefit.included ? 'check-circle' : 'close-circle'}
              size={16}
              color={benefit.included ? colors.feedback.success : colors.feedback.danger}
            />
            <Text className="font-sans text-xs font-medium text-fg-body">{benefit.label}</Text>
          </View>
        ))}
      </View>

      <SelectFareButton selected={selected} headerColor={headerColor} onPress={onSelect} />
    </View>
  </View>
);
