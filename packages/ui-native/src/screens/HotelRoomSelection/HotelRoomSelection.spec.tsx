import { render, screen, fireEvent } from '@testing-library/react-native';
import { HotelRoomSelection } from './HotelRoomSelection';
import type { HotelRoomOptionData } from '../../organisms/HotelRoomCard';

const options: HotelRoomOptionData[] = [
  {
    id: 'r1',
    title: 'Quarto 1',
    rooms: [{ name: 'Superior Vista Mar' }],
    checkIn: 'Ter, 10 Set - 14:00',
    checkOut: 'Sex, 20 Set - 12:00',
    guestsSummary: '1 quarto, 2 adultos',
    priceLabel: 'A partir de 10 noites + taxas',
    price: 'R$ 3.480',
    totalNote: 'Total de R$ 3.480 + taxas',
  },
];

describe('HotelRoomSelection', () => {
  it('renders the hotel name, title and room options', () => {
    render(<HotelRoomSelection hotelName="Hotel Boa Viagem Praia" options={options} />);
    expect(screen.getByText('Hotel Boa Viagem Praia')).toBeOnTheScreen();
    expect(screen.getByText('Escolha o Quarto')).toBeOnTheScreen();
    expect(screen.getByText('Quarto 1')).toBeOnTheScreen();
  });

  it('disables the footer CTA until an option is selected', () => {
    const onContinue = jest.fn();
    render(<HotelRoomSelection hotelName="Hotel" options={options} onContinue={onContinue} />);
    fireEvent.press(screen.getByText('Escolher Quarto'));
    expect(onContinue).not.toHaveBeenCalled();
  });

  it('shows the summary and enables the CTA when selectedSummary is present', () => {
    const onContinue = jest.fn();
    render(
      <HotelRoomSelection
        hotelName="Hotel"
        options={options}
        selectedSummary={{ nightsLabel: '10 noites - Quarto 1', price: 'R$ 3.480' }}
        onContinue={onContinue}
      />,
    );
    expect(screen.getByText('10 noites - Quarto 1')).toBeOnTheScreen();
    fireEvent.press(screen.getByText('Ir para pagamento'));
    expect(onContinue).toHaveBeenCalledTimes(1);
  });

  it('fires onSelectOption with the option id', () => {
    const onSelectOption = jest.fn();
    render(<HotelRoomSelection hotelName="Hotel" options={options} onSelectOption={onSelectOption} />);
    fireEvent.press(screen.getByText('Selecionar quarto'));
    expect(onSelectOption).toHaveBeenCalledWith('r1');
  });
});
