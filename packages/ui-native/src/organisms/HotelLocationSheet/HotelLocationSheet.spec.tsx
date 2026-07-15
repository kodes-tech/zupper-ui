import { render, screen } from '@testing-library/react-native';
import { HotelLocationSheet } from './HotelLocationSheet';

describe('HotelLocationSheet', () => {
  it('renders the title, hotel name and address', async () => {
    await render(
      <HotelLocationSheet hotelName="Hotel Zupper Copacabana" address="Av. Atlântica, 1500 — Rio de Janeiro" />,
    );
    expect(screen.getByText('Ver no mapa')).toBeOnTheScreen();
    expect(screen.getByText('Hotel Zupper Copacabana')).toBeOnTheScreen();
    expect(screen.getByText('Av. Atlântica, 1500 — Rio de Janeiro')).toBeOnTheScreen();
  });
});
