import { render, screen, fireEvent } from '@testing-library/react-native';
import { HotelRoomCard } from './HotelRoomCard';
import type { HotelRoomOptionData } from './HotelRoomCard';

const option: HotelRoomOptionData = {
  id: 'r1',
  title: 'Quarto 1',
  rooms: [
    {
      name: 'Superior Vista Mar',
      description: 'Cama king, 28m²',
      cancellation: { text: 'Cancelamento grátis até 08/09', tone: 'success' },
    },
  ],
  checkIn: 'Ter, 10 Set - 14:00',
  checkOut: 'Sex, 20 Set - 12:00',
  guestsSummary: '1 quarto, 2 adultos',
  priceLabel: 'A partir de 10 noites + taxas',
  price: 'R$ 3.480',
  totalNote: 'Total de R$ 3.480 + taxas',
};

describe('HotelRoomCard', () => {
  it('renders the room details', async () => {
    await render(<HotelRoomCard option={option} />);
    expect(screen.getByText('Quarto 1')).toBeOnTheScreen();
    expect(screen.getByText('Superior Vista Mar')).toBeOnTheScreen();
    expect(screen.getByText('Cancelamento grátis até 08/09')).toBeOnTheScreen();
    expect(screen.getByText('Total de R$ 3.480 + taxas')).toBeOnTheScreen();
  });

  it('shows "Selecionar quarto" when not selected and fires onSelect', async () => {
    const onSelect = jest.fn();
    await render(<HotelRoomCard option={option} onSelect={onSelect} />);
    await fireEvent.press(screen.getByText('Selecionar quarto'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('shows the selected state label', async () => {
    await render(<HotelRoomCard option={{ ...option, selected: true }} />);
    expect(screen.getByText('Quarto selecionado')).toBeOnTheScreen();
  });

  it('uses combo wording when kind is combo', async () => {
    await render(<HotelRoomCard option={option} kind="combo" />);
    expect(screen.getByText('Selecionar combo')).toBeOnTheScreen();
  });
});
