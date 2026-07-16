import React from 'react';
import { View } from 'react-native';
import { OrderTimelineStep } from './OrderTimelineStep';

export default {
  title: 'Molecules/OrderTimelineStep',
  component: OrderTimelineStep,
  decorators: [(Story: React.ComponentType) => <View style={{ padding: 16 }}><Story /></View>],
};

export const Feito = {
  args: { title: 'Pedido recebido', timestamp: '28/02/2023 às 15:55', tone: 'success' },
};
export const Pendente = {
  args: { title: 'Emitido parcial', timestamp: '28/02/2023 às 15:55', tone: 'warning' },
};
export const Falha = {
  args: { title: 'Pagamento recusado', timestamp: '28/02/2023 às 15:55', tone: 'danger' },
};
export const Ultimo = {
  args: { title: 'Emitido', timestamp: '28/02/2023 às 15:55', tone: 'success', last: true },
};
