import { render, screen } from '@testing-library/react-native';
import { FlightLegCard } from './FlightLegCard';
import type { FlightLegCardProps } from './FlightLegCard';

const baseProps: FlightLegCardProps = {
  direction: 'ida',
  dateLabel: 'Qua, 24 de maio 2024',
  airline: { name: 'Gol airlines', operatedByName: 'Latam Airlines' },
  flightNumber: 'LA522',
  flightClass: 'Econômica',
  aircraftModel: 'Boeing 747',
  departure: { time: '11:30', dateLabel: 'Qua, 24 maio', city: 'Florianópolis, SC', code: 'FLN', name: 'Aeroporto Internacional Hercílio Luz' },
  arrival: { time: '12:55', dateLabel: 'Qua, 24 maio', city: 'Congonhas, SP', code: 'CGH', name: 'Aeroporto Internacional de Congonhas' },
  duration: '1h50',
  locator: 'SWOK2A',
  eTicket: 'SWOK2A',
};

describe('FlightLegCard', () => {
  it('renders the leg header, airline and route', async () => {
    await render(<FlightLegCard {...baseProps} />);
    expect(screen.getByText('Voo de ida')).toBeOnTheScreen();
    expect(screen.getByText('Gol airlines')).toBeOnTheScreen();
    expect(screen.getByText('Operado por:')).toBeOnTheScreen();
    expect(screen.getByText('Latam Airlines')).toBeOnTheScreen();
    expect(screen.getByText('11:30')).toBeOnTheScreen();
    expect(screen.getByText('12:55')).toBeOnTheScreen();
    expect(screen.getByText('FLN')).toBeOnTheScreen();
    expect(screen.getByText('CGH')).toBeOnTheScreen();
    expect(screen.getByText('Direto')).toBeOnTheScreen();
  });

  it('renders locator and e-ticket with the direction suffix', async () => {
    await render(<FlightLegCard {...baseProps} />);
    expect(screen.getByText('Localizador IDA')).toBeOnTheScreen();
    expect(screen.getByText('E-ticket IDA')).toBeOnTheScreen();
  });

  it('uses the volta label and suffix', async () => {
    await render(<FlightLegCard {...baseProps} direction="volta" />);
    expect(screen.getByText('Voo de volta')).toBeOnTheScreen();
    expect(screen.getByText('Localizador VOLTA')).toBeOnTheScreen();
  });

  it('renders the flexible fare policy only when provided', async () => {
    await render(
      <FlightLegCard
        {...baseProps}
        flexible={{ cancelPolicy: 'Não permite cancelamento', farePolicy: 'Alterações a partir de R$ 478,00' }}
      />,
    );
    expect(screen.getByText('Voo flexível')).toBeOnTheScreen();
    expect(screen.getByText('Não permite cancelamento')).toBeOnTheScreen();
  });

  it('omits the flexible section when not provided', async () => {
    await render(<FlightLegCard {...baseProps} />);
    expect(screen.queryByText('Voo flexível')).not.toBeOnTheScreen();
  });
});
