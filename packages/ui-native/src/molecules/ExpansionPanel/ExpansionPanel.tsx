import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';

export type ExpansionPanelProps = {
  /** Título da seção (ex.: "Comodidades"). */
  title: string;
  /** Seção aberta ou não — controlada pelo consumidor. */
  expanded?: boolean;
  onToggle?: () => void;
  children: React.ReactNode;
};

/**
 * ExpansionPanel — seção colapsável (título em negrito + chevron) usada nos
 * filtros. O conteúdo só aparece quando `expanded`. Apresentacional: o estado
 * de aberto/fechado vem por prop. Reproduz o ExpansionPanel do zupper-app.
 */
export const ExpansionPanel = ({
  title,
  expanded = false,
  onToggle,
  children,
}: ExpansionPanelProps): React.ReactElement => (
  <View className="gap-md py-lg">
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ expanded }}
      accessibilityLabel={title}
      onPress={onToggle}
      className="flex-row items-center justify-between"
    >
      <Text className="font-sans text-lg font-bold text-fg-secondary">{title}</Text>
      <Icon
        name="dropdown-arrow"
        size={20}
        color={colors.text.subtle}
        style={{ transform: [{ rotate: expanded ? '-90deg' : '90deg' }] }}
      />
    </Pressable>
    {expanded ? children : null}
  </View>
);
