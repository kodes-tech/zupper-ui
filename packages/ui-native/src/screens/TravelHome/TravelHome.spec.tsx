import { render, screen, fireEvent } from '@testing-library/react-native';
import { TravelHome } from './TravelHome';

describe('TravelHome', () => {
  it('renders the initial state: greeting, placeholders and default travelers', async () => {
    await render(<TravelHome />);
    expect(screen.getByText('Olá, viajante')).toBeOnTheScreen();
    expect(screen.getByText('O que você deseja buscar?')).toBeOnTheScreen();
    expect(screen.getByText('Qual sua origem ?')).toBeOnTheScreen();
    expect(screen.getByText('Qual seu destino ?')).toBeOnTheScreen();
    expect(screen.getByText('Data de ida e volta')).toBeOnTheScreen();
    expect(screen.getByText('1 Viajante, econômica')).toBeOnTheScreen();
  });

  it('renders filled endpoints with their floating labels', async () => {
    await render(
      <TravelHome
        origin={{ city: 'São Paulo, SP', airport: 'GRU - Aeroporto de Guarulhos, SP' }}
        destination={{ city: 'Recife, PE', airport: 'REC - Aeroporto Internacional do Recife, PE' }}
        dates="10 Set 26 - 20 Set 26"
      />,
    );
    expect(screen.getByText('São Paulo, SP')).toBeOnTheScreen();
    expect(screen.getByText('GRU - Aeroporto de Guarulhos, SP')).toBeOnTheScreen();
    expect(screen.getByText('Recife, PE')).toBeOnTheScreen();
    expect(screen.getByText('10 Set 26 - 20 Set 26')).toBeOnTheScreen();
  });

  it('shows the one-way date placeholder for tripType soIda', async () => {
    await render(<TravelHome tripType="soIda" />);
    expect(screen.getByText('Data de ida')).toBeOnTheScreen();
  });

  it('fires the tab, trip type and field callbacks', async () => {
    const onSelectProductTab = jest.fn();
    const onChangeTripType = jest.fn();
    const onPressOrigin = jest.fn();
    await render(
      <TravelHome
        onSelectProductTab={onSelectProductTab}
        onChangeTripType={onChangeTripType}
        onPressOrigin={onPressOrigin}
      />,
    );
    await fireEvent.press(screen.getByText('Hospedagens'));
    expect(onSelectProductTab).toHaveBeenCalledWith('hospedagens');
    await fireEvent.press(screen.getByText('Só Ida'));
    expect(onChangeTripType).toHaveBeenCalledWith('soIda');
    await fireEvent.press(screen.getByText('Qual sua origem ?'));
    expect(onPressOrigin).toHaveBeenCalledTimes(1);
  });

  it('renders the search history section only when there are items', async () => {
    const onPressHistoryItem = jest.fn();
    const { rerender } = await render(<TravelHome />);
    expect(screen.queryByText('Pesquisas recentes')).toBeNull();

    await rerender(
      <TravelHome
        searchHistory={[{ id: 'rec', type: 'voo', destination: 'Recife', dates: '10 set - 20 set' }]}
        onPressHistoryItem={onPressHistoryItem}
      />,
    );
    expect(screen.getByText('Pesquisas recentes')).toBeOnTheScreen();
    await fireEvent.press(screen.getByRole('button', { name: 'Pesquisar Recife' }));
    expect(onPressHistoryItem).toHaveBeenCalledWith('rec');
  });

  it('only exposes the search action when canSearch is true', async () => {
    const onSearch = jest.fn();
    const { rerender } = await render(<TravelHome onSearch={onSearch} />);
    // desabilitado: sem Pressable de pesquisar
    expect(screen.queryByRole('button', { name: 'Pesquisar' })).toBeNull();

    await rerender(<TravelHome canSearch onSearch={onSearch} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Pesquisar' }));
    expect(onSearch).toHaveBeenCalledTimes(1);
  });
});
