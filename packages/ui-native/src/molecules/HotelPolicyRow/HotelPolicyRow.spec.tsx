import { render, screen, fireEvent } from '@testing-library/react-native';
import { HotelPolicyRow } from './HotelPolicyRow';

describe('HotelPolicyRow', () => {
  it('renders the title', () => {
    render(<HotelPolicyRow title="Políticas de acomodações" />);
    expect(screen.getByText('Políticas de acomodações')).toBeOnTheScreen();
  });

  it('fires onPress', () => {
    const onPress = jest.fn();
    render(<HotelPolicyRow title="Informações relevantes" onPress={onPress} />);
    fireEvent.press(screen.getByRole('button', { name: 'Informações relevantes' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
