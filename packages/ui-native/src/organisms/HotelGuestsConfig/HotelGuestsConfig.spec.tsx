import { render, screen, fireEvent } from '@testing-library/react-native';
import { HotelGuestsConfig } from './HotelGuestsConfig';

describe('HotelGuestsConfig', () => {
  it('renders the room, adults, children and the apply footer', async () => {
    await render(<HotelGuestsConfig rooms={[{ adultQty: 1, childAges: [] }]} />);
    expect(screen.getByText('Viajantes e Classe de voo')).toBeOnTheScreen();
    expect(screen.getByText('Quarto 1')).toBeOnTheScreen();
    expect(screen.getByText('Adultos')).toBeOnTheScreen();
    expect(screen.getByText('Crianças')).toBeOnTheScreen();
    expect(screen.getByText('Aplicar filtros')).toBeOnTheScreen();
  });

  it('renders one age selector per child with the correct label', async () => {
    await render(<HotelGuestsConfig rooms={[{ adultQty: 1, childAges: [0, 8] }]} />);
    expect(screen.getByText('Idade da criança 1')).toBeOnTheScreen();
    expect(screen.getByText('Até 1 ano')).toBeOnTheScreen();
    expect(screen.getByText('Idade da criança 2')).toBeOnTheScreen();
    expect(screen.getByText('8 anos')).toBeOnTheScreen();
  });

  it('only shows "Remover quarto" when there is more than one room', async () => {
    const { rerender } = await render(<HotelGuestsConfig rooms={[{ adultQty: 1, childAges: [] }]} />);
    expect(screen.queryByText('Remover quarto')).toBeNull();

    await rerender(
      <HotelGuestsConfig
        rooms={[
          { adultQty: 1, childAges: [] },
          { adultQty: 1, childAges: [] },
        ]}
      />,
    );
    expect(screen.getAllByText('Remover quarto')).toHaveLength(2);
  });

  it('fires the stepper and apply callbacks', async () => {
    const onIncrementAdults = jest.fn();
    const onApply = jest.fn();
    await render(
      <HotelGuestsConfig
        rooms={[{ adultQty: 1, childAges: [] }]}
        onIncrementAdults={onIncrementAdults}
        onApply={onApply}
      />,
    );
    await fireEvent.press(screen.getByRole('button', { name: 'Aumentar Adultos do quarto 1' }));
    expect(onIncrementAdults).toHaveBeenCalledWith(0);
    await fireEvent.press(screen.getByText('Aplicar filtros'));
    expect(onApply).toHaveBeenCalledTimes(1);
  });

  it('renders the validation error', async () => {
    await render(
      <HotelGuestsConfig rooms={[{ adultQty: 1, childAges: [] }]} error="Selecione ao menos 1 hóspede" />,
    );
    expect(screen.getByText('Selecione ao menos 1 hóspede')).toBeOnTheScreen();
  });
});
