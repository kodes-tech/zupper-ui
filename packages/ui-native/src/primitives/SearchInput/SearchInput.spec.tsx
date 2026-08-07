import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
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

  it('lists the options when there is a value with suggestions and the field is focused', async () => {
    await render(<SearchInput value="Fl" options={OPTIONS} />);
    await fireEvent(screen.getByPlaceholderText('Qual seu destino?'), 'focus');
    expect(screen.getByText('Florianópolis, SC')).toBeOnTheScreen();
    expect(screen.getByText('Recife, PE')).toBeOnTheScreen();
  });

  it('shows the empty state when the term has no matching options and the field is focused', async () => {
    await render(<SearchInput value="Atlântida perdida" options={[]} />);
    await fireEvent(screen.getByPlaceholderText('Qual seu destino?'), 'focus');
    expect(screen.getByText('Nenhum resultado encontrado')).toBeOnTheScreen();
  });

  it('keeps the panel closed while the field has a value but was never focused', async () => {
    await render(<SearchInput value="Fl" options={OPTIONS} />);
    expect(screen.queryByText('Florianópolis, SC')).toBeNull();
  });

  it('closes the panel shortly after the field loses focus, without dropping a tap on an option (regressão: blur competia com o toque)', async () => {
    await render(<SearchInput value="Fl" options={OPTIONS} />);
    const input = screen.getByPlaceholderText('Qual seu destino?');
    await fireEvent(input, 'focus');
    expect(screen.getByText('Florianópolis, SC')).toBeOnTheScreen();

    await fireEvent(input, 'blur');
    // Ainda visível na volta síncrona do blur — o fechamento é adiado pra dar
    // tempo de um toque em andamento numa opção terminar de processar.
    expect(screen.getByText('Florianópolis, SC')).toBeOnTheScreen();

    await waitFor(() => {
      expect(screen.queryByText('Florianópolis, SC')).toBeNull();
    });
  });

  it('reopens on refocus without waiting out a pending close from a previous blur', async () => {
    await render(<SearchInput value="Fl" options={OPTIONS} />);
    const input = screen.getByPlaceholderText('Qual seu destino?');
    await fireEvent(input, 'focus');
    await fireEvent(input, 'blur');
    await fireEvent(input, 'focus');

    expect(screen.getByText('Florianópolis, SC')).toBeOnTheScreen();
  });

  it('fires onFocus when the field is focused', async () => {
    const onFocus = jest.fn();
    await render(<SearchInput placeholder="Qual seu destino?" onFocus={onFocus} />);
    await fireEvent(screen.getByPlaceholderText('Qual seu destino?'), 'focus');
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('fires onBlur in sync with the panel closing, not immediately on blur', async () => {
    const onBlur = jest.fn();
    await render(<SearchInput value="Fl" options={OPTIONS} onBlur={onBlur} />);
    const input = screen.getByPlaceholderText('Qual seu destino?');
    await fireEvent(input, 'focus');

    await fireEvent(input, 'blur');
    expect(onBlur).not.toHaveBeenCalled();

    await waitFor(() => expect(onBlur).toHaveBeenCalledTimes(1));
    expect(screen.queryByText('Florianópolis, SC')).toBeNull();
  });

  it('does not fire onBlur when refocused before the pending close resolves', async () => {
    const onBlur = jest.fn();
    await render(<SearchInput value="Fl" options={OPTIONS} onBlur={onBlur} />);
    const input = screen.getByPlaceholderText('Qual seu destino?');
    await fireEvent(input, 'focus');
    await fireEvent(input, 'blur');
    await fireEvent(input, 'focus');

    await new Promise((resolve) => setTimeout(resolve, 200));
    expect(onBlur).not.toHaveBeenCalled();
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
    await fireEvent(screen.getByPlaceholderText('Qual seu destino?'), 'focus');
    await fireEvent.press(screen.getByText('Recife, PE'));
    expect(onSelectOption).toHaveBeenCalledWith('recife');
  });

  it('keeps suggestions tappable with the keyboard open (regressão: exigia 2 toques)', async () => {
    await render(<SearchInput value="Re" options={OPTIONS} />);
    await fireEvent(screen.getByPlaceholderText('Qual seu destino?'), 'focus');
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
