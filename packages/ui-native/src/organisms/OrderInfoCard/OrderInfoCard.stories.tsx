import React from 'react';
import { Text, View } from 'react-native';
import { OrderInfoCard } from './OrderInfoCard';

export default {
  title: 'Organisms/OrderInfoCard',
  component: OrderInfoCard,
  decorators: [(Story: React.ComponentType) => <View style={{ width: 375, padding: 16 }}><Story /></View>],
};

export const SemTrailing = {
  args: {
    title: 'Viajantes',
    children: <Text className="font-sans text-paragraphMd text-fg-subtle">Adulto 1{'\n'}Maria Joaquina Silva</Text>,
  },
};

export const ComTrailing = {
  args: {
    title: 'Forma de pagamento',
    trailing: 'PIX',
    children: <Text className="font-sans text-paragraphMd text-fg-subtle">Pagamento via PIX</Text>,
  },
};
