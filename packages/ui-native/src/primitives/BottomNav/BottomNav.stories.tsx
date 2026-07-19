import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { BottomNav } from './BottomNav';
import type { BottomNavItem } from './BottomNav';

export default {
  title: 'Primitives/BottomNav',
  component: BottomNav,
  args: { onNavigate: action('onNavigate') },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 390 }}>
        <Story />
      </View>
    ),
  ],
};

// Exemplo com 4 itens (o consumidor passa os seus). `activeIcon` troca o ícone no
// item ativo (ex.: início/conta); itens sem ele mantêm o mesmo ícone nos 2 estados.
const fourItems: BottomNavItem[] = [
  { key: 'inicio', label: 'Início', icon: 'nav-inicio-neutral', activeIcon: 'nav-inicio' },
  { key: 'reservar', label: 'Reservar', icon: 'nav-reservar' },
  { key: 'pedidos', label: 'Pedidos', icon: 'nav-pedidos' },
  { key: 'conta', label: 'Conta', icon: 'nav-conta', activeIcon: 'nav-conta-active' },
];

// Até 5 itens são suportados (o layout distribui em flex).
const fiveItems: BottomNavItem[] = [
  ...fourItems.slice(0, 3),
  { key: 'comunidade', label: 'Comunidade', icon: 'community' },
  fourItems[3],
];

export const QuatroAbas = { args: { items: fourItems, active: 'inicio' } };
export const AbaConta = { args: { items: fourItems, active: 'conta' } };
export const CincoAbas = { args: { items: fiveItems, active: 'comunidade' } };
export const SemAtivo = { args: { items: fourItems } };
