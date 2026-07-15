import { render, screen, fireEvent } from '@testing-library/react-native';
import { HotelAmenitiesCard } from './HotelAmenitiesCard';

describe('HotelAmenitiesCard', () => {
  it('renders the title and the amenities', async () => {
    await render(<HotelAmenitiesCard amenities={['Wi-Fi', 'Piscina']} />);
    expect(screen.getByText('Comodidades do local')).toBeOnTheScreen();
    expect(screen.getByText('Wi-Fi')).toBeOnTheScreen();
    expect(screen.getByText('Piscina')).toBeOnTheScreen();
  });

  it('shows "Ver todas" only past the limit and fires onSeeAll', async () => {
    const onSeeAll = jest.fn();
    await render(<HotelAmenitiesCard amenities={['A', 'B', 'C']} limit={2} onSeeAll={onSeeAll} />);
    expect(screen.queryByText('C')).toBeNull();
    await fireEvent.press(screen.getByText('Ver todas as comodidades'));
    expect(onSeeAll).toHaveBeenCalledTimes(1);
  });
});
