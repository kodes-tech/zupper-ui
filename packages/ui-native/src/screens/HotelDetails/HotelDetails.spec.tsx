import { render, screen, fireEvent } from '@testing-library/react-native';
import { HotelDetails } from './HotelDetails';

const baseProps = {
  destination: 'Recife - PE',
  searchDetails: '10 set - 20 set · 2 hóspedes',
  name: 'Hotel Boa Viagem Praia',
  starRating: 4,
  checkIn: 'Ter, 10 Set - 14:00',
  checkOut: 'Sex, 20 Set - 12:00',
  guestsSummary: '1 quarto, 2 adultos',
  priceLabel: 'A partir de 10 noites + taxas',
  price: 'R$ 3.480',
  address: 'Av. Boa Viagem, 1500 - Recife, PE',
  description: 'Descrição do hotel.',
  amenities: ['Wi-Fi', 'Piscina'],
};

describe('HotelDetails', () => {
  it('renders the hotel summary, address, description and amenities', async () => {
    await render(<HotelDetails {...baseProps} />);
    expect(screen.getByText('Recife - PE')).toBeOnTheScreen();
    expect(screen.getByText('Hotel Boa Viagem Praia')).toBeOnTheScreen();
    expect(screen.getByText('Localização')).toBeOnTheScreen();
    expect(screen.getByText('Av. Boa Viagem, 1500 - Recife, PE')).toBeOnTheScreen();
    expect(screen.getByText('Descrição')).toBeOnTheScreen();
    expect(screen.getByText('Comodidades do local')).toBeOnTheScreen();
  });

  it('omits the nearby section when there are no points', async () => {
    await render(<HotelDetails {...baseProps} nearbyPoints={[]} />);
    expect(screen.queryByText('Interesses na proximidade')).toBeNull();
  });

  it('fires onSelectRooms from the footer CTA', async () => {
    const onSelectRooms = jest.fn();
    await render(<HotelDetails {...baseProps} onSelectRooms={onSelectRooms} />);
    await fireEvent.press(screen.getByText('Selecionar quartos'));
    expect(onSelectRooms).toHaveBeenCalledTimes(1);
  });
});
