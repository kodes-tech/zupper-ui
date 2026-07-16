import React from 'react';
import { Text, View } from 'react-native';

/** Situação do pedido — mapeia para as cores do zupper-app (success/warning/danger). */
export type OrderStatus = 'issued' | 'ongoing' | 'cancelled';

export type OrderStatusBadgeProps = {
  status: OrderStatus;
  /**
   * Texto do selo. O app usa a `situationDescription` do servidor; quando
   * omitido, cai no rótulo padrão da situação (Emitido / Em andamento / Cancelado).
   */
  label?: string;
};

const defaultLabel: Record<OrderStatus, string> = {
  issued: 'Emitido',
  ongoing: 'Em andamento',
  cancelled: 'Cancelado',
};

// Superfície tingida por situação (Figma "Notification Alert"): Emitido=Amazon 100,
// Em andamento=Madrid 50, Cancelado=Amsterdam 100. O texto é sempre neutro escuro
// (fg-secondary / #404040) — a cor vem da superfície, não do texto.
const surfaceByStatus: Record<OrderStatus, string> = {
  issued: 'bg-feedback-successSurface',
  ongoing: 'bg-feedback-pendingSurface',
  cancelled: 'bg-feedback-dangerSurface',
};

/**
 * OrderStatusBadge — selo de situação do pedido (Emitido/Em andamento/Cancelado).
 * Apresentacional: a cor vem da `status`; o texto vem de `label` (ou do padrão).
 * Segue o "Notification Alert - App Zupper" do Figma: superfície tingida + texto
 * neutro escuro em caixa alta, canto `rounded-sm` (não cápsula).
 */
export const OrderStatusBadge = ({
  status,
  label,
}: OrderStatusBadgeProps): React.ReactElement => (
  <View className={`self-start rounded-sm px-md py-xs ${surfaceByStatus[status]}`}>
    <Text className="font-sans text-paragraphMd font-medium uppercase text-fg-secondary">
      {label ?? defaultLabel[status]}
    </Text>
  </View>
);
