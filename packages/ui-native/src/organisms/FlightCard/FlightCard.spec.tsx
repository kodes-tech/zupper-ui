import { render, screen, fireEvent } from '@testing-library/react-native';
import { FlightCard } from './FlightCard';
import type { FlightCardProps } from './FlightCard';

const baseProps: FlightCardProps = {
  airline: 'LATAM',
  origin: { code: 'GRU', city: 'São Paulo' },
  destination: { code: 'REC', city: 'Recife' },
  departureTime: '23:30',
  arrivalTime: '02:30',
  arrivalDayOffset: 1,
  duration: '3h00',
};

describe('FlightCard', () => {
  it('renders airline, route, times and duration', () => {
    render(<FlightCard {...baseProps} />);
    expect(screen.getByText('LATAM')).toBeOnTheScreen();
    expect(screen.getByText('GRU')).toBeOnTheScreen();
    expect(screen.getByText('REC')).toBeOnTheScreen();
    expect(screen.getByText('23:30')).toBeOnTheScreen();
    expect(screen.getByText('02:30')).toBeOnTheScreen();
    expect(screen.getByText('+1')).toBeOnTheScreen();
    expect(screen.getByText('Duração: 3h00')).toBeOnTheScreen();
    expect(screen.getByText('Direto')).toBeOnTheScreen();
  });

  it('shows a custom stops label', () => {
    render(<FlightCard {...baseProps} stopsLabel="1 parada" />);
    expect(screen.getByText('1 parada')).toBeOnTheScreen();
  });

  it('reflects the selected state', () => {
    render(<FlightCard {...baseProps} selected />);
    expect(screen.getByRole('radio')).toHaveProperty('props.accessibilityState.selected', true);
  });

  it('fires onSelect when the card is pressed', () => {
    const onSelect = jest.fn();
    render(<FlightCard {...baseProps} onSelect={onSelect} />);
    fireEvent.press(screen.getByRole('radio'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('fires onPressDetails without triggering onSelect', () => {
    const onSelect = jest.fn();
    const onPressDetails = jest.fn();
    render(<FlightCard {...baseProps} onSelect={onSelect} onPressDetails={onPressDetails} />);
    fireEvent.press(screen.getByLabelText('Ver detalhes do voo'));
    expect(onPressDetails).toHaveBeenCalledTimes(1);
    expect(onSelect).not.toHaveBeenCalled();
  });
});
