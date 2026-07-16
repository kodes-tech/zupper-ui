import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Icon } from '../../atoms/Icon';
import { FilterChip } from '../../atoms/FilterChip';
import { Button } from '../../atoms/Button';
import { BottomNav } from '../../organisms/BottomNav';
import type { BottomNavKey } from '../../organisms/BottomNav';
import { OrderCard } from '../../organisms/OrderCard';
import type { OrderCardProps } from '../../organisms/OrderCard';
import type { OrderStatus } from '../../molecules/OrderStatusBadge';

export type OrdersFilter = OrderStatus;
export type OrdersOrder = OrderCardProps & { id: string };

const filters: { key: OrdersFilter; label: string; dotClassName: string }[] = [
  { key: 'issued', label: 'Emitidos', dotClassName: 'bg-feedback-success' },
  { key: 'ongoing', label: 'Em andamento', dotClassName: 'bg-feedback-pending' },
  { key: 'cancelled', label: 'Cancelados', dotClassName: 'bg-feedback-danger' },
];

export type OrdersEmptyState = {
  /** Mensagem menor acima do título (ex.: "Você ainda não possui pedidos"). */
  message: string;
  /** Título de destaque (ex.: "Aproveite para pesquisar\nsua viagem agora"). */
  title: string;
  ctaLabel: string;
  onPressCta?: () => void;
};

export type OrdersProps = {
  /** Filtro selecionado — o consumidor já entrega `orders` filtrado por este valor. */
  filter: OrdersFilter;
  onChangeFilter?: (filter: OrdersFilter) => void;
  onSearch?: () => void;
  /** Pedidos a exibir (já filtrados pelo consumidor). Vazio → mostra `emptyState`. */
  orders?: OrdersOrder[];
  /** Total exibido em "N pedidos encontrados" (default: `orders.length`). */
  resultsCount?: number;
  /** Conteúdo do estado vazio (sem pedidos / deslogado). Obrigatório quando `orders` é vazio. */
  emptyState?: OrdersEmptyState;
  onPressFilterButton?: () => void;
  active?: BottomNavKey;
  onNavigate?: (key: BottomNavKey) => void;
};

/**
 * Orders — tela "Meus pedidos": header com filtro, busca, tabs de situação e a
 * lista de `OrderCard`; quando `orders` está vazio, mostra a ilustração +
 * mensagem + CTA (cobre tanto "sem pedidos" quanto o visitante deslogado,
 * conforme o `emptyState` recebido). Apresentacional: dados e filtragem
 * entram por props. Segue "Meus pedidos - Logado/Logado sem pedido/Delogado"
 * do Figma.
 */
export const Orders = ({
  filter,
  onChangeFilter,
  onSearch,
  orders = [],
  resultsCount,
  emptyState,
  onPressFilterButton,
  active = 'pedidos',
  onNavigate,
}: OrdersProps): React.ReactElement => (
  <View className="flex-1 bg-surface-tag">
    <View className="gap-md bg-surface-default">
      <View className="flex-row items-center justify-between px-xxl pb-xs pt-[52px]">
        <Text className="font-sans text-cardTitle text-fg-secondary">Meus pedidos</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Filtrar"
          onPress={onPressFilterButton}
          className="flex-row items-center gap-xs rounded-sm border border-border-default bg-surface-default px-md py-xs"
        >
          <Icon name="filter" size={24} />
          <Text className="font-sans text-caption text-fg-subtle">Filtrar</Text>
        </Pressable>
      </View>

      <View className="flex-row gap-md border-b border-border-default px-xxl py-lg">
        {filters.map((f) => (
          <FilterChip
            key={f.key}
            label={f.label}
            selected={filter === f.key}
            icon={
              <>
                <Icon name={filter === f.key ? 'checkbox-checked' : 'checkbox-unchecked'} size={24} />
                <View className={`h-[8px] w-[8px] rounded-pill ${f.dotClassName}`} />
              </>
            }
            onPress={() => onChangeFilter?.(f.key)}
          />
        ))}
      </View>

      <Pressable
        accessibilityRole="search"
        onPress={onSearch}
        className="mx-xxl mb-md flex-row items-center gap-md rounded-md border border-border-default bg-surface-default px-md py-lg"
      >
        <Icon name="search-outline" size={24} />
        <Text className="font-sans text-paragraphMd text-fg-subtle">
          Buscar localizador, pedido, destino...
        </Text>
      </Pressable>
    </View>

    {orders.length > 0 ? (
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="border-b border-border-subtle px-xxl py-xl">
          <Text className="font-sans text-paragraphMd text-fg-subtle">
            {resultsCount ?? orders.length} pedidos encontrados
          </Text>
        </View>
        <View className="gap-lg px-xxl py-xl">
          {orders.map(({ id, ...order }) => (
            <OrderCard key={id} {...order} />
          ))}
        </View>
      </ScrollView>
    ) : emptyState ? (
      <View className="flex-1 items-center justify-center gap-xxl border-b border-border-subtle px-xxl">
        <Icon name="order-empty" width={110} height={188} />
        <View className="items-center gap-lg">
          <Text className="text-center font-sans text-paragraphMd font-medium text-fg-subtle">
            {emptyState.message}
          </Text>
          <Text className="text-center font-sans text-[22px] font-bold leading-8 tracking-[0.44px] text-fg-secondary">
            {emptyState.title}
          </Text>
        </View>
        <Button label={emptyState.ctaLabel} onPress={emptyState.onPressCta} fullWidth />
      </View>
    ) : null}

    <BottomNav active={active} onNavigate={onNavigate} />
  </View>
);
