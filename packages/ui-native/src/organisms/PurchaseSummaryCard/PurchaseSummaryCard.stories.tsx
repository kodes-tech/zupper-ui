import React from 'react';
import { View } from 'react-native';
import { PurchaseSummaryCard } from './PurchaseSummaryCard';

export default {
  title: 'Organisms/PurchaseSummaryCard',
  component: PurchaseSummaryCard,
  parameters: { layout: 'centered' },
  decorators: [(Story: React.ComponentType) => <View style={{ width: 375 }}><Story /></View>],
};

export const Default = {
  args: {
    items: [
      { label: 'Tarifa por adulto', value: 'R$ 654,51' },
      { label: '1 Adulto', value: 'R$ 654,51' },
      { label: 'Taxas e impostos', value: 'R$ 39,00' },
      { label: 'Pagar direto na hospedagem', value: 'R$ 514,00' },
    ],
    total: 'R$ 1.255,12',
  },
};
