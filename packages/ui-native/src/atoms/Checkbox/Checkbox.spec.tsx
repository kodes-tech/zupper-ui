import { render, screen, fireEvent } from '@testing-library/react-native';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders the label and reflects the checked state', () => {
    render(<Checkbox label="Com bagagem" checked />);
    const box = screen.getByRole('checkbox', { name: 'Com bagagem' });
    expect(box).toBeOnTheScreen();
    expect(box).toHaveAccessibilityState({ checked: true });
  });

  it('fires onPress', () => {
    const onPress = jest.fn();
    render(<Checkbox label="Sem bagagem" onPress={onPress} />);
    fireEvent.press(screen.getByRole('checkbox', { name: 'Sem bagagem' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
