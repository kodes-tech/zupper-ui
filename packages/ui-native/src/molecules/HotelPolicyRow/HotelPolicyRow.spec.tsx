import { render, screen, fireEvent } from '@testing-library/react-native';
import { HotelPolicyRow } from './HotelPolicyRow';

describe('HotelPolicyRow', () => {
  it('renders the title', async () => {
    await render(<HotelPolicyRow title="Políticas de acomodações" />);
    expect(screen.getByText('Políticas de acomodações')).toBeOnTheScreen();
  });

  it('fires onPress', async () => {
    const onPress = jest.fn();
    await render(<HotelPolicyRow title="Informações relevantes" onPress={onPress} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Informações relevantes' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
