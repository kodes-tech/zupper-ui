import { render, screen, fireEvent } from '@testing-library/react-native';
import { SelectField } from './SelectField';

describe('SelectField', () => {
  it('renders the selected value', async () => {
    await render(<SelectField value="Recife, PE" />);
    expect(screen.getByText('Recife, PE')).toBeOnTheScreen();
  });

  it('falls back to the placeholder when empty', async () => {
    await render(<SelectField placeholder="Selecione o destino" />);
    expect(screen.getByText('Selecione o destino')).toBeOnTheScreen();
  });

  it('fires onPress when tapped', async () => {
    const onPress = jest.fn();
    await render(<SelectField value="Recife, PE" onPress={onPress} />);
    await fireEvent.press(screen.getByText('Recife, PE'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
