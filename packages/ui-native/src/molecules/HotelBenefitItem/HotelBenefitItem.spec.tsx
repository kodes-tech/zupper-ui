import { render, screen } from '@testing-library/react-native';
import { HotelBenefitItem } from './HotelBenefitItem';

describe('HotelBenefitItem', () => {
  it('renders the benefit text', () => {
    render(<HotelBenefitItem icon="amenity-coffee" text="Café da manhã incluído" />);
    expect(screen.getByText('Café da manhã incluído')).toBeOnTheScreen();
  });
});
