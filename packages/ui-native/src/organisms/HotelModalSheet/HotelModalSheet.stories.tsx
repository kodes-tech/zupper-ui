import React from 'react';
import { Text, View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { HotelModalSheet } from './HotelModalSheet';
import { Button } from '../../atoms/Button';

export default {
  title: 'Organisms/HotelModalSheet',
  component: HotelModalSheet,
  args: { onClose: action('onClose') },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 390, height: 500, position: 'relative' }}>
        <Story />
      </View>
    ),
  ],
};

export const Padrao = {
  args: {
    title: 'Título do modal',
    children: <Text>Conteúdo do modal.</Text>,
  },
};

export const ComRodape = {
  args: {
    title: 'Viajantes e Classe de voo',
    showDivider: true,
    children: <Text>Conteúdo do modal.</Text>,
    footer: <Button label="Aplicar filtros" variant="secondary" fullWidth onPress={action('onApply')} />,
  },
};
