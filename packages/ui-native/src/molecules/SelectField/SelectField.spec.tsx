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

  const options = [
    { id: 'recife', label: 'Recife, PE' },
    { id: 'noronha', label: 'Fernando de Noronha, PE' },
  ];

  it('hides the options while closed', () => {
    render(<SelectField placeholder="Selecione a cidade" options={options} />);
    expect(screen.queryByText('Fernando de Noronha, PE')).toBeNull();
  });

  it('lists the options when open', () => {
    render(<SelectField placeholder="Selecione a cidade" open options={options} />);
    expect(screen.getByText('Fernando de Noronha, PE')).toBeOnTheScreen();
  });

  it('fires onSelectOption with the option id', () => {
    const onSelectOption = jest.fn();
    render(
      <SelectField
        placeholder="Selecione a cidade"
        open
        options={options}
        onSelectOption={onSelectOption}
      />,
    );
    fireEvent.press(screen.getByText('Fernando de Noronha, PE'));
    expect(onSelectOption).toHaveBeenCalledWith('noronha');
  });
});
