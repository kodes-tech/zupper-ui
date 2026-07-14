import { render, screen, fireEvent } from '@testing-library/react-native';
import { HotelAmenitiesCard } from './HotelAmenitiesCard';

describe('HotelAmenitiesCard', () => {
  it('renders the title and the amenities', () => {
    render(<HotelAmenitiesCard amenities={['Wi-Fi', 'Piscina']} />);
    expect(screen.getByText('Comodidades do local')).toBeOnTheScreen();
    expect(screen.getByText('Wi-Fi')).toBeOnTheScreen();
    expect(screen.getByText('Piscina')).toBeOnTheScreen();
  });

  it('shows "Ver todas" only past the limit and fires onSeeAll', () => {
    const onSeeAll = jest.fn();
    render(<HotelAmenitiesCard amenities={['A', 'B', 'C']} limit={2} onSeeAll={onSeeAll} />);
    expect(screen.queryByText('C')).toBeNull();
    fireEvent.press(screen.getByText('Ver todas as comodidades'));
    expect(onSeeAll).toHaveBeenCalledTimes(1);
  });
});
