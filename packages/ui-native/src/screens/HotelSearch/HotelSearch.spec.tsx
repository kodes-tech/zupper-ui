import { render, screen, fireEvent } from '@testing-library/react-native';
import { HotelSearch } from './HotelSearch';

describe('HotelSearch', () => {
  it('renders the title and the empty-state fields', async () => {
    await render(<HotelSearch />);
    expect(screen.getByText('Hospedagens')).toBeOnTheScreen();
    expect(screen.getByText('Qual seu destino ?')).toBeOnTheScreen();
    expect(screen.getByText('Datas de entrada e saída')).toBeOnTheScreen();
    expect(screen.getByText('1 Adulto, 1 Quarto')).toBeOnTheScreen();
  });

  it('renders filled field values with their labels', async () => {
    await render(
      <HotelSearch destination="Recife - PE" dates="10 Set 26 - 20 Set 26" travelers="2 Adultos, 1 Quarto" />,
    );
    expect(screen.getByText('Recife - PE')).toBeOnTheScreen();
    expect(screen.getByText('10 Set 26 - 20 Set 26')).toBeOnTheScreen();
    expect(screen.getByText('2 Adultos, 1 Quarto')).toBeOnTheScreen();
    expect(screen.getByText('Hóspedes')).toBeOnTheScreen();
  });

  it('fires onBack and the field press callbacks', async () => {
    const onBack = jest.fn();
    const onPressDestination = jest.fn();
    const onPressDates = jest.fn();
    const onPressTravelers = jest.fn();
    await render(
      <HotelSearch
        onBack={onBack}
        onPressDestination={onPressDestination}
        onPressDates={onPressDates}
        onPressTravelers={onPressTravelers}
      />,
    );
    await fireEvent.press(screen.getByLabelText('Voltar'));
    expect(onBack).toHaveBeenCalledTimes(1);
    await fireEvent.press(screen.getByText('Qual seu destino ?'));
    expect(onPressDestination).toHaveBeenCalledTimes(1);
    await fireEvent.press(screen.getByText('Datas de entrada e saída'));
    expect(onPressDates).toHaveBeenCalledTimes(1);
    await fireEvent.press(screen.getByText('1 Adulto, 1 Quarto'));
    expect(onPressTravelers).toHaveBeenCalledTimes(1);
  });

  it('fires onSearch only when canSearch is true', async () => {
    const onSearch = jest.fn();
    const { rerender } = await render(<HotelSearch canSearch={false} onSearch={onSearch} />);
    await fireEvent.press(screen.getByText('Pesquisar hospedagens'));
    expect(onSearch).not.toHaveBeenCalled();

    await rerender(<HotelSearch canSearch onSearch={onSearch} />);
    await fireEvent.press(screen.getByText('Pesquisar hospedagens'));
    expect(onSearch).toHaveBeenCalledTimes(1);
  });
});
