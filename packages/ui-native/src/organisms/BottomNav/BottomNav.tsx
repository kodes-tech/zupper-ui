import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '../../atoms/Icon';
import type { IconName } from '../../atoms/Icon';

export type BottomNavKey = 'inicio' | 'reservar' | 'pedidos' | 'conta';

export type BottomNavProps = {
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
 * com o label em destaque (marca).
 */
export const BottomNav = ({ active = 'inicio', onNavigate }: BottomNavProps): React.ReactElement => (
  <View className="w-full flex-row gap-md bg-surface-default px-screenMargin py-xl">
    {items.map((item) => (
      <Pressable
        key={item.key}
        accessibilityRole="button"
        accessibilityState={{ selected: item.key === active }}
        onPress={() => onNavigate?.(item.key)}
        className="flex-1 items-center gap-md"
      >
        <Icon name={item.icon} size={24} />
        <Text
          className={`font-sans text-xs ${
            item.key === active ? 'font-bold text-brand-strong' : 'font-medium text-fg-primary'
          }`}
        >
          {item.label}
        </Text>
      </Pressable>
    ))}
  </View>
);
