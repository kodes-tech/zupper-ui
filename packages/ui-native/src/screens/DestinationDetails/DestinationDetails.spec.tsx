import { render, screen, fireEvent } from '@testing-library/react-native';
import { DestinationDetails } from './DestinationDetails';
import type { DestinationOffer, DestinationPost } from './DestinationDetails';

const banner = { uri: 'banner' };

const offers: DestinationOffer[] = [
  {
    id: 'passagens',
    title: 'Passagens aéreas',
    icon: 'oferta-passagens',
    priceLabel: 'Voos a partir',
    price: 'R$ 1.086',
    dateRange: 'Jul 12 – Jul 19',
    ctaLabel: 'Ver passagens',
  },
];

const post: DestinationPost = {
  id: 'dica',
  authorName: 'Carlos Souza',
  authorAvatar: { uri: 'avatar' },
  role: 'traveler',
  type: 'dica',
  text: 'Dicas essenciais para aproveitar Noronha...',
  location: 'Recife, PE',
  likes: 0,
};

describe('DestinationDetails', () => {
  it('renders header, tabs and offers on the "Ver tudo" tab', () => {
    render(<DestinationDetails title="Fernando de Noronha, PE" banner={banner} offers={offers} posts={[post]} />);
    expect(screen.getByText('Fernando de Noronha, PE')).toBeOnTheScreen();
    expect(screen.getByText('Ver tudo')).toBeOnTheScreen();
    expect(screen.getByText('Passagens aéreas')).toBeOnTheScreen();
    expect(screen.getByText('Carlos Souza')).toBeOnTheScreen();
  });

  it('hides offers on tabs other than "Ver tudo"', () => {
    render(<DestinationDetails title="Fernando de Noronha, PE" banner={banner} tab="dicas" offers={offers} posts={[post]} />);
    expect(screen.queryByText('Passagens aéreas')).toBeNull();
    expect(screen.getByText('Carlos Souza')).toBeOnTheScreen();
  });

  it('fires onTabChange when a tab is pressed', () => {
    const onTabChange = jest.fn();
    render(<DestinationDetails title="Fernando de Noronha, PE" banner={banner} onTabChange={onTabChange} />);
    fireEvent.press(screen.getByText('Fotos'));
    expect(onTabChange).toHaveBeenCalledWith('fotos');
  });

  it('fires onPressOffer with the offer id', () => {
    const onPressOffer = jest.fn();
    render(<DestinationDetails title="Fernando de Noronha, PE" banner={banner} offers={offers} onPressOffer={onPressOffer} />);
    fireEvent.press(screen.getByText('Ver passagens'));
    expect(onPressOffer).toHaveBeenCalledWith('passagens');
  });
});
