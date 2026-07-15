import { render, screen, fireEvent } from '@testing-library/react-native';
import { PackageResultCard } from './PackageResultCard';
import type { PackageResultCardData } from './PackageResultCard';

const data: PackageResultCardData = {
  hotelName: 'Hotel Bourbon São Paulo Convention',
  roomInfo: 'Quarto Basic (2 Adultos)',
  segments: [
    {
      direction: 'ida',
      originCode: 'FLN',
      destinationCode: 'CGH',
      airlineCode: 'G3',
      stopsLabel: '3 paradas',
      departureTime: '11:30',
      arrivalTime: '13:20',
      date: '20 Ago 2024',
    },
    {
      direction: 'volta',
      originCode: 'CGH',
      destinationCode: 'FLN',
      airlineCode: 'G3',
      stopsLabel: 'Direto',
      departureTime: '11:30',
      arrivalTime: '13:20',
      date: '24 Ago 2024',
    },
  ],
  priceLabel: 'Preço total do pacote',
  price: 'R$ 255,00',
  primaryCtaLabel: 'Escolher pacote Zupper',
};

describe('PackageResultCard', () => {
  it('renders hotel, segments and price', () => {
    render(<PackageResultCard data={data} />);
    expect(screen.getByText('Hotel Bourbon São Paulo Convention')).toBeOnTheScreen();
    expect(screen.getByText('Quarto Basic (2 Adultos)')).toBeOnTheScreen();
    expect(screen.getByText('IDA')).toBeOnTheScreen();
    expect(screen.getByText('VOLTA')).toBeOnTheScreen();
    expect(screen.getByText('R$ 255,00')).toBeOnTheScreen();
  });

  it('renders a single outline CTA when not featured', () => {
    const onPressPrimary = jest.fn();
    render(<PackageResultCard data={data} onPressPrimary={onPressPrimary} />);
    expect(screen.queryByText('PACOTE SUGERIDO')).toBeNull();
    fireEvent.press(screen.getByText('Escolher pacote Zupper'));
    expect(onPressPrimary).toHaveBeenCalledTimes(1);
  });

  it('renders the badge and both CTAs when featured', () => {
    const onPressPrimary = jest.fn();
    const onPressSecondary = jest.fn();
    render(
      <PackageResultCard
        featured
        data={{ ...data, primaryCtaLabel: 'Gostei! Quero este pacote', secondaryCtaLabel: 'Montar meu pacote' }}
        onPressPrimary={onPressPrimary}
        onPressSecondary={onPressSecondary}
      />,
    );
    expect(screen.getByText('PACOTE SUGERIDO')).toBeOnTheScreen();
    fireEvent.press(screen.getByText('Gostei! Quero este pacote'));
    expect(onPressPrimary).toHaveBeenCalledTimes(1);
    fireEvent.press(screen.getByText('Montar meu pacote'));
    expect(onPressSecondary).toHaveBeenCalledTimes(1);
  });
});
