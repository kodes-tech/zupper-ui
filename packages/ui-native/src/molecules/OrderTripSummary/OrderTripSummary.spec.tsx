import { render, screen } from '@testing-library/react-native';
import { OrderTripSummary } from './OrderTripSummary';

const base = {
  destination: 'Recife, Pernambuco',
  people: '2 adultos · 1 criança',
  dates: '12 jul - 19 jul',
};

describe('OrderTripSummary', () => {
  it('renders destination, people and dates', async () => {
    await render(<OrderTripSummary {...base} />);
    expect(screen.getByText('Recife, Pernambuco')).toBeOnTheScreen();
    expect(screen.getByText('2 adultos · 1 criança')).toBeOnTheScreen();
    expect(screen.getByText('12 jul - 19 jul')).toBeOnTheScreen();
  });

  it('shows the placeholder when there is no image', async () => {
    await render(<OrderTripSummary {...base} />);
    expect(screen.getByText('Recife, Pernambuco')).toBeOnTheScreen();
  });
});
