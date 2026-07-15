import { render, screen, fireEvent } from '@testing-library/react-native';
import { PackageOrderSummary } from './PackageOrderSummary';
import type { PackageOrderSummaryProps } from './PackageOrderSummary';

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

const baseProps: PackageOrderSummaryProps = {
  purchase: {
    items: [
      { label: 'Tarifa por adulto', value: 'R$ 654,51' },
      { label: 'Taxas e impostos', value: 'R$ 39,00' },
    ],
    total: 'R$ 1.255,12',
  },
  travelers: [{ role: 'Adulto 1 (Quarto 1)', details: 'Maria Joaquina Silva, 30/11/1991' }],
  hotel: {
    name: 'Bourbon São Paulo Ibirapuera',
    starRating: 3,
    address: 'Av. Ibirapuera, 2927',
    distance: '5km do Centro',
    checkIn: 'Qua, 28 Dez 2024',
    checkOut: 'Qua, 02 Jan 2024',
    guestsSummary: '1 quarto, 2 adultos',
  },
  rooms: [{ title: 'Quarto 1', cancellation: 'Cancelamento grátis', amenities: ['Tamanho 41m²', 'Televisão'] }],
  segments,
  baggage: [
    {
      icon: 'baggage-backpack',
      label: 'Inclui uma mochila ou bolsa',
      description: 'Abaixo do assento dianteiro.',
      included: true,
    },
  ],
  footer: { roomInfo: 'Quarto Basic (2 Adultos)', priceLabel: 'Pacote - 2 adultos (3 dias)', price: 'R$ 2.550' },
};

describe('PackageOrderSummary', () => {
  it('renders all the order sections', () => {
    render(<PackageOrderSummary {...baseProps} />);
    expect(screen.getByText('Detalhes do pacote')).toBeOnTheScreen();
    expect(screen.getByText('Sua compra')).toBeOnTheScreen();
    expect(screen.getByText('Viajantes')).toBeOnTheScreen();
    expect(screen.getByText('Voos')).toBeOnTheScreen();
    expect(screen.getByText('Bagagem')).toBeOnTheScreen();
    expect(screen.getByText('Quarto 1')).toBeOnTheScreen();
    expect(screen.getByText('Informações relevantes')).toBeOnTheScreen();
    expect(screen.getByText('Próximo')).toBeOnTheScreen();
  });

  it('fires back, policy and continue callbacks', () => {
    const onBack = jest.fn();
    const onPressPolicies = jest.fn();
    const onContinue = jest.fn();
    render(
      <PackageOrderSummary
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
