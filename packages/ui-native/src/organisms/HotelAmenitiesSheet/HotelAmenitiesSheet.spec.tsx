import { render, screen, fireEvent } from '@testing-library/react-native';
import { HotelAmenitiesSheet } from './HotelAmenitiesSheet';

describe('HotelAmenitiesSheet', () => {
  it('renders the title, search field and amenities', async () => {
    await render(<HotelAmenitiesSheet amenities={['Wi-Fi', 'Piscina', 'Academia']} />);
    expect(screen.getByText('Comodidades')).toBeOnTheScreen();
    expect(screen.getByPlaceholderText('Pesquisar comodidades')).toBeOnTheScreen();
    expect(screen.getByText('Wi-Fi')).toBeOnTheScreen();
    expect(screen.getByText('Piscina')).toBeOnTheScreen();
  });

  it('fires onChangeQuery', async () => {
    const onChangeQuery = jest.fn();
    await render(<HotelAmenitiesSheet amenities={['Wi-Fi']} onChangeQuery={onChangeQuery} />);
    await fireEvent.changeText(screen.getByPlaceholderText('Pesquisar comodidades'), 'wi');
    expect(onChangeQuery).toHaveBeenCalledWith('wi');
  });

  it('shows an empty state when there are no matches', async () => {
    await render(<HotelAmenitiesSheet amenities={[]} />);
    expect(screen.getByText('Nenhuma comodidade encontrada')).toBeOnTheScreen();
  });
});
