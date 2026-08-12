import { fireEvent, render, screen } from '@testing-library/react-native';
import { ClearableField } from './ClearableField';

describe('ClearableField', () => {
  it('renders the label and the formatted value', async () => {
    await render(<ClearableField label="Ida" value="Qua, 24 Maio" />);

    expect(screen.getByText('Ida')).toBeOnTheScreen();
    expect(screen.getByText('Qua, 24 Maio')).toBeOnTheScreen();
  });

  it('falls back to the placeholder when there is no value', async () => {
    await render(<ClearableField label="Volta" placeholder="Escolha a volta" />);
    expect(screen.getByText('Escolha a volta')).toBeOnTheScreen();
  });

  it('fires onPress when the field is tapped', async () => {
    const onPress = jest.fn();
    await render(<ClearableField label="Ida" value="Qua, 24 Maio" onPress={onPress} />);

    await fireEvent.press(screen.getByLabelText('Ida: Qua, 24 Maio'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('fires onClear when the clear button is tapped', async () => {
    const onClear = jest.fn();
    const onPress = jest.fn();
    await render(
      <ClearableField label="Ida" value="Qua, 24 Maio" onPress={onPress} onClear={onClear} />,
    );

    await fireEvent.press(screen.getByLabelText('Limpar Ida'));
    expect(onClear).toHaveBeenCalledTimes(1);
    // O toque no "×" não pode vazar para o campo e reabrir o seletor.
    expect(onPress).not.toHaveBeenCalled();
  });

  it('hides the clear button when there is nothing to clear', async () => {
    const onClear = jest.fn();
    await render(<ClearableField label="Volta" onClear={onClear} />);
    expect(screen.queryByLabelText('Limpar Volta')).toBeNull();
  });

  it('hides the clear button when the caller offers no onClear', async () => {
    await render(<ClearableField label="Ida" value="Qua, 24 Maio" />);
    expect(screen.queryByLabelText('Limpar Ida')).toBeNull();
  });

  it('does not fire onPress while disabled', async () => {
    const onPress = jest.fn();
    await render(<ClearableField label="Ida" value="Qua, 24 Maio" onPress={onPress} disabled />);

    const field = screen.getByLabelText('Ida: Qua, 24 Maio');
    expect(field).toBeDisabled();
    await fireEvent.press(field);
    expect(onPress).not.toHaveBeenCalled();
  });
});
