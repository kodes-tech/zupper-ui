import { Text } from 'react-native';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { CancelOrder } from './CancelOrder';

describe('CancelOrder', () => {
  it('renders the header and intro copy', async () => {
    await render(<CancelOrder />);
    expect(screen.getByText('Cancelamento de pedido')).toBeOnTheScreen();
    expect(screen.getByText('Digite o número do pedido')).toBeOnTheScreen();
  });

  it('omits the result card when there is no result', async () => {
    await render(<CancelOrder />);
    expect(screen.queryByText('Resultado')).not.toBeOnTheScreen();
  });

  it('renders the found order card', async () => {
    await render(
      <CancelOrder
        result={{
          status: 'ongoing',
          productIcon: 'order-flight',
          productTitle: 'Voo Ida e Volta',
          orderNumber: '2151215',
          createdAtLabel: 'Criado em 12/05/22',
          trip: { destination: 'São Paulo - São José dos Campos', people: '1 viajante', dates: '25 Mar 2023 - 02 Abr 2023' },
        }}
      />,
    );
    expect(screen.getByText('Resultado')).toBeOnTheScreen();
    expect(screen.getByText('São Paulo - São José dos Campos')).toBeOnTheScreen();
    expect(screen.queryByLabelText('Detalhes')).not.toBeOnTheScreen();
  });

  it('shows the CTA as disabled text when canSubmit is false and fires onPressCancel when true', async () => {
    const onPressCancel = jest.fn();
    const { rerender } = await render(<CancelOrder canSubmit={false} onPressCancel={onPressCancel} />);
    expect(screen.getByText('Solicitar cancelamento')).toBeOnTheScreen();
    await fireEvent.press(screen.getByText('Solicitar cancelamento'));
    expect(onPressCancel).not.toHaveBeenCalled();

    await rerender(<CancelOrder canSubmit onPressCancel={onPressCancel} />);
    await fireEvent.press(screen.getByText('Solicitar cancelamento'));
    expect(onPressCancel).toHaveBeenCalledTimes(1);
  });

  it('renders the overlay when provided', async () => {
    await render(<CancelOrder overlay={<Text>Sheet aberto</Text>} />);
    expect(screen.getByText('Sheet aberto')).toBeOnTheScreen();
  });
});
