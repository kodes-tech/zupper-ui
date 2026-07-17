import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '@kodes-tech/icons';
import type { IconName } from '@kodes-tech/icons';

export type BottomNavKey = 'inicio' | 'reservar' | 'pedidos' | 'conta';

export type BottomNavProps = {
  /** Item ativo; omitido = nenhum destacado (ex.: telas fora das tabs). */
  active?: BottomNavKey;
  onNavigate?: (key: BottomNavKey) => void;
};

const items: { key: BottomNavKey; icon: IconName; label: string }[] = [
  { key: 'inicio', icon: 'nav-inicio', label: 'Início' },
  { key: 'reservar', icon: 'nav-reservar', label: 'Reservar' },
  { key: 'pedidos', icon: 'nav-pedidos', label: 'Pedidos' },
  { key: 'conta', icon: 'nav-conta', label: 'Conta' },
];

/**
 * BottomNav — barra inferior (Início/Reservar/Pedidos/Conta). O item ativo fica
 * com o label em destaque; os ícones de Início e Conta trocam entre ativo (marca)
 * e neutro.
 */
export const BottomNav = ({ active, onNavigate }: BottomNavProps): React.ReactElement => (
  <View className="w-full flex-row gap-md bg-surface-default px-screenMargin py-xl">
    {items.map((item) => {
      const isActive = item.key === active;
      const iconName: IconName =
        item.key === 'inicio'
          ? isActive
            ? 'nav-inicio'
            : 'nav-inicio-neutral'
          : item.key === 'conta'
            ? isActive
              ? 'nav-conta-active'
              : 'nav-conta'
            : item.icon;
      return (
        <Pressable
          key={item.key}
          accessibilityRole="button"
          accessibilityState={{ selected: isActive }}
          onPress={() => onNavigate?.(item.key)}
          className="flex-1 items-center gap-md"
        >
          <Icon name={iconName} size={24} />
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
