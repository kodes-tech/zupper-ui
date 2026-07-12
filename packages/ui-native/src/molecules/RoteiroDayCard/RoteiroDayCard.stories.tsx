import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { RoteiroDayCard } from './RoteiroDayCard';
import type { RoteiroStop } from './RoteiroDayCard';

const stops: RoteiroStop[] = [
  {
    id: 'manha',
    period: 'MANHÃ',
    title: 'Marco Zero e Rua do Bom Jesus',
    description: 'Comece cedo, tem sombra e é plano pra carrinho.',
  },
  {
    id: 'tarde',
    period: 'TARDE',
    title: 'Embaixada dos Bonecos Gigantes',
    description: 'As crianças amam. Ingresso barato.',
  },
  {
    id: 'noite',
    period: 'NOITE',
    title: 'Jantar na Rua da Moeda',
    description: 'Opções pra todos os gostos.',
  },
];

export default {
  title: 'Molecules/RoteiroDayCard',
  component: RoteiroDayCard,
  args: { day: 'Dia 1.', title: 'Recife Antigo', stops },
  decorators: [(Story: React.ComponentType) => <View style={{ width: 390, padding: 16 }}><Story /></View>],
};

export const Padrao = { args: {} };
export const ComEdicao = { args: { onEdit: action('onEdit') } };
