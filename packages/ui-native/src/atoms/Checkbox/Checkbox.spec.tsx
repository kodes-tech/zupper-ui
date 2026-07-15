import { render, screen, fireEvent } from '@testing-library/react-native';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders the label and reflects the checked state', async () => {
    await render(<Checkbox label="Com bagagem" checked />);
    const box = screen.getByRole('checkbox', { name: 'Com bagagem' });
    expect(box).toBeOnTheScreen();
    expect(box.props.accessibilityState).toEqual({ checked: true });
  });

  it('fires onPress', async () => {
    const onPress = jest.fn();
    await render(<Checkbox label="Sem bagagem" onPress={onPress} />);
    await fireEvent.press(screen.getByRole('checkbox', { name: 'Sem bagagem' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
