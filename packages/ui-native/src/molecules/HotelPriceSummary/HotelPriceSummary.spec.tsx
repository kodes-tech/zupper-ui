import { render, screen } from '@testing-library/react-native';
import { HotelPriceSummary } from './HotelPriceSummary';

describe('HotelPriceSummary', () => {
  it('renders label, price and the default taxes note', () => {
    render(<HotelPriceSummary label="A partir de 10 noites + taxas" price="R$ 3.480" />);
    expect(screen.getByText('A partir de 10 noites + taxas')).toBeOnTheScreen();
    expect(screen.getByText('R$ 3.480')).toBeOnTheScreen();
    expect(screen.getByText('Impostos e taxas inclusos')).toBeOnTheScreen();
  });

  it('renders the optional note next to the price', () => {
    render(
      <HotelPriceSummary label="A partir de 10 noites" price="R$ 3.480" note="/ Média por quarto" />,
    );
    expect(screen.getByText('/ Média por quarto')).toBeOnTheScreen();
  });
});
