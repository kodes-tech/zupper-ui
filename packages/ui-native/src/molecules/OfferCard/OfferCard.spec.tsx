import { render, screen, fireEvent } from '@testing-library/react-native';
import { OfferCard } from './OfferCard';

const baseProps = {
  title: 'Passagens aéreas',
  icon: 'oferta-passagens' as const,
  priceLabel: 'Voos a partir',
  price: 'R$ 1.086',
  dateRange: 'Jul 12 – Jul 19',
  ctaLabel: 'Ver passagens',
};

describe('OfferCard', () => {
  it('renders the seal, price and CTA', () => {
    render(<OfferCard {...baseProps} />);
    expect(screen.getByText('Passagens aéreas')).toBeOnTheScreen();
    expect(screen.getByText('R$ 1.086')).toBeOnTheScreen();
    expect(screen.getByText('Jul 12 – Jul 19')).toBeOnTheScreen();
    expect(screen.getByText('Ver passagens')).toBeOnTheScreen();
  });

  it('fires onPress when tapped', () => {
    const onPress = jest.fn();
    render(<OfferCard {...baseProps} onPress={onPress} />);
    fireEvent.press(screen.getByText('Ver passagens'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
