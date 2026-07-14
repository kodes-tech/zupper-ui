import { render, screen, fireEvent } from '@testing-library/react-native';
import { HotelResults } from './HotelResults';
import type { HotelCardData } from '../../organisms/HotelCard';

const hotels: HotelCardData[] = [
  {
    name: 'Hotel Boa Viagem Praia',
    starRating: 4,
    address: 'Av. Boa Viagem, 1500 - Recife, PE',
    priceLabel: 'Preço para 10 diárias',
    price: 'R$ 3.480',
  },
];

describe('HotelResults', () => {
  it('renders the summary, results count and hotel list', () => {
    render(
      <HotelResults
        destination="Recife - PE"
        searchDetails="10 set - 20 set · 2 hóspedes"
        totalResults={128}
        hotels={hotels}
      />,
    );
    expect(screen.getByText('Recife - PE')).toBeOnTheScreen();
    expect(screen.getByText('128 resultados encontrados')).toBeOnTheScreen();
    expect(screen.getByText('Hotel Boa Viagem Praia')).toBeOnTheScreen();
  });

  it('fires sort and hotel selection callbacks', () => {
    const onChangeSort = jest.fn();
    const onSelectHotel = jest.fn();
    render(
      <HotelResults
        destination="Recife - PE"
        searchDetails="10 set - 20 set · 2 hóspedes"
        totalResults={1}
        hotels={hotels}
        onChangeSort={onChangeSort}
        onSelectHotel={onSelectHotel}
      />,
    );
    expect(screen.getByText('1 resultado encontrado')).toBeOnTheScreen();
    fireEvent.press(screen.getByText('Mais barato'));
    expect(onChangeSort).toHaveBeenCalledWith('barato');
    fireEvent.press(screen.getByText('Ver oferta'));
    expect(onSelectHotel).toHaveBeenCalledWith(0);
  });
});
