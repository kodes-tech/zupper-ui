import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { iconSize } from '@kodes-tech/tokens';
import { Icon } from '@kodes-tech/icons';
import type { IconName } from '@kodes-tech/icons';

export type BottomNavItem = {
  /** Identificador do item, retornado no `onNavigate`. */
  key: string;
  label: string;
  /** Ícone no estado inativo (ou único, se não houver `activeIcon`). */
  icon: IconName;
  /** Ícone quando o item está ativo; default = `icon`. */
  activeIcon?: IconName;
};

export type BottomNavProps = {
  /** Itens da barra — **até 5**. Cada item define sua key/label/ícone(s). */
  items: BottomNavItem[];
  /** Key do item ativo; omitido = nenhum destacado (ex.: telas fora das tabs). */
  active?: string;
  onNavigate?: (key: string) => void;
};

/**
 * BottomNav — barra de navegação inferior **genérica**: recebe os itens por prop
 * (até 5). O item ativo fica com o label em destaque e usa `activeIcon` (se dado).
 * Primitivo agnóstico: não conhece as abas de nenhum produto — quem define as abas
 * é o app consumidor.
 */
export const BottomNav = ({ items, active, onNavigate }: BottomNavProps): React.ReactElement => (
  <View className="w-full flex-row gap-md bg-surface-default px-screenMargin py-xl">
    {items.map((item) => {
      const isActive = item.key === active;
      const iconName: IconName = isActive ? (item.activeIcon ?? item.icon) : item.icon;
      return (
        <Pressable
          key={item.key}
          accessibilityRole="button"
          accessibilityState={{ selected: isActive }}
          onPress={() => onNavigate?.(item.key)}
          className="flex-1 items-center gap-md"
        >
          <Icon name={iconName} size={iconSize.lg} />
          <Text
            className={`font-sans text-xs ${
              isActive ? 'font-bold text-brand-strong' : 'font-medium text-fg-primary'
            }`}
          >
            {item.label}
          </Text>
        </Pressable>
      );
    })}
  </View>
);
