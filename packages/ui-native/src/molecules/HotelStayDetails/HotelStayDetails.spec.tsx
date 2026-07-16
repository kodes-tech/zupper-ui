import { render, screen } from '@testing-library/react-native';
import { HotelStayDetails } from './HotelStayDetails';

describe('HotelStayDetails', () => {
  it('renders the three fixed rows', async () => {
    await render(
      <HotelStayDetails
        checkIn="Ter, 10 Set - 14:00"
        checkOut="Sex, 20 Set - 12:00"
        guestsSummary="1 quarto, 2 adultos"
      />,
    );
    expect(screen.getByText('Entrada')).toBeOnTheScreen();
    expect(screen.getByText('Ter, 10 Set - 14:00')).toBeOnTheScreen();
    expect(screen.getByText('Saída')).toBeOnTheScreen();
    expect(screen.getByText('Sex, 20 Set - 12:00')).toBeOnTheScreen();
    expect(screen.getByText('Quartos e hóspedes')).toBeOnTheScreen();
    expect(screen.getByText('1 quarto, 2 adultos')).toBeOnTheScreen();
  });
});
