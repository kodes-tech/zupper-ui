import { render, screen } from '@testing-library/react-native';
import { HotelNearbyCard } from './HotelNearbyCard';

describe('HotelNearbyCard', () => {
  it('renders the title and the points', () => {
    render(
      <HotelNearbyCard
        points={[
          { name: 'Praia de Boa Viagem', distance: '0.2 km' },
          { name: 'Marco Zero', distance: '5.4 km' },
        ]}
      />,
    );
    expect(screen.getByText('O que tem por perto')).toBeOnTheScreen();
    expect(screen.getByText('Praia de Boa Viagem')).toBeOnTheScreen();
    expect(screen.getByText('(0.2 km)')).toBeOnTheScreen();
  });

  it('renders nothing when there are no points', () => {
    const { toJSON } = render(<HotelNearbyCard points={[]} />);
    expect(toJSON()).toBeNull();
  });
});
