import { render, screen, fireEvent } from '@testing-library/react-native';
import { NumberStepper } from './NumberStepper';

describe('NumberStepper', () => {
  it('renders the value and fires increment/decrement', async () => {
    const onIncrement = jest.fn();
    const onDecrement = jest.fn();
    await render(
      <NumberStepper value={2} label="Adultos" onIncrement={onIncrement} onDecrement={onDecrement} />,
    );
    expect(screen.getByText('2')).toBeOnTheScreen();
    await fireEvent.press(screen.getByRole('button', { name: 'Aumentar Adultos' }));
    expect(onIncrement).toHaveBeenCalledTimes(1);
    await fireEvent.press(screen.getByRole('button', { name: 'Diminuir Adultos' }));
    expect(onDecrement).toHaveBeenCalledTimes(1);
  });

  it('disables decrement when canDecrement is false', async () => {
    const onDecrement = jest.fn();
    await render(<NumberStepper value={1} label="Adultos" canDecrement={false} onDecrement={onDecrement} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Diminuir Adultos' }));
    expect(onDecrement).not.toHaveBeenCalled();
  });
});
