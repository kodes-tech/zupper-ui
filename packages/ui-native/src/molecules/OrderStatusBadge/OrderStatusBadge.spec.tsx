import { render, screen } from '@testing-library/react-native';
import { OrderStatusBadge } from './OrderStatusBadge';

describe('OrderStatusBadge', () => {
  it('renders the default label for the status', async () => {
    await render(<OrderStatusBadge status="issued" />);
    expect(screen.getByText('Emitido')).toBeOnTheScreen();
  });

  it('renders each status default label', async () => {
    await render(<OrderStatusBadge status="ongoing" />);
    expect(screen.getByText('Em andamento')).toBeOnTheScreen();
  });

  it('prefers the provided label over the default', async () => {
    await render(<OrderStatusBadge status="cancelled" label="Reembolsado" />);
    expect(screen.getByText('Reembolsado')).toBeOnTheScreen();
    expect(screen.queryByText('Cancelado')).not.toBeOnTheScreen();
  });
});
