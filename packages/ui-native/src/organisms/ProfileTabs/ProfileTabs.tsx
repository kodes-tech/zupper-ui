import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '../../atoms/Icon';
import type { IconName } from '../../atoms/Icon';

export type ProfileTab = 'ver-tudo' | 'dicas' | 'fotos' | 'roteiros';

export type ProfileTabsProps = {
  active: ProfileTab;
  /**
   * Abas exibidas, na ordem. Padrão: Dicas/Fotos/Roteiros (perfil da comunidade).
   * "Detalhes do destino" passa as quatro, começando por "Ver tudo".
   */
  tabs?: ProfileTab[];
  onChange?: (tab: ProfileTab) => void;
};

const LABELS: Record<ProfileTab, string> = {
  'ver-tudo': 'Ver tudo',
  dicas: 'Dicas',
  fotos: 'Fotos',
  roteiros: 'Roteiros',
};

const DEFAULT_TABS: ProfileTab[] = ['dicas', 'fotos', 'roteiros'];

/**
 * ProfileTabs — seletor de abas com ícone por estado e sublinhado no ativo.
 * Usado no perfil da comunidade (Dicas/Fotos/Roteiros) e em "Detalhes do
 * destino", que acrescenta "Ver tudo" (só texto, sem ícone — confirmado no Figma).
 */
export const ProfileTabs = ({
  active,
  tabs = DEFAULT_TABS,
  onChange,
}: ProfileTabsProps): React.ReactElement => (
  <View className="flex-row gap-xs border-t border-border-default">
    {tabs.map((tab) => {
      const isActive = tab === active;
      const iconName =
        tab === 'ver-tudo'
          ? null
          : (`tab-${tab}-${isActive ? 'active' : 'inactive'}` as IconName);
      return (
        <Pressable
          key={tab}
          accessibilityRole="tab"
          accessibilityState={{ selected: isActive }}
          onPress={() => onChange?.(tab)}
          className="h-[48px] flex-1 items-center justify-end gap-md"
        >
          <View className="flex-row items-center gap-xs">
            {iconName ? <Icon name={iconName} size={16} /> : null}
            <Text
              className={`font-sans text-[14px] ${
                isActive ? 'font-bold text-brand-strong' : 'font-normal text-fg-muted'
              }`}
            >
              {LABELS[tab]}
            </Text>
          </View>
          <View className={`h-[2px] w-full ${isActive ? 'bg-brand-strong' : ''}`} />
        </Pressable>
      );
    })}
  </View>
);
