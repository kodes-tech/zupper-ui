import { render, screen, fireEvent } from '@testing-library/react-native';
import { PackageHotelDetails } from './PackageHotelDetails';
import type { PackageHotelDetailsProps } from './PackageHotelDetails';

const segments = [
  {
    direction: 'ida' as const,
    originCode: 'FLN',
    destinationCode: 'CGH',
    airlineCode: 'G3',
    stopsLabel: '3 paradas',
    departureTime: '11:30',
    arrivalTime: '13:20',
    date: '20 Ago 2024',
  },
  {
    direction: 'volta' as const,
    originCode: 'CGH',
    destinationCode: 'FLN',
    airlineCode: 'G3',
    stopsLabel: 'Direto',
    departureTime: '11:30',
    arrivalTime: '13:20',
    date: '24 Ago 2024',
  },
];

const baseProps: PackageHotelDetailsProps = {
  name: 'Bourbon São Paulo Ibirapuera',
  headerSubtitle: 'São Paulo, SP',
  checkIn: 'Qua, 20 Ago',
  checkOut: 'Sáb, 24 Ago',
  guestsSummary: '1 quarto, 2 adultos',
  priceLabel: 'Preço para 3 diárias',
  price: 'R$ 1.234',
  address: 'Av. Ibirapuera, 2927',
  description: 'Um hotel confortável no coração de São Paulo.',
  amenities: ['Wi-Fi', 'Piscina', 'Estacionamento'],
  reviews: {
    stars: 3,
    ratingLabel: 'Bom 7,0',
    categories: [
      { label: 'Comodidades', value: 7 },
      { label: 'Limpeza', value: 7 },
    ],
  },
  testimonials: [{ id: '1', name: 'Jéssica M.', initials: 'JM', flag: '🇧🇷', quote: 'Ótima estadia.' }],
  footer: {
    roomInfo: 'Quarto Basic (2 Adultos)',
    segments,
    priceLabel: 'Pacote - 2 adultos (3 dias)',
    price: 'R$ 255,00',
  },
};

describe('PackageHotelDetails', () => {
  it('renders header, sections and footer', () => {
    render(<PackageHotelDetails {...baseProps} />);
    expect(screen.getAllByText('Bourbon São Paulo Ibirapuera').length).toBeGreaterThan(0);
    expect(screen.getByText('Descrição')).toBeOnTheScreen();
    expect(screen.getByText('Comodidades do local')).toBeOnTheScreen();
    expect(screen.getByText('Avaliações')).toBeOnTheScreen();
    expect(screen.getByText('O que os hóspedes dizem')).toBeOnTheScreen();
    expect(screen.getByText('Informações relevantes')).toBeOnTheScreen();
    expect(screen.getByText('Políticas de acomodações')).toBeOnTheScreen();
    expect(screen.getByText('Próximo')).toBeOnTheScreen();
  });

  it('hides reviews and testimonials when not provided', () => {
    render(<PackageHotelDetails {...baseProps} reviews={undefined} testimonials={undefined} />);
    expect(screen.queryByText('Avaliações')).toBeNull();
    expect(screen.queryByText('O que os hóspedes dizem')).toBeNull();
  });

  it('fires back, policy and continue callbacks', () => {
    const onBack = jest.fn();
    const onPressPolicies = jest.fn();
    const onContinue = jest.fn();
    render(
      <PackageHotelDetails
        {...baseProps}
        onBack={onBack}
        onPressPolicies={onPressPolicies}
        onContinue={onContinue}
      />,
    );
    fireEvent.press(screen.getByRole('button', { name: 'Voltar' }));
    expect(onBack).toHaveBeenCalledTimes(1);
    fireEvent.press(screen.getByRole('button', { name: 'Políticas de acomodações' }));
    expect(onPressPolicies).toHaveBeenCalledTimes(1);
    fireEvent.press(screen.getByText('Próximo'));
    expect(onContinue).toHaveBeenCalledTimes(1);
  });
});
