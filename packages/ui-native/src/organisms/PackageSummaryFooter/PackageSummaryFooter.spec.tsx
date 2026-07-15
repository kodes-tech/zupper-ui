import { render, screen, fireEvent } from '@testing-library/react-native';
import { PackageSummaryFooter } from './PackageSummaryFooter';
import type { FlightSegmentData } from '../../molecules/FlightSegmentRow';

const segments: FlightSegmentData[] = [
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
];

const baseProps = {
  hotelName: 'Bourbon São Paulo Ibirapuera',
  roomInfo: 'Quarto Basic (2 Adultos)',
  segments,
  priceLabel: 'Pacote - 2 adultos (3 dias)',
  price: 'R$ 255,00',
};

describe('PackageSummaryFooter', () => {
  it('shows the price and CTA, collapsed by default', async () => {
    await render(<PackageSummaryFooter {...baseProps} />);
    expect(screen.getByText('Pacote - 2 adultos (3 dias)')).toBeOnTheScreen();
    expect(screen.getByText('R$ 255,00')).toBeOnTheScreen();
    expect(screen.getByText('Próximo')).toBeOnTheScreen();
    expect(screen.getByText('Ver detalhes')).toBeOnTheScreen();
    // recolhido: sem detalhamento de hotel/voos
    expect(screen.queryByText('IDA')).toBeNull();
  });

  it('reveals hotel and flight segments when expanded', async () => {
    await render(<PackageSummaryFooter {...baseProps} expanded />);
    expect(screen.getByText('Bourbon São Paulo Ibirapuera')).toBeOnTheScreen();
    expect(screen.getByText('IDA')).toBeOnTheScreen();
    expect(screen.getByText('VOLTA')).toBeOnTheScreen();
    expect(screen.getByText('Ocultar detalhes')).toBeOnTheScreen();
  });

  it('fires toggle, edit and continue callbacks', async () => {
    const onToggle = jest.fn();
    const onEdit = jest.fn();
    const onContinue = jest.fn();
    await render(
      <PackageSummaryFooter
        {...baseProps}
        expanded
        onToggle={onToggle}
        onEdit={onEdit}
        onContinue={onContinue}
      />,
    );
    await fireEvent.press(screen.getByRole('button', { name: 'Ocultar detalhes' }));
    expect(onToggle).toHaveBeenCalledTimes(1);
    await fireEvent.press(screen.getByRole('button', { name: 'Alterar' }));
    expect(onEdit).toHaveBeenCalledTimes(1);
    await fireEvent.press(screen.getByText('Próximo'));
    expect(onContinue).toHaveBeenCalledTimes(1);
  });
});
