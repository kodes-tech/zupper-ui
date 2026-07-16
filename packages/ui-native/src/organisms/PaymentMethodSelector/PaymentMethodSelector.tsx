import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';
import type { IconName } from '../../atoms/Icon';

export type PaymentMethod = 'creditCard' | 'pix';

export type PaymentMethodSelectorProps = {
  selected?: PaymentMethod;
  onChange?: (method: PaymentMethod) => void;
  error?: string;
};

const OPTIONS: { key: PaymentMethod; label: string; icon: IconName }[] = [
  { key: 'creditCard', label: 'Cartão de Crédito', icon: 'card' },
  { key: 'pix', label: 'PIX', icon: 'pix' },
];

/**
 * PaymentMethodSelector — escolha entre Cartão de Crédito e PIX. Extraído do
 * Button `variant="pay"` do zupper-app (libs/app-ui/molecules/button): card
 * clicável com ícone + rótulo, borda na cor da marca quando selecionado e
 * selo de check no canto (o rótulo não muda de cor — só a borda).
 */
export const PaymentMethodSelector = ({
  selected,
  onChange,
  error,
}: PaymentMethodSelectorProps): React.ReactElement => (
  <View className="gap-xs">
    <View className="flex-row gap-lg">
      {OPTIONS.map((option) => {
        const isSelected = option.key === selected;
        return (
          <Pressable
            key={option.key}
            accessibilityRole="radio"
            accessibilityState={{ selected: isSelected }}
            accessibilityLabel={option.label}
            onPress={() => onChange?.(option.key)}
            className={`min-h-[86px] flex-1 items-center justify-center gap-sm rounded-sm border p-md ${
              isSelected ? 'border-brand-strong' : 'border-border-default'
            }`}
          >
            {isSelected ? (
              <View className="absolute -right-xs -top-xs">
                <Icon name="check-circle" size={16} color={colors.brand.strong} />
              </View>
            ) : null}
            <Icon name={option.icon} size={28} color={colors.brand.strong} />
            <Text className="font-sans text-md font-medium text-fg-subtle">{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
    {error ? <Text className="self-end font-sans text-inputError text-feedback-danger">{error}</Text> : null}
  </View>
);
