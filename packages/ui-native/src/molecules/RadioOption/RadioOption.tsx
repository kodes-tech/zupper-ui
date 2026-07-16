import React from 'react';
import { Pressable, Text, View } from 'react-native';

export type RadioOptionProps = {
  label: string;
  selected?: boolean;
  disabled?: boolean;
  onPress?: () => void;
};

/**
 * RadioOption — opção de seleção única (rótulo + círculo), ex.: "Celular" /
 * "Telefone" no Checkout. Extraído do RadioButton do zupper-app
 * (libs/app-ui/molecules/radioButton): anel + ponto na cor da marca quando
 * marcado, só anel cinza quando não.
 */
export const RadioOption = ({
  label,
  selected = false,
  disabled = false,
  onPress,
}: RadioOptionProps): React.ReactElement => (
  <Pressable
    accessibilityRole="radio"
    accessibilityState={{ selected, disabled }}
    accessibilityLabel={label}
    disabled={disabled}
    onPress={onPress}
    className="flex-row items-center gap-sm"
  >
    <View
      className={`h-[20px] w-[20px] items-center justify-center rounded-pill border ${
        selected ? 'border-brand-strong' : 'border-border-default'
      }`}
    >
      {selected ? <View className="h-[12px] w-[12px] rounded-pill bg-brand-strong" /> : null}
    </View>
    <Text className={`font-sans text-md text-fg-subtle ${selected ? 'font-bold' : 'font-normal'}`}>
      {label}
    </Text>
  </Pressable>
);
