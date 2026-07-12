import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '../../atoms/Icon';
import type { IconName } from '../../atoms/Icon';

export type ProfileTab = 'dicas' | 'fotos' | 'roteiros';

export type ProfileTabsProps = {
  active: ProfileTab;
  onChange?: (tab: ProfileTab) => void;
};

const tabs: { key: ProfileTab; label: string }[] = [
  { key: 'dicas', label: 'Dicas' },
  { key: 'fotos', label: 'Fotos' },
  { key: 'roteiros', label: 'Roteiros' },
];

/**
 * ProfileTabs — seletor de abas do perfil da comunidade (Dicas/Fotos/Roteiros),
 * com ícone por estado e sublinhado no ativo.
 */
export const ProfileTabs = ({ active, onChange }: ProfileTabsProps): React.ReactElement => (
  <View className="flex-row gap-xs border-t border-border-default">
    {tabs.map((tab) => {
      const isActive = tab.key === active;
      const iconName = `tab-${tab.key}-${isActive ? 'active' : 'inactive'}` as IconName;
      return (
        <Pressable
          key={tab.key}
          accessibilityRole="tab"
          accessibilityState={{ selected: isActive }}
          onPress={() => onChange?.(tab.key)}
          className="h-[48px] flex-1 items-center justify-end gap-md"
        >
          <View className="flex-row items-center gap-xs">
            <Icon name={iconName} size={16} />
            <Text
              className={`font-sans text-[14px] ${
                isActive ? 'font-bold text-brand-strong' : 'font-normal text-fg-muted'
              }`}
            >
              {tab.label}
            </Text>
          </View>
          <View className={`h-[2px] w-full ${isActive ? 'bg-brand-strong' : ''}`} />
        </Pressable>
      );
    })}
  </View>
);
