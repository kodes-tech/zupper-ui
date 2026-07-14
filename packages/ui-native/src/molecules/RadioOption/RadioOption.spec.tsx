import { render, screen, fireEvent } from '@testing-library/react-native';
import { RadioOption } from './RadioOption';

describe('RadioOption', () => {
  it('renders the label', () => {
    render(<RadioOption label="Celular" />);
    expect(screen.getByText('Celular')).toBeOnTheScreen();
  });

  it('reflects the selected state', () => {
    render(<RadioOption label="Celular" selected />);
    expect(screen.getByRole('radio')).toHaveProperty('props.accessibilityState.selected', true);
  });

  it('fires onPress when tapped', () => {
    const onPress = jest.fn();
    render(<RadioOption label="Celular" onPress={onPress} />);
    fireEvent.press(screen.getByRole('radio'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
