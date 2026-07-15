import { render, screen } from '@testing-library/react-native';
import { HotelReviewsCard } from './HotelReviewsCard';

const categories = [
  { label: 'Comodidades', value: 7 },
  { label: 'Conforto', value: 7 },
  { label: 'Limpeza', value: 7 },
];

describe('HotelReviewsCard', () => {
  it('renders the title, rating label and categories', () => {
    render(<HotelReviewsCard stars={3} ratingLabel="Bom 7,0" categories={categories} />);
    expect(screen.getByText('Avaliações')).toBeOnTheScreen();
    expect(screen.getByText('Bom 7,0')).toBeOnTheScreen();
    expect(screen.getByText('Comodidades')).toBeOnTheScreen();
    expect(screen.getByText('Conforto')).toBeOnTheScreen();
    expect(screen.getByText('Limpeza')).toBeOnTheScreen();
  });

  it('formats scores in pt-BR', () => {
    render(<HotelReviewsCard stars={3} ratingLabel="Bom 7,0" categories={[{ label: 'Wi-Fi', value: 8.5 }]} />);
    expect(screen.getByText('8,5')).toBeOnTheScreen();
  });
});
