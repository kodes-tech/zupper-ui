import { render, screen, fireEvent } from '@testing-library/react-native';
import { FlightResults } from './FlightResults';
import type { FlightResultsProps } from './FlightResults';
import type { FlightCardProps } from '../../organisms/FlightCard';

const outboundFlight: FlightCardProps = {
  airline: 'LATAM',
  origin: { code: 'GRU', city: 'São Paulo' },
  destination: { code: 'REC', city: 'Recife' },
  departureTime: '23:30',
  arrivalTime: '02:30',
  arrivalDayOffset: 1,
  duration: '3h00',
  selected: true,
};

const returnFlight: FlightCardProps = {
  airline: 'Azul',
  origin: { code: 'REC', city: 'Recife' },
  destination: { code: 'CGH', city: 'São Paulo' },
  departureTime: '03:05',
  arrivalTime: '06:25',
  duration: '3h20',
  selected: true,
};

const baseProps: FlightResultsProps = {
  originCode: 'SAO',
  destinationCode: 'REC',
  originLabel: 'Sao Paulo, SP',
  destinationLabel: 'Recife, PE',
  period: '15 de julho - 28 de julho',
  travelers: '1 Viajante',
  resultsCount: 127,
  outboundDate: 'Qua, 15 De Julho 2026',
  outboundFlight,
  returnDate: 'Ter, 28 De Julho 2026',
  returnFlight,
  fareTitle: 'Melhor preço',
  showBestPriceBadge: true,
  fareRows: [
    { label: 'Tarifa por adulto', value: 'R$ 1.963,27', bold: true, withDivider: true },
    { label: '1 adulto', value: 'R$ 1.963,27' },
    { label: 'Taxas e impostos', value: 'R$ 199,49', withDivider: true },
    { label: 'TOTAL A PAGAR', value: 'R$ 2.162,76', bold: true },
  ],
};

describe('FlightResults', () => {
  it('renders the route summary, results count and both flight sections', () => {
    render(<FlightResults {...baseProps} />);
    expect(screen.getByText('SAO - REC')).toBeOnTheScreen();
    expect(screen.getByText('Sao Paulo, SP - Recife, PE')).toBeOnTheScreen();
    expect(screen.getByText('15 de julho - 28 de julho - 1 Viajante')).toBeOnTheScreen();
    expect(screen.getByText('127 voos encontrados')).toBeOnTheScreen();
    expect(screen.getByText('Voo de ida')).toBeOnTheScreen();
    expect(screen.getByText('Voo de volta')).toBeOnTheScreen();
    expect(screen.getByText('LATAM')).toBeOnTheScreen();
    expect(screen.getByText('Azul')).toBeOnTheScreen();
  });

  it('renders the fare summary with the best price badge', () => {
    render(<FlightResults {...baseProps} />);
    expect(screen.getByText('Melhor preço')).toBeOnTheScreen();
    expect(screen.getByText('TOTAL A PAGAR')).toBeOnTheScreen();
    expect(screen.getByText('R$ 2.162,76')).toBeOnTheScreen();
  });

  it('uses the singular label for a single result', () => {
    render(<FlightResults {...baseProps} resultsCount={1} />);
    expect(screen.getByText('1 voo encontrado')).toBeOnTheScreen();
  });

  it('omits the return section for a one-way trip', () => {
    render(<FlightResults {...baseProps} returnDate={undefined} returnFlight={undefined} />);
    expect(screen.queryByText('Voo de volta')).toBeNull();
  });

  it('fires onBack, onEdit and onShare', () => {
    const onBack = jest.fn();
    const onEdit = jest.fn();
    const onShare = jest.fn();
    render(<FlightResults {...baseProps} onBack={onBack} onEdit={onEdit} onShare={onShare} />);
    fireEvent.press(screen.getByLabelText('Voltar'));
    fireEvent.press(screen.getByLabelText('Editar busca'));
    fireEvent.press(screen.getByLabelText('Compartilhar'));
    expect(onBack).toHaveBeenCalledTimes(1);
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onShare).toHaveBeenCalledTimes(1);
  });

  it('fires onChangeSort when a sort chip is pressed', () => {
    const onChangeSort = jest.fn();
    render(<FlightResults {...baseProps} onChangeSort={onChangeSort} />);
    fireEvent.press(screen.getByText('Voos mais rápidos'));
    expect(onChangeSort).toHaveBeenCalledWith('fastest');
  });
});
