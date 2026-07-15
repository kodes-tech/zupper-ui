import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { HotelPoliciesSheet } from './HotelPoliciesSheet';

export default {
  title: 'Organisms/HotelPoliciesSheet',
  component: HotelPoliciesSheet,
  args: {
    title: 'Regras da tarifa do adulto',
    description:
      'Cancelamento gratuito até 48 horas antes do check-in. Após esse prazo, será cobrada a primeira diária como multa de cancelamento.',
    onDismiss: action('onDismiss'),
  },
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 390, height: 844, backgroundColor: '#e5e5e5' }}><Story /></View>
    ),
  ],
};

export const Default = {};
