import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';
import type { IconName } from '../../atoms/Icon';
import { OrderStatusBadge } from '../../molecules/OrderStatusBadge';
import type { OrderStatus } from '../../molecules/OrderStatusBadge';
import { OrderTripSummary } from '../../molecules/OrderTripSummary';
import type { OrderTripSummaryProps } from '../../molecules/OrderTripSummary';

export type OrderCardProps = {
  status: OrderStatus;
  /** Texto do selo de situação (default: rótulo padrão da situação). */
  statusLabel?: string;
  /** Ícone do tipo de produto (order-flight / order-hotel / order-package). */
  productIcon: IconName;
  /** Nome do produto (ex.: "Voo Ida e Volta"). */
  productTitle: string;
  /** Número do pedido (mostrado como #número). */
  orderNumber: string | number;
  /** Rótulo da data de criação (ex.: "Criado em 12/05/22"). */
  createdAtLabel: string;
  /** Resumo da viagem (destino, pessoas, datas, imagem). */
  trip: OrderTripSummaryProps;
  /** Banner de alerta sólido abaixo do card (ex.: "Atenção! Taxa de serviço pendente"). */
  alert?: string;
  /** Mostra o link "Detalhes". Default: true. */
  showDetails?: boolean;
  onPressDetails?: () => void;
};

// Acento esquerdo por situação (Figma): Emitido=Amazon 500, Em andamento=Madrid 400,
// Cancelado=Amsterdam 500. Só a borda esquerda é colorida; o card não tem contorno.
const borderByStatus: Record<OrderStatus, string> = {
  issued: 'border-l-feedback-success',
  ongoing: 'border-l-feedback-pending',
  cancelled: 'border-l-feedback-danger',
};

/**
 * OrderCard — card de um pedido na lista "Meus pedidos": acento colorido à
 * esquerda pela situação, cabeçalho (tipo + número + data), resumo da viagem,
 * selo de situação, atalho "Detalhes" e um banner de alerta opcional ao final.
 * Apresentacional: dados por props, ação por `onPressDetails`. Segue o
 * "Cards - Pedidos" do Figma (Meus pedidos - Logado).
 */
export const OrderCard = ({
  status,
  statusLabel,
  productIcon,
  productTitle,
  orderNumber,
  createdAtLabel,
  trip,
  alert,
  showDetails = true,
  onPressDetails,
}: OrderCardProps): React.ReactElement => (
  <View
    className={`gap-md rounded-sm border-l-4 ${borderByStatus[status]} bg-surface-default px-screenMargin py-lg`}
  >
    <View className="flex-row items-start justify-between">
      <View className="flex-row items-center gap-md">
        <View className="h-[32px] w-[32px] items-center justify-center rounded-sm bg-surface-tag">
          <Icon name={productIcon} size={20} color={colors.text.subtle} />
        </View>
        <Text className="font-sans text-paragraphMd font-medium text-fg-subtle">{productTitle}</Text>
      </View>
      <View className="items-end">
        <Text className="font-sans text-paragraphMd font-medium text-fg-secondary">
          #{orderNumber}
        </Text>
        <Text className="font-sans text-caption text-fg-subtle">{createdAtLabel}</Text>
      </View>
    </View>

    <View className="h-px w-full bg-border-subtle" />

    <OrderTripSummary {...trip} />

    <View className="flex-row items-center justify-between">
      <OrderStatusBadge status={status} label={statusLabel} />
      {showDetails ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Detalhes"
          onPress={onPressDetails}
          className="flex-row items-center gap-xs"
        >
          <Text className="font-sans text-caption font-medium text-brand-zupper underline">
            Detalhes
          </Text>
          <Icon name="dropdown-arrow" size={16} color={colors.brand.zupper} />
        </Pressable>
      ) : null}
    </View>

    {alert ? (
      <View className="w-full flex-row items-center justify-center gap-xs rounded-md bg-feedback-dangerSolid px-lg py-xs">
        <Text className="font-sans text-paragraphMd font-medium text-fg-inverse">{alert}</Text>
      </View>
    ) : null}
  </View>
);
