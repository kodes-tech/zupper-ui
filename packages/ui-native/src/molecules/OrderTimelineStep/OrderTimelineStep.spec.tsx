import { render, screen } from '@testing-library/react-native';
import { OrderTimelineStep } from './OrderTimelineStep';

describe('OrderTimelineStep', () => {
  it('renders the step title', async () => {
    await render(<OrderTimelineStep title="Pedido recebido" tone="success" />);
    expect(screen.getByText('Pedido recebido')).toBeOnTheScreen();
  });

  it('renders a distinct tone without crashing', async () => {
    await render(<OrderTimelineStep title="Pagamento recusado" tone="danger" last />);
    expect(screen.getByText('Pagamento recusado')).toBeOnTheScreen();
  });

  it('renders the timestamp when provided', async () => {
    await render(
      <OrderTimelineStep title="Pedido recebido" timestamp="28/02/2023 às 15:55" tone="success" />,
    );
    expect(screen.getByText('28/02/2023 às 15:55')).toBeOnTheScreen();
  });

  it('omits the timestamp when not provided', async () => {
    await render(<OrderTimelineStep title="Pedido recebido" tone="success" />);
    expect(screen.queryByText(/às/)).not.toBeOnTheScreen();
  });
});
