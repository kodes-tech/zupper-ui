import { render, screen, fireEvent } from '@testing-library/react-native';
import { SliceDetails } from './SliceDetails';
import type { FlightSegmentDetailProps } from '../../organisms/FlightSegmentDetail';

const outbound: FlightSegmentDetailProps = {
  direction: 'ida',
  date: 'Quarta-feira, 15 de julho de 2026',
  airline: 'LATAM',
  flightNumber: 'LA3456',
  fareClass: 'Econômica',
  aircraftModel: 'Airbus A320',
  origin: {
    code: 'GRU',
    description: 'Aeroporto Internacional de Guarulhos',
    city: 'São Paulo, SP',
    weekday: 'Qua, 15 Jul',
    time: '23:30',
  },
  destination: {
    code: 'REC',
    description: 'Aeroporto Internacional do Recife',
    city: 'Recife, PE',
    weekday: 'Qui, 16 Jul',
    time: '02:30',
  },
  duration: '3h00',
};

describe('SliceDetails', () => {
  it('renders the header, the segment and the baggage section', async () => {
    await render(
      <SliceDetails segments={[outbound]} baggage={{ schoolbag: true, suitcase: true, handbag: false }} />,
    );
    expect(screen.getByText('Detalhes do Voo')).toBeOnTheScreen();
    expect(screen.getByText('Voo de ida')).toBeOnTheScreen();
    expect(screen.getByText('Bagagem')).toBeOnTheScreen();
    expect(screen.getByText('Inclui uma mochila ou bolsa')).toBeOnTheScreen();
    expect(screen.getByText('Inclui bagagem de mão')).toBeOnTheScreen();
    expect(screen.getByText('Não inclui bagagem para despachar')).toBeOnTheScreen();
  });

  it('renders a connection notice between segments when provided', async () => {
    const secondSegment = { ...outbound, direction: 'volta' as const };
    await render(
      <SliceDetails
        segments={[outbound, secondSegment]}
        connections={[{ waitTime: '2h15', destination: 'Recife', hasAircraftChange: true }]}
        baggage={{ schoolbag: true, suitcase: true, handbag: false }}
      />,
    );
    expect(screen.getByText('Troca de aeronave: Espera de 2h15 em Recife')).toBeOnTheScreen();
  });

  it('fires onBack, onShare and onPressCancellationPolicy', async () => {
    const onBack = jest.fn();
    const onShare = jest.fn();
    const onPressCancellationPolicy = jest.fn();
    await render(
      <SliceDetails
        segments={[outbound]}
        baggage={{ schoolbag: true, suitcase: true, handbag: false }}
        onBack={onBack}
        onShare={onShare}
        onPressCancellationPolicy={onPressCancellationPolicy}
      />,
    );
    await fireEvent.press(screen.getByLabelText('Voltar'));
    expect(onBack).toHaveBeenCalledTimes(1);
    await fireEvent.press(screen.getByLabelText('Compartilhar'));
    expect(onShare).toHaveBeenCalledTimes(1);
    await fireEvent.press(screen.getByText('Ver política de cancelamento'));
    expect(onPressCancellationPolicy).toHaveBeenCalledTimes(1);
  });
});
