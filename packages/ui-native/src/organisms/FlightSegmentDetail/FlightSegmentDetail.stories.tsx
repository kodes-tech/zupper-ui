import { FlightSegmentDetail } from './FlightSegmentDetail';

export default {
  title: 'Organisms/FlightSegmentDetail',
  component: FlightSegmentDetail,
};

export const Ida = {
  args: {
    direction: 'ida',
    date: 'Quarta-feira, 15 de julho de 2026',
    airline: 'LATAM',
    flightNumber: 'LA3456',
    fareClass: 'Econômica',
    aircraftModel: 'Airbus A320',
    origin: {
      code: 'GRU',
      description: 'Aeroporto Internacional de Guarulhos',
      city: 'São Paulo, SP',
      weekday: 'Qua, 15 Jul',
      time: '23:30',
    },
    destination: {
      code: 'REC',
      description: 'Aeroporto Internacional do Recife',
      city: 'Recife, PE',
      weekday: 'Qui, 16 Jul',
      time: '02:30',
    },
    duration: '3h00',
    arrivalDayOffset: 1,
    stopsLabel: 'Direto',
    hasRefund: true,
    refundText: 'Permite cancelamento com reembolso de até 80%',
  },
};

export const SemReembolso = {
  args: {
    ...Ida.args,
    hasRefund: false,
  },
};

export const ComParada = {
  args: {
    ...Ida.args,
    stopsLabel: '1 parada',
  },
};
