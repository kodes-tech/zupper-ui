import { render, screen, fireEvent } from '@testing-library/react-native';
import { CheckboxOption } from './CheckboxOption';

describe('CheckboxOption', () => {
  it('renders the label', () => {
    render(<CheckboxOption label="Aceito receber o status do meu pedido por SMS" />);
    expect(screen.getByText('Aceito receber o status do meu pedido por SMS')).toBeOnTheScreen();
  });

  it('reflects the checked state', () => {
    render(<CheckboxOption label="Aceito" checked />);
    expect(screen.getByRole('checkbox')).toHaveProperty('props.accessibilityState.checked', true);
  });

  it('fires onPress when tapped', () => {
    const onPress = jest.fn();
    render(<CheckboxOption label="Aceito" onPress={onPress} />);
    fireEvent.press(screen.getByRole('checkbox'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
