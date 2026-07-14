import { render, screen, fireEvent } from '@testing-library/react-native';
import { HotelCard } from './HotelCard';
import type { HotelCardData } from './HotelCard';

const hotel: HotelCardData = {
  name: 'Hotel Boa Viagem Praia',
  starRating: 4,
  address: 'Av. Boa Viagem, 1500 - Recife, PE',
  hasMap: true,
  breakfast: true,
  cancellation: { text: 'Cancelamento grátis até 08/09', tone: 'success' },
  amenities: ['Wi-Fi', 'Piscina'],
  priceLabel: 'Preço para 10 diárias',
  price: 'R$ 3.480',
  taxNote: 'Taxas incluídas',
  installments: 'em até 10x',
};

describe('HotelCard', () => {
  it('renders the hotel summary', () => {
    render(<HotelCard hotel={hotel} />);
    expect(screen.getByText('Hotel Boa Viagem Praia')).toBeOnTheScreen();
    expect(screen.getByText('Av. Boa Viagem, 1500 - Recife, PE')).toBeOnTheScreen();
    expect(screen.getByText('Café da manhã incluído')).toBeOnTheScreen();
    expect(screen.getByText('Cancelamento grátis até 08/09')).toBeOnTheScreen();
    expect(screen.getByText('R$ 3.480')).toBeOnTheScreen();
    expect(screen.getByText('em até 10x')).toBeOnTheScreen();
  });

  it('fires onSeeOffer and onSeeMap', () => {
    const onSeeOffer = jest.fn();
    const onSeeMap = jest.fn();
    render(<HotelCard hotel={hotel} onSeeOffer={onSeeOffer} onSeeMap={onSeeMap} />);
    fireEvent.press(screen.getByText('Ver oferta'));
    expect(onSeeOffer).toHaveBeenCalledTimes(1);
    fireEvent.press(screen.getByText('Ver no mapa'));
    expect(onSeeMap).toHaveBeenCalledTimes(1);
  });
});
