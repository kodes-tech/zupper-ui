import React from 'react';
import { View } from 'react-native';
import { PasswordRequirementsList } from './PasswordRequirementsList';

export default {
  title: 'Molecules/PasswordRequirementsList',
  component: PasswordRequirementsList,
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 343, padding: 16 }}>
        <Story />
      </View>
    ),
  ],
};

const requirements = [
  { label: 'Letra maiúscula', met: false },
  { label: 'Letra minúscula', met: false },
  { label: '8 caracteres', met: false },
  { label: 'Número e símbolo', met: false },
];

export const NenhumAtendido = {
  args: { requirements },
};

export const TodosAtendidos = {
  args: { requirements: requirements.map((requirement) => ({ ...requirement, met: true })) },
};

export const Parcial = {
  args: {
    requirements: requirements.map((requirement, index) => ({
      ...requirement,
      met: index % 2 === 0,
    })),
  },
};
