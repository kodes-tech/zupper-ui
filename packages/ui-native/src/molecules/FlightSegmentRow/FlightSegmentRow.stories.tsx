import { FlightSegmentRow } from './FlightSegmentRow';

export default {
  title: 'Molecules/FlightSegmentRow',
  component: FlightSegmentRow,
  parameters: { layout: 'centered' },
};

export const Ida = {
  args: {
    segment: {
      direction: 'ida',
      originCode: 'FLN',
      destinationCode: 'CGH',
      airlineCode: 'G3',
      airlineIcon: 'airline-gol',
      stopsLabel: '3 paradas',
      departureTime: '11:30',
      arrivalTime: '13:20',
      date: '20 Ago 2024',
    },
  },
};

export const Volta = {
  args: {
    segment: {
      direction: 'volta',
      originCode: 'CGH',
      destinationCode: 'FLN',
      airlineCode: 'G3',
      airlineIcon: 'airline-gol',
      stopsLabel: 'Direto',
      departureTime: '11:30',
      arrivalTime: '13:20',
      date: '24 Ago 2024',
    },
  },
};
