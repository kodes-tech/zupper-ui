import { render, screen, fireEvent } from '@testing-library/react-native';
import { PackageOfferCard } from './PackageOfferCard';
import type { PackageOfferCardData } from './PackageOfferCard';

const offer: PackageOfferCardData = {
  id: '1',
  tag: 'Com café da manhã',
  title: 'Pacote exclusivo para Salvador - Bahia',
  originInfo: 'De Rio de Janeiro (01-05 Set)',
  hotelName: 'Salvador Express Praia Hotel',
  priceLabel: 'Preço por pessoa',
  price: 'R$ 155',
};

describe('PackageOfferCard', () => {
  it('renders the offer details', () => {
    render(<PackageOfferCard offer={offer} />);
    expect(screen.getByText('Pacote exclusivo para Salvador - Bahia')).toBeOnTheScreen();
    expect(screen.getByText('De Rio de Janeiro (01-05 Set)')).toBeOnTheScreen();
    expect(screen.getByText('Salvador Express Praia Hotel')).toBeOnTheScreen();
    expect(screen.getByText('Com café da manhã')).toBeOnTheScreen();
    expect(screen.getByText('R$ 155')).toBeOnTheScreen();
  });

  it('fires onSeeOffer', () => {
    const onSeeOffer = jest.fn();
    render(<PackageOfferCard offer={offer} onSeeOffer={onSeeOffer} />);
    fireEvent.press(screen.getByText('Ver oferta'));
    expect(onSeeOffer).toHaveBeenCalledTimes(1);
  });
});
