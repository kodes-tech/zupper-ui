import { render, screen, fireEvent } from '@testing-library/react-native';
import { SelectField, type SelectOption } from './SelectField';

const OPTIONS: SelectOption[] = [
  { id: 'floripa', label: 'Florianópolis, SC' },
  { id: 'recife', label: 'Recife, PE' },
];

describe('SelectField', () => {
  it('renders the selected value', async () => {
    await render(<SelectField value="Recife, PE" />);
    expect(screen.getByText('Recife, PE')).toBeOnTheScreen();
  });

  it('falls back to the placeholder when empty', async () => {
    await render(<SelectField placeholder="Selecione a cidade" />);
    expect(screen.getByText('Selecione a cidade')).toBeOnTheScreen();
  });

  it('fires onPress when tapped', async () => {
    const onPress = jest.fn();
    await render(<SelectField value="Recife, PE" onPress={onPress} />);
    await fireEvent.press(screen.getByText('Recife, PE'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('hides the options while closed', async () => {
    await render(<SelectField placeholder="Selecione a cidade" options={OPTIONS} />);
    expect(screen.queryByText('Florianópolis, SC')).toBeNull();
  });

  it('lists the options when open', async () => {
    await render(<SelectField placeholder="Selecione a cidade" open options={OPTIONS} />);
    expect(screen.getByText('Florianópolis, SC')).toBeOnTheScreen();
    expect(screen.getByText('Recife, PE')).toBeOnTheScreen();
  });

  it('fires onSelectOption with the option id when an option is tapped', async () => {
    const onSelectOption = jest.fn();
    await render(<SelectField open options={OPTIONS} onSelectOption={onSelectOption} />);
    await fireEvent.press(screen.getByText('Recife, PE'));
    expect(onSelectOption).toHaveBeenCalledWith('recife');
  });
});
