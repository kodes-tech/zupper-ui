import { render, screen, fireEvent } from '@testing-library/react-native';
import { TravelHome } from './TravelHome';

describe('TravelHome', () => {
  it('renders the initial state: greeting, placeholders and default travelers', () => {
    render(<TravelHome />);
    expect(screen.getByText('Olá, viajante')).toBeOnTheScreen();
    expect(screen.getByText('O que você deseja buscar?')).toBeOnTheScreen();
    expect(screen.getByText('Qual sua origem ?')).toBeOnTheScreen();
    expect(screen.getByText('Qual seu destino ?')).toBeOnTheScreen();
    expect(screen.getByText('Data de ida e volta')).toBeOnTheScreen();
    expect(screen.getByText('1 Viajante, econômica')).toBeOnTheScreen();
  });

  it('renders filled endpoints with their floating labels', () => {
    render(
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

  it('shows the one-way date placeholder for tripType soIda', () => {
    render(<TravelHome tripType="soIda" />);
    expect(screen.getByText('Data de ida')).toBeOnTheScreen();
  });

  it('fires the tab, trip type and field callbacks', () => {
    const onSelectProductTab = jest.fn();
    const onChangeTripType = jest.fn();
    const onPressOrigin = jest.fn();
    render(
      <TravelHome
        onSelectProductTab={onSelectProductTab}
        onChangeTripType={onChangeTripType}
        onPressOrigin={onPressOrigin}
      />,
    );
    fireEvent.press(screen.getByText('Hospedagens'));
    expect(onSelectProductTab).toHaveBeenCalledWith('hospedagens');
    fireEvent.press(screen.getByText('Só Ida'));
    expect(onChangeTripType).toHaveBeenCalledWith('soIda');
    fireEvent.press(screen.getByText('Qual sua origem ?'));
    expect(onPressOrigin).toHaveBeenCalledTimes(1);
  });

  it('renders the search history section only when there are items', () => {
    const onPressHistoryItem = jest.fn();
    const { rerender } = render(<TravelHome />);
    expect(screen.queryByText('Pesquisas recentes')).toBeNull();

    rerender(
      <TravelHome
        searchHistory={[{ id: 'rec', type: 'voo', destination: 'Recife', dates: '10 set - 20 set' }]}
        onPressHistoryItem={onPressHistoryItem}
      />,
    );
    expect(screen.getByText('Pesquisas recentes')).toBeOnTheScreen();
    fireEvent.press(screen.getByRole('button', { name: 'Pesquisar Recife' }));
    expect(onPressHistoryItem).toHaveBeenCalledWith('rec');
  });

  it('renders the hotel engine on the hospedagens tab', () => {
    const onSearch = jest.fn();
    render(
      <TravelHome
        productTab="hospedagens"
        stay={{
          destination: 'Recife, PE',
          dates: '10 Set 26 - 20 Set 26',
          guests: '2 Adultos, 1 Quarto',
          canSearch: true,
          onSearch,
        }}
      />,
    );
    // campos de hotel presentes; campos de voo ausentes
    expect(screen.getByText('Recife, PE')).toBeOnTheScreen();
    expect(screen.getByText('2 Adultos, 1 Quarto')).toBeOnTheScreen();
    expect(screen.queryByText('Qual sua origem ?')).toBeNull();
    fireEvent.press(screen.getByRole('button', { name: 'Pesquisar hospedagens' }));
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it('shows placeholders and disabled CTA on the empty hospedagens tab', () => {
    render(<TravelHome productTab="hospedagens" />);
    expect(screen.getByText('Qual seu destino ?')).toBeOnTheScreen();
    expect(screen.getByText('Datas de entrada e saída')).toBeOnTheScreen();
    expect(screen.getByText('1 Adulto, 1 Quarto')).toBeOnTheScreen();
    expect(screen.queryByRole('button', { name: 'Pesquisar hospedagens' })).toBeNull();
  });

  it('renders the webview note on the pacotes tab', () => {
    render(<TravelHome productTab="pacotes" />);
    expect(screen.getByText('Os pacotes abrem no site do Zupper.')).toBeOnTheScreen();
    expect(screen.queryByText('Qual sua origem ?')).toBeNull();
  });

  it('only exposes the search action when canSearch is true', () => {
    const onSearch = jest.fn();
    const { rerender } = render(<TravelHome onSearch={onSearch} />);
    // desabilitado: sem Pressable de pesquisar
    expect(screen.queryByRole('button', { name: 'Pesquisar' })).toBeNull();

    rerender(<TravelHome canSearch onSearch={onSearch} />);
    fireEvent.press(screen.getByRole('button', { name: 'Pesquisar' }));
    expect(onSearch).toHaveBeenCalledTimes(1);
  });
});
