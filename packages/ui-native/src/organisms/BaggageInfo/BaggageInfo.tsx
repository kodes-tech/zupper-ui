import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';
import type { IconName } from '../../atoms/Icon';

export type BaggageItem = {
  icon: IconName;
  /** Título (ex.: "Inclui bagagem de mão"). */
  label: string;
  /** Descrição (ex.: "Tamanho limitado a caber no compartimento…"). */
  description: string;
  /** Incluído = ícone na cor da marca; não incluído = cinza. */
  included?: boolean;
};

export type BaggageInfoProps = {
  title?: string;
  items: BaggageItem[];
};

/**
 * BaggageInfo — bloco "Bagagem" do resumo do pacote: por item, ícone + título
 * e a descrição recuada, separados por divisórias. Itens incluídos usam o
 * ícone na cor da marca; não incluídos ficam cinza. Apresentacional.
 * Reproduz "Infos bagagem com descrição" do Figma.
 */
export const BaggageInfo = ({ title = 'Bagagem', items }: BaggageInfoProps): React.ReactElement => (
  <View className="gap-lg bg-surface-default px-xxl py-xl">
    <Text className="font-sans text-xl font-bold text-fg-secondary">{title}</Text>
    <View className="gap-lg">
      {items.map((item, index) => (
        <View key={item.label} className="gap-lg">
          <View className="gap-xxs">
            <View className="flex-row items-center gap-xs">
              <Icon
                name={item.icon}
                size={24}
                color={item.included === false ? colors.text.subtle : colors.brand.zupper}
              />
              <Text className="font-sans text-md font-medium text-fg-secondary">{item.label}</Text>
            </View>
            <Text className="pl-[28px] font-sans text-md font-medium text-fg-subtle">
              {item.description}
            </Text>
          </View>
          {index < items.length - 1 ? <View className="border-b border-border-subtle" /> : null}
        </View>
      ))}
    </View>
  </View>
);
