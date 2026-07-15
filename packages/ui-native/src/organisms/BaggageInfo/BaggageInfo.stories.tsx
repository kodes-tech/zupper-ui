import React from 'react';
import { View } from 'react-native';
import { BaggageInfo } from './BaggageInfo';

export default {
  title: 'Organisms/BaggageInfo',
  component: BaggageInfo,
  parameters: { layout: 'centered' },
  decorators: [(Story: React.ComponentType) => <View style={{ width: 375 }}><Story /></View>],
};

export const Default = {
  args: {
    items: [
      {
        icon: 'baggage-backpack',
        label: 'Inclui uma mochila ou bolsa',
        description: 'Tamanho limitado a caber abaixo do assento dianteiro.',
        included: true,
      },
      {
        icon: 'baggage-carry-on',
        label: 'Inclui bagagem de mão',
        description: 'Tamanho limitado a caber no compartimento superior do avião. Até 10kg.',
        included: true,
      },
      {
        icon: 'baggage-checked',
        label: 'Não inclui bagagem para despachar',
        description: 'É possível incluir bagagem despachada alterando a opção de tarifa no comparativo de tarifas.',
        included: false,
      },
    ],
  },
};
