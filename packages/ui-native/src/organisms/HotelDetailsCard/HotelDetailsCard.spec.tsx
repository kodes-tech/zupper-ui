import { render, screen } from '@testing-library/react-native';
import { HotelDetailsCard } from './HotelDetailsCard';

describe('HotelDetailsCard', () => {
  it('renders name, stay details, benefits and price', async () => {
    await render(
      <HotelDetailsCard
        name="Hotel Boa Viagem Praia"
        starRating={4}
        checkIn="Ter, 10 Set - 14:00"
        checkOut="Sex, 20 Set - 12:00"
        guestsSummary="1 quarto, 2 adultos"
        breakfast
        cancellation={{ text: 'Cancelamento grátis até 08/09', tone: 'success' }}
        priceLabel="A partir de 10 noites + taxas"
        price="R$ 3.480"
      />,
    );
    expect(screen.getByText('Hotel Boa Viagem Praia')).toBeOnTheScreen();
    expect(screen.getByText('Entrada')).toBeOnTheScreen();
    expect(screen.getByText('Café da manhã incluído')).toBeOnTheScreen();
    expect(screen.getByText('Cancelamento grátis até 08/09')).toBeOnTheScreen();
    expect(screen.getByText('R$ 3.480')).toBeOnTheScreen();
  });
});
