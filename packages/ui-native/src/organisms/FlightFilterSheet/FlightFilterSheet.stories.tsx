import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { FlightFilterSheet } from './FlightFilterSheet';

export default {
  title: 'Organisms/FlightFilterSheet',
  component: FlightFilterSheet,
  args: {
    baggage: [
      { id: 'all', label: 'Todas as opções', selected: true },
      { id: 'with', label: 'Com bagagem' },
      { id: 'without', label: 'Sem bagagem' },
    ],
    airlines: [
      { id: 'gol', label: 'Gol Linhas Aéreas', selected: true },
      { id: 'latam', label: 'Latam Airlines' },
      { id: 'azul', label: 'Azul Linhas Aéreas' },
    ],
    stops: [
      { id: 'direct', label: 'Sem paradas', selected: true },
      { id: 'one', label: '1 parada' },
      { id: 'two', label: '2 paradas' },
    ],
    airports: [
      { id: 'gru', label: 'GRU - Guarulhos, SP' },
      { id: 'cgh', label: 'CGH - Congonhas, SP' },
    ],
    duration: { min: 1, max: 12, values: [2, 8] },
    departureTime: { min: 0, max: 24, values: [6, 18] },
    arrivalTime: { min: 0, max: 24, values: [8, 22] },
    price: { min: 0, max: 3000, values: [500, 2200] },
    formatPrice: (v: number) => `R$ ${v}`,
    formatHour: (v: number) => `${v}h`,
    onToggleBaggage: action('onToggleBaggage'),
    onToggleAirline: action('onToggleAirline'),
    onToggleStop: action('onToggleStop'),
    onToggleAirport: action('onToggleAirport'),
    onApply: action('onApply'),
    onClear: action('onClear'),
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
