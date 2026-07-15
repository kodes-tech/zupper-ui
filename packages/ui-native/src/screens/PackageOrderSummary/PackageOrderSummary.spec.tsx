import { render, screen, fireEvent } from '@testing-library/react-native';
import { PackageOrderSummary } from './PackageOrderSummary';
import type { PackageOrderSummaryProps } from './PackageOrderSummary';

const itinerary = {
  direction: 'ida' as const,
  headerDate: 'Qua, 24 de maio 2024',
  airline: 'Gol airlines',
  airlineCode: 'G3',
  operatedBy: 'Latam Airlines',
  flightNumber: 'LA522',
  travelClass: 'Econômica',
  aircraft: 'Boeing 747',
  departureTime: '11:30',
  departureCity: 'Florianópolis, SC',
  departureDate: 'Qua, 24 maio',
  arrivalTime: '12:55',
  arrivalCity: 'Congonhas, SP',
  arrivalDate: 'Qua, 24 maio',
  stopsLabel: 'Direto',
  duration: '1h50',
  originCode: 'FLN',
  originAirport: 'Aeroporto Hercílio Luz',
  destinationCode: 'CGH',
  destinationAirport: 'Aeroporto de Congonhas',
};

const baggage = [
  {
    icon: 'baggage-backpack' as const,
    label: 'Inclui uma mochila ou bolsa',
    description: 'Abaixo do assento dianteiro.',
    included: true,
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
  flights: [
    { itinerary, baggage },
    { itinerary: { ...itinerary, direction: 'volta' }, baggage },
  ],
  footer: { roomInfo: 'Quarto Basic (2 Adultos)', priceLabel: 'Pacote - 2 adultos (3 dias)', price: 'R$ 2.550' },
};

describe('PackageOrderSummary', () => {
  it('renders all the order sections', async () => {
    await render(<PackageOrderSummary {...baseProps} />);
    expect(screen.getByText('Detalhes do pacote')).toBeOnTheScreen();
    expect(screen.getByText('Sua compra')).toBeOnTheScreen();
    expect(screen.getByText('Viajantes')).toBeOnTheScreen();
    expect(screen.getByText('Voo de ida')).toBeOnTheScreen();
    expect(screen.getByText('Voo de volta')).toBeOnTheScreen();
    // um card de bagagem por voo
    expect(screen.getAllByText('Bagagem')).toHaveLength(2);
    expect(screen.getByText('Quarto 1')).toBeOnTheScreen();
    expect(screen.getByText('Informações relevantes')).toBeOnTheScreen();
    expect(screen.getByText('Próximo')).toBeOnTheScreen();
  });

  it('fires back, policy and continue callbacks', async () => {
    const onBack = jest.fn();
    const onPressPolicies = jest.fn();
    const onContinue = jest.fn();
    await render(
      <PackageOrderSummary
        {...baseProps}
        onBack={onBack}
        onPressPolicies={onPressPolicies}
        onContinue={onContinue}
      />,
    );
    await fireEvent.press(screen.getByRole('button', { name: 'Voltar' }));
    expect(onBack).toHaveBeenCalledTimes(1);
    await fireEvent.press(screen.getByRole('button', { name: 'Políticas de acomodações' }));
    expect(onPressPolicies).toHaveBeenCalledTimes(1);
    await fireEvent.press(screen.getByText('Próximo'));
    expect(onContinue).toHaveBeenCalledTimes(1);
  });
});
