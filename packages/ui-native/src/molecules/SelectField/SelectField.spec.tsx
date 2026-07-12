import { render, screen, fireEvent } from '@testing-library/react-native';
import { SelectField } from './SelectField';

describe('SelectField', () => {
  it('renders the selected value', () => {
    render(<SelectField value="Recife, PE" />);
    expect(screen.getByText('Recife, PE')).toBeOnTheScreen();
  });

  it('falls back to the placeholder when empty', () => {
    render(<SelectField placeholder="Selecione o destino" />);
    expect(screen.getByText('Selecione o destino')).toBeOnTheScreen();
  });

  it('fires onPress when tapped', () => {
    const onPress = jest.fn();
    render(<SelectField value="Recife, PE" onPress={onPress} />);
    fireEvent.press(screen.getByText('Recife, PE'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
