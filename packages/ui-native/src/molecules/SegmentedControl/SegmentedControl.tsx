import React from 'react';
import { Pressable, Text, View } from 'react-native';

export type SegmentedControlOption = {
  key: string;
  label: string;
};

export type SegmentedControlProps = {
  options: SegmentedControlOption[];
  selectedKey: string;
  onChange?: (key: string) => void;
};

/**
 * SegmentedControl — alternância entre opções em formato de abas (ex.:
 * "Pessoa Física" / "Pessoa Jurídica" no Checkout). Extraído do Tab
 * (`onlyHeader`) do zupper-app (libs/app-ui/molecules/tab): indicador e
 * rótulo na cor da marca quando ativo, cinza quando inativo.
 */
export const SegmentedControl = ({
  options,
  selectedKey,
  onChange,
}: SegmentedControlProps): React.ReactElement => (
  <View accessibilityRole="tablist" className="flex-row">
    {options.map((option) => {
      const selected = option.key === selectedKey;
      return (
        <Pressable
          key={option.key}
          accessibilityRole="tab"
          accessibilityState={{ selected }}
          accessibilityLabel={option.label}
          onPress={() => onChange?.(option.key)}
          className={`flex-1 items-center border-b-2 py-md ${
            selected ? 'border-brand-zupper' : 'border-border-default'
          }`}
        >
          <Text
            className={`font-sans text-md ${
              selected ? 'font-bold text-brand-zupper' : 'font-medium text-fg-muted'
            }`}
          >
            {option.label}
          </Text>
        </Pressable>
      );
    })}
  </View>
);
