import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';
import type { IconName } from '../../atoms/Icon';

export type SupportItem = {
  id: string;
  icon: IconName;
  title: string;
  description?: string;
  /** Rótulo da ação (ex.: "Acessar"). */
  actionLabel: string;
};

export type SupportSectionProps = {
  title?: string;
  items: SupportItem[];
  onPressItem?: (id: string) => void;
};

/**
 * SupportSection — seção "Atendimento Zupper" da Home: título, o separador de
 * duas linhas e a lista de canais de atendimento (ícone em quadro arredondado,
 * título/descrição e a ação "Acessar ›"). Apresentacional: itens e ações por
 * props. Extraído de ActionList (libs/app-ui) + Home do zupper-app.
 */
export const SupportSection = ({
  title = 'Atendimento Zupper',
  items,
  onPressItem,
}: SupportSectionProps): React.ReactElement => (
  <View className="pb-xxxl">
    <Text className="px-screenMargin font-sans text-xl font-bold leading-[28px] text-fg-secondary">
      {title}
    </Text>
    {/* Separador de duas linhas (DividerContainer da Home): 90% de largura, centralizado. */}
    <View className="mt-xs w-full items-center gap-lg">
      <View className="w-[90%] border-b border-border-subtle" />
      <View className="w-[90%] border-b border-border-subtle" />
    </View>
    <View className="mt-xl gap-xl px-screenMargin">
      {items.map((item) => (
        <Pressable
          key={item.id}
          accessibilityRole="button"
          accessibilityLabel={`${item.actionLabel} ${item.title}`}
          onPress={() => onPressItem?.(item.id)}
          className="flex-row items-center justify-between border-b border-surface-tag pb-xl"
        >
          <View className="flex-row items-center gap-xl">
            <View className="h-[53px] w-[53px] items-center justify-center rounded-lg border-2 border-border-subtle bg-surface-default">
              <Icon name={item.icon} size={34} color={colors.text.body} />
            </View>
            <View className="gap-xxs">
              <Text className="font-sans text-lg font-bold text-fg-secondary">{item.title}</Text>
              {item.description ? (
                <Text className="font-sans text-xs font-medium text-fg-subtle">
                  {item.description}
                </Text>
              ) : null}
            </View>
          </View>
          <View className="flex-row items-center gap-xs">
            <Text className="font-sans text-xs font-medium text-brand-zupper">
              {item.actionLabel}
            </Text>
            <Icon name="travel-chevron-right" size={14} color={colors.brand.zupper} />
          </View>
        </Pressable>
      ))}
    </View>
  </View>
);
