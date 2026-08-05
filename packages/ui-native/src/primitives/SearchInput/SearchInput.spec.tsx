import { render, screen, fireEvent } from '@testing-library/react-native';
import { SearchInput, type SearchInputOption } from './SearchInput';

const OPTIONS: SearchInputOption[] = [
  { id: 'floripa', label: 'Florianópolis, SC' },
  { id: 'recife', label: 'Recife, PE' },
];

describe('SearchInput', () => {
  it('renders the placeholder and hides the panel when closed', async () => {
    await render(<SearchInput placeholder="Qual seu destino?" options={OPTIONS} />);
    expect(screen.getByPlaceholderText('Qual seu destino?')).toBeOnTheScreen();
    expect(screen.queryByText('Florianópolis, SC')).toBeNull();
    expect(screen.queryByText('Nenhum resultado encontrado')).toBeNull();
  });

  it('lists the options when there is a value with suggestions', async () => {
    await render(<SearchInput value="Fl" options={OPTIONS} />);
    expect(screen.getByText('Florianópolis, SC')).toBeOnTheScreen();
    expect(screen.getByText('Recife, PE')).toBeOnTheScreen();
  });

  it('shows the empty state when the term has no matching options', async () => {
    await render(<SearchInput value="Atlântida perdida" options={[]} />);
    expect(screen.getByText('Nenhum resultado encontrado')).toBeOnTheScreen();
  });

  it('notifies typing via onChangeText', async () => {
    const onChangeText = jest.fn();
    await render(<SearchInput placeholder="Qual seu destino?" onChangeText={onChangeText} />);
    await fireEvent.changeText(screen.getByPlaceholderText('Qual seu destino?'), 'Reci');
    expect(onChangeText).toHaveBeenCalledWith('Reci');
  });

  it('fires onSelectOption with the option id when a suggestion is tapped', async () => {
    const onSelectOption = jest.fn();
    await render(<SearchInput value="Re" options={OPTIONS} onSelectOption={onSelectOption} />);
    await fireEvent.press(screen.getByText('Recife, PE'));
    expect(onSelectOption).toHaveBeenCalledWith('recife');
  });

  it('keeps suggestions tappable with the keyboard open (regressão: exigia 2 toques)', async () => {
    await render(<SearchInput value="Re" options={OPTIONS} />);
    expect(screen.getByTestId('search-input-options-scroll').props.keyboardShouldPersistTaps).toBe(
      'handled',
    );
  });

  it('fires onPressSearch when the search button is tapped', async () => {
    const onPressSearch = jest.fn();
    await render(<SearchInput onPressSearch={onPressSearch} />);
    await fireEvent.press(screen.getByLabelText('Buscar'));
    expect(onPressSearch).toHaveBeenCalledTimes(1);
  });
});
