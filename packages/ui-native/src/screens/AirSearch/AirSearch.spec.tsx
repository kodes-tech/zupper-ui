import { render, screen, fireEvent } from '@testing-library/react-native';
import { AirSearch } from './AirSearch';

describe('AirSearch', () => {
  it('renders the title and the empty-state fields', async () => {
    await render(<AirSearch />);
    expect(screen.getByText('Voos')).toBeOnTheScreen();
    expect(screen.getByText('Qual sua origem ?')).toBeOnTheScreen();
    expect(screen.getByText('Qual seu destino ?')).toBeOnTheScreen();
    expect(screen.getByText('Data de ida e volta')).toBeOnTheScreen();
    expect(screen.getByText('Viajantes / classe')).toBeOnTheScreen();
  });

  it('renders filled field values with their labels', async () => {
    await render(
      <AirSearch
        origin={{ city: 'São Paulo, SP', airport: 'GRU - Aeroporto Internacional de Guarulhos' }}
        destination={{ city: 'Recife, PE', airport: 'REC - Aeroporto Internacional do Recife' }}
        dates="10 Set 26 - 20 Set 26"
        travelers="2 Viajantes, econômica"
      />,
    );
    expect(screen.getByText('São Paulo, SP')).toBeOnTheScreen();
    expect(screen.getByText('GRU - Aeroporto Internacional de Guarulhos')).toBeOnTheScreen();
    expect(screen.getByText('Recife, PE')).toBeOnTheScreen();
    expect(screen.getByText('10 Set 26 - 20 Set 26')).toBeOnTheScreen();
    expect(screen.getByText('2 Viajantes, econômica')).toBeOnTheScreen();
  });

  it('fires onBack, onSwapEndpoints and the field press callbacks', async () => {
    const onBack = jest.fn();
    const onPressOrigin = jest.fn();
    const onPressDestination = jest.fn();
    const onSwapEndpoints = jest.fn();
    const onPressDates = jest.fn();
    const onPressTravelers = jest.fn();
    await render(
      <AirSearch
        onBack={onBack}
        onPressOrigin={onPressOrigin}
        onPressDestination={onPressDestination}
        onSwapEndpoints={onSwapEndpoints}
        onPressDates={onPressDates}
        onPressTravelers={onPressTravelers}
      />,
    );
    await fireEvent.press(screen.getByLabelText('Voltar'));
    expect(onBack).toHaveBeenCalledTimes(1);
    await fireEvent.press(screen.getByText('Qual sua origem ?'));
    expect(onPressOrigin).toHaveBeenCalledTimes(1);
    await fireEvent.press(screen.getByText('Qual seu destino ?'));
    expect(onPressDestination).toHaveBeenCalledTimes(1);
    await fireEvent.press(screen.getByLabelText('Inverter origem e destino'));
    expect(onSwapEndpoints).toHaveBeenCalledTimes(1);
    await fireEvent.press(screen.getByText('Data de ida e volta'));
    expect(onPressDates).toHaveBeenCalledTimes(1);
    await fireEvent.press(screen.getByText('Viajantes / classe'));
    expect(onPressTravelers).toHaveBeenCalledTimes(1);
  });

  it('fires onSearch only when canSearch is true', async () => {
    const onSearch = jest.fn();
    const { rerender } = await render(<AirSearch canSearch={false} onSearch={onSearch} />);
    await fireEvent.press(screen.getByLabelText('Pesquisar'));
    expect(onSearch).not.toHaveBeenCalled();

    await rerender(<AirSearch canSearch onSearch={onSearch} />);
    await fireEvent.press(screen.getByLabelText('Pesquisar'));
    expect(onSearch).toHaveBeenCalledTimes(1);
  });
});
