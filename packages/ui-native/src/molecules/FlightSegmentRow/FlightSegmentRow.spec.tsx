import { render, screen } from '@testing-library/react-native';
import { FlightSegmentRow } from './FlightSegmentRow';
import type { FlightSegmentData } from './FlightSegmentRow';

const ida: FlightSegmentData = {
  direction: 'ida',
  originCode: 'FLN',
  destinationCode: 'CGH',
  airlineCode: 'G3',
  stopsLabel: '3 paradas',
  departureTime: '11:30',
  arrivalTime: '13:20',
  date: '20 Ago 2024',
};

describe('FlightSegmentRow', () => {
  it('renders the segment details', async () => {
    await render(<FlightSegmentRow segment={ida} />);
    expect(screen.getByText('IDA')).toBeOnTheScreen();
    expect(screen.getByText('G3')).toBeOnTheScreen();
    expect(screen.getByText('FLN')).toBeOnTheScreen();
    expect(screen.getByText('CGH')).toBeOnTheScreen();
    expect(screen.getByText('3 paradas')).toBeOnTheScreen();
    expect(screen.getByText('11:30')).toBeOnTheScreen();
    expect(screen.getByText('13:20')).toBeOnTheScreen();
    expect(screen.getByText('20 Ago 2024')).toBeOnTheScreen();
  });

  it('shows VOLTA for the return direction', async () => {
    await render(<FlightSegmentRow segment={{ ...ida, direction: 'volta' }} />);
    expect(screen.getByText('VOLTA')).toBeOnTheScreen();
  });
});
