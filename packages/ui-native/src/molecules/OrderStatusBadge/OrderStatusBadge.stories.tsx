import React from 'react';
import { View } from 'react-native';
import { OrderStatusBadge } from './OrderStatusBadge';

export default {
  title: 'Molecules/OrderStatusBadge',
  component: OrderStatusBadge,
  decorators: [(Story: React.ComponentType) => <View style={{ padding: 16, gap: 8 }}><Story /></View>],
};

export const Emitido = { args: { status: 'issued' } };
export const EmAndamento = { args: { status: 'ongoing' } };
export const Cancelado = { args: { status: 'cancelled' } };
export const ComLabelCustomizado = {
  args: { status: 'ongoing', label: 'Aguardando pagamento' },
};
