import { render, screen } from '@testing-library/react-native';
import { FlightSegmentDetail } from './FlightSegmentDetail';

const baseProps = {
  direction: 'ida' as const,
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
};

describe('FlightSegmentDetail', () => {
  it('renders the direction, airline, flight info and route', async () => {
    await render(<FlightSegmentDetail {...baseProps} />);
    expect(screen.getByText('Voo de ida')).toBeOnTheScreen();
    expect(screen.getByText('LATAM')).toBeOnTheScreen();
    expect(screen.getByText('Voo nº: LA3456')).toBeOnTheScreen();
    expect(screen.getByText('GRU')).toBeOnTheScreen();
    expect(screen.getByText('REC')).toBeOnTheScreen();
    expect(screen.getByText('23:30')).toBeOnTheScreen();
    expect(screen.getByText('02:30')).toBeOnTheScreen();
  });

  it('shows "Não permite cancelamento" when hasRefund is false', async () => {
    await render(<FlightSegmentDetail {...baseProps} hasRefund={false} />);
    expect(screen.getByText('Não permite cancelamento')).toBeOnTheScreen();
  });

  it('shows the refund text when hasRefund is true', async () => {
    await render(
      <FlightSegmentDetail
        {...baseProps}
        hasRefund
        refundText="Permite cancelamento com reembolso de até 80%"
      />,
    );
    expect(screen.getByText('Permite cancelamento com reembolso de até 80%')).toBeOnTheScreen();
  });

  it('renders the operator line only when operatedBy is provided', async () => {
    await render(<FlightSegmentDetail {...baseProps} operatedBy="TAM Linhas Aéreas" />);
    expect(screen.getByText('Operado por: TAM Linhas Aéreas')).toBeOnTheScreen();
  });
});
