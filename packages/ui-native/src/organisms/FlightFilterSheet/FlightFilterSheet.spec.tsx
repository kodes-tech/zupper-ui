import { render, screen, fireEvent } from '@testing-library/react-native';
import { FlightFilterSheet } from './FlightFilterSheet';

const range = { min: 0, max: 2000, values: [200, 1500] as [number, number] };
const baseProps = {
  baggage: [
    { id: 'with', label: 'Com bagagem', selected: true },
    { id: 'without', label: 'Sem bagagem' },
  ],
  airlines: [{ id: 'gol', label: 'Gol' }, { id: 'latam', label: 'Latam' }],
  stops: [{ id: 'direct', label: 'Sem paradas' }, { id: 'one', label: '1 parada' }],
  airports: [{ id: 'gru', label: 'GRU - Guarulhos' }],
  duration: { min: 1, max: 12, values: [2, 8] as [number, number] },
  departureTime: { min: 0, max: 24, values: [6, 18] as [number, number] },
  arrivalTime: { min: 0, max: 24, values: [8, 22] as [number, number] },
  price: range,
};

describe('FlightFilterSheet', () => {
  it('renders all filter sections', async () => {
    await render(<FlightFilterSheet {...baseProps} />);
    expect(screen.getByText('Filtrar voos')).toBeOnTheScreen();
    expect(screen.getByText('Bagagem')).toBeOnTheScreen();
    expect(screen.getByText('Cias aéreas')).toBeOnTheScreen();
    expect(screen.getByText('Paradas')).toBeOnTheScreen();
    expect(screen.getByText('Duração do voo')).toBeOnTheScreen();
    expect(screen.getByText('Horários de saída')).toBeOnTheScreen();
    expect(screen.getByText('Aeroportos')).toBeOnTheScreen();
    expect(screen.getByText('Preços')).toBeOnTheScreen();
  });

  it('fires toggle and apply callbacks', async () => {
    const onToggleBaggage = jest.fn();
    const onApply = jest.fn();
    await render(<FlightFilterSheet {...baseProps} onToggleBaggage={onToggleBaggage} onApply={onApply} />);
    await fireEvent.press(screen.getByRole('checkbox', { name: 'Sem bagagem' }));
    expect(onToggleBaggage).toHaveBeenCalledWith('without');
    await fireEvent.press(screen.getByText('Aplicar filtros'));
    expect(onApply).toHaveBeenCalledTimes(1);
  });
});
