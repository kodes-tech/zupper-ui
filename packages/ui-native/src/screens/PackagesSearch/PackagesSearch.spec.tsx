import { render, screen, fireEvent } from '@testing-library/react-native';
import { PackagesSearch } from './PackagesSearch';

describe('PackagesSearch', () => {
  it('renders placeholders in the initial empty state', async () => {
    await render(<PackagesSearch />);
    expect(screen.getByText('Destino')).toBeOnTheScreen();
    expect(screen.getByText('Origem')).toBeOnTheScreen();
    expect(screen.getByText('Data')).toBeOnTheScreen();
    expect(screen.getByText('Se cadastre para ter uma melhor experiência')).toBeOnTheScreen();
  });

  it('renders filled values', async () => {
    await render(
      <PackagesSearch
        destination="Salvador, BA"
        origin="São Paulo, SP"
        dates="20 Ago - 24 Ago"
        travelers="2 Viajantes"
      />,
    );
    expect(screen.getByText('Salvador, BA')).toBeOnTheScreen();
    expect(screen.getByText('São Paulo, SP')).toBeOnTheScreen();
    expect(screen.getByText('20 Ago - 24 Ago')).toBeOnTheScreen();
    expect(screen.getByText('2 Viajantes')).toBeOnTheScreen();
  });

  it('hides the register CTA when authenticated', async () => {
    await render(<PackagesSearch isAuthenticated />);
    expect(screen.queryByText('Se cadastre para ter uma melhor experiência')).toBeNull();
  });

  it('fires the field and swap callbacks', async () => {
    const onPressDestination = jest.fn();
    const onSwapEndpoints = jest.fn();
    const onBack = jest.fn();
    await render(
      <PackagesSearch
        onPressDestination={onPressDestination}
        onSwapEndpoints={onSwapEndpoints}
        onBack={onBack}
      />,
    );
    await fireEvent.press(screen.getByText('Destino'));
    expect(onPressDestination).toHaveBeenCalledTimes(1);
    await fireEvent.press(screen.getByRole('button', { name: 'Inverter origem e destino' }));
    expect(onSwapEndpoints).toHaveBeenCalledTimes(1);
    await fireEvent.press(screen.getByRole('button', { name: 'Voltar' }));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('only fires the search action when canSearch is true', async () => {
    const onSearch = jest.fn();
    const { rerender } = await render(<PackagesSearch onSearch={onSearch} />);
    await fireEvent.press(screen.getByText('Pesquisar Pacotes'));
    expect(onSearch).not.toHaveBeenCalled();

    await rerender(<PackagesSearch canSearch onSearch={onSearch} />);
    await fireEvent.press(screen.getByText('Pesquisar Pacotes'));
    expect(onSearch).toHaveBeenCalledTimes(1);
  });
});
