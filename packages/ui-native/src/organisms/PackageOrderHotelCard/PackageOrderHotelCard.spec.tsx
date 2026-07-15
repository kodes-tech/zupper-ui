import { render, screen, fireEvent } from '@testing-library/react-native';
import { PackageOrderHotelCard } from './PackageOrderHotelCard';

const baseProps = {
  name: 'Bourbon São Paulo Ibirapuera Convention Hotel',
  starRating: 3,
  address: 'Av. Ibirapuera, 2927 - Ibirapuera - São Paulo',
  distance: '5km do Centro',
  benefits: [
    { icon: 'hotel-circle-check' as const, text: 'Cancelamento grátis', tone: 'success' as const },
    { icon: 'amenity-coffee' as const, text: 'Café da manhã grátis', tone: 'success' as const },
  ],
  amenities: [
    { label: 'Conectividade', icon: 'amenity-wifi' as const },
    { label: 'Conforto', icon: 'amenity-ac' as const },
  ],
  checkIn: 'Qua, 28 Dez 2024 - 00h00',
  checkOut: 'Qua, 02 Jan 2024 - 00h00',
  guestsSummary: '1 quarto, 2 adultos',
};

describe('PackageOrderHotelCard', () => {
  it('renders name, address, benefits and stay details', async () => {
    await render(<PackageOrderHotelCard {...baseProps} />);
    expect(screen.getByText('Bourbon São Paulo Ibirapuera Convention Hotel')).toBeOnTheScreen();
    expect(screen.getByText(/Av. Ibirapuera, 2927/)).toBeOnTheScreen();
    expect(screen.getByText('Cancelamento grátis')).toBeOnTheScreen();
    expect(screen.getByText('Entrada')).toBeOnTheScreen();
    expect(screen.getByText('1 quarto, 2 adultos')).toBeOnTheScreen();
  });

  it('fires description and amenities callbacks', async () => {
    const onSeeDescription = jest.fn();
    const onSeeAllAmenities = jest.fn();
    await render(
      <PackageOrderHotelCard
        {...baseProps}
        onSeeDescription={onSeeDescription}
        onSeeAllAmenities={onSeeAllAmenities}
      />,
    );
    await fireEvent.press(screen.getByText('Ver descrição completa'));
    expect(onSeeDescription).toHaveBeenCalledTimes(1);
    await fireEvent.press(screen.getByText('Ver todas as comodidades'));
    expect(onSeeAllAmenities).toHaveBeenCalledTimes(1);
  });
});
