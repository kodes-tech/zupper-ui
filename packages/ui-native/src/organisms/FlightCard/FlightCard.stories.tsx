import { action } from '@storybook/addon-actions';
import { FlightCard } from './FlightCard';

export default {
  title: 'Organisms/FlightCard',
  component: FlightCard,
  args: {
    onSelect: action('onSelect'),
    onPressDetails: action('onPressDetails'),
  },
};

export const Selecionado = {
  args: {
    airline: 'LATAM',
    origin: { code: 'GRU', city: 'São Paulo' },
    destination: { code: 'REC', city: 'Recife' },
    departureTime: '23:30',
    arrivalTime: '02:30',
    arrivalDayOffset: 1,
    duration: '3h00',
    baggage: { personalItem: true, checkedBaggage: false, carryOn: true },
    selected: true,
  },
};

export const NaoSelecionado = {
  args: {
    ...Selecionado.args,
    airline: 'Azul',
    origin: { code: 'REC', city: 'Recife' },
    destination: { code: 'CGH', city: 'São Paulo' },
    departureTime: '03:05',
    arrivalTime: '06:25',
    arrivalDayOffset: undefined,
    duration: '3h20',
    selected: false,
  },
};

export const ComParada = {
  args: {
    ...Selecionado.args,
    stopsLabel: '1 parada',
  },
};
