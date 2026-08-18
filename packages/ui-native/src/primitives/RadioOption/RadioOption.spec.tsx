import { render, screen, fireEvent } from '@testing-library/react-native';
import { RadioOption } from './RadioOption';

describe('RadioOption', () => {
  it('renders the label', async () => {
    await render(<RadioOption label="Celular" />);
    expect(screen.getByText('Celular')).toBeOnTheScreen();
  });

  it('reflects the selected state', async () => {
    await render(<RadioOption label="Celular" selected />);
    expect(screen.getByRole('radio')).toHaveProperty('props.accessibilityState.selected', true);
  });

  it('fires onPress when tapped', async () => {
    const onPress = jest.fn();
    await render(<RadioOption label="Celular" onPress={onPress} />);
    await fireEvent.press(screen.getByRole('radio'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  // KSA-446 — ver interaction-states.md.
  it('pede o retorno de toque (fundo sutil) na linha de opção', async () => {
    await render(<RadioOption label="Celular" />);
    expect(screen.getByLabelText('Celular').props.className).toContain('active:bg-state-pressedSubtle');
  });

});
