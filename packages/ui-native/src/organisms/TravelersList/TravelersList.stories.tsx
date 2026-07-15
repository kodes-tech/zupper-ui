import React from 'react';
import { View } from 'react-native';
import { TravelersList } from './TravelersList';

export default {
  title: 'Organisms/TravelersList',
  component: TravelersList,
  parameters: { layout: 'centered' },
  decorators: [(Story: React.ComponentType) => <View style={{ width: 375 }}><Story /></View>],
};

export const Default = {
  args: {
    travelers: [
      { role: 'Adulto 1 (Quarto 1)', details: 'Maria Joaquina Silva, 30/11/1991' },
      { role: 'Adulto 2 (Quarto 2)', details: 'Maria Joaquina Silva, 30/11/1991' },
      { role: 'Criança (Quarto 1)', details: 'Maria Joaquina Silva, 30/11/1991' },
    ],
  },
};
