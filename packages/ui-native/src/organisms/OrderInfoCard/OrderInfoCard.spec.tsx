import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import { OrderInfoCard } from './OrderInfoCard';

describe('OrderInfoCard', () => {
  it('renders the title and children', async () => {
    await render(
      <OrderInfoCard title="Viajantes">
        <Text>Adulto 1</Text>
      </OrderInfoCard>,
    );
    expect(screen.getByText('Viajantes')).toBeOnTheScreen();
    expect(screen.getByText('Adulto 1')).toBeOnTheScreen();
  });

  it('renders the trailing label only when provided', async () => {
    await render(
      <OrderInfoCard title="Forma de pagamento" trailing="PIX">
        <Text>Pagamento via PIX</Text>
      </OrderInfoCard>,
    );
    expect(screen.getByText('PIX')).toBeOnTheScreen();
  });

  it('omits the trailing label when not provided', async () => {
    await render(
      <OrderInfoCard title="Viajantes">
        <Text>Adulto 1</Text>
      </OrderInfoCard>,
    );
    expect(screen.queryByText('PIX')).not.toBeOnTheScreen();
  });
});
