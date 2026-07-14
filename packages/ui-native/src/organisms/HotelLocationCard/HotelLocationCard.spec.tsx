import { render, screen } from '@testing-library/react-native';
import { HotelLocationCard } from './HotelLocationCard';

describe('HotelLocationCard', () => {
  it('renders the title and address', () => {
    render(<HotelLocationCard address="Av. Boa Viagem, 1500 - Recife, PE" />);
    expect(screen.getByText('Localização')).toBeOnTheScreen();
    expect(screen.getByText('Av. Boa Viagem, 1500 - Recife, PE')).toBeOnTheScreen();
  });
});
