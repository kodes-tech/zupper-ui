import { render, screen, fireEvent } from '@testing-library/react-native';
import { HotelFilterSheet } from './HotelFilterSheet';

const baseProps = {
  selectedStars: [4],
  price: { min: 0, max: 2000, values: [300, 1400] as [number, number] },
  amenities: [
    { id: 'wifi', label: 'Wi-Fi', selected: true },
    { id: 'pool', label: 'Piscina' },
  ],
  districts: [{ id: 'centro', label: 'Centro' }],
};

describe('HotelFilterSheet', () => {
  it('renders sections and options', async () => {
    await render(<HotelFilterSheet {...baseProps} />);
    expect(screen.getByText('Filtrar')).toBeOnTheScreen();
    expect(screen.getByText('Comodidades')).toBeOnTheScreen();
    expect(screen.getByText('Região')).toBeOnTheScreen();
    expect(screen.getByText('Wi-Fi')).toBeOnTheScreen();
    expect(screen.getByText('R$ 300')).toBeOnTheScreen();
  });

  it('fires toggle, apply and clear callbacks', async () => {
    const onToggleAmenity = jest.fn();
    const onApply = jest.fn();
    const onClear = jest.fn();
    await render(
      <HotelFilterSheet {...baseProps} onToggleAmenity={onToggleAmenity} onApply={onApply} onClear={onClear} />,
    );
    await fireEvent.press(screen.getByRole('checkbox', { name: 'Piscina' }));
    expect(onToggleAmenity).toHaveBeenCalledWith('pool');
    await fireEvent.press(screen.getByText('Aplicar filtro'));
    expect(onApply).toHaveBeenCalledTimes(1);
    await fireEvent.press(screen.getByText('Limpar filtros'));
    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
