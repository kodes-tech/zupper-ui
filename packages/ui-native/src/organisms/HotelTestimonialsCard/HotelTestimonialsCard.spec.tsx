import { render, screen, fireEvent } from '@testing-library/react-native';
import { HotelTestimonialsCard } from './HotelTestimonialsCard';

const testimonials = [
  { id: '1', name: 'Jéssica M.', initials: 'JM', flag: '🇧🇷', quote: 'Ótima estadia, recomendo.' },
  { id: '2', name: 'Carlos S.', initials: 'CS', flag: '🇧🇷', quote: 'Localização excelente.' },
];

describe('HotelTestimonialsCard', () => {
  it('renders the title and testimonials', async () => {
    await render(<HotelTestimonialsCard testimonials={testimonials} />);
    expect(screen.getByText('O que os hóspedes dizem')).toBeOnTheScreen();
    expect(screen.getByText('Jéssica M.')).toBeOnTheScreen();
    expect(screen.getByText('JM')).toBeOnTheScreen();
    expect(screen.getByText('Ótima estadia, recomendo.')).toBeOnTheScreen();
    expect(screen.getByText('Carlos S.')).toBeOnTheScreen();
  });

  it('fires onSeeAll', async () => {
    const onSeeAll = jest.fn();
    await render(<HotelTestimonialsCard testimonials={testimonials} onSeeAll={onSeeAll} />);
    await fireEvent.press(screen.getByText('Ver todas as avaliações'));
    expect(onSeeAll).toHaveBeenCalledTimes(1);
  });
});
