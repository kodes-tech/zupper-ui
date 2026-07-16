import { render, screen, fireEvent } from '@testing-library/react-native';
import { Orders } from './Orders';
import type { OrdersOrder } from './Orders';

const order: OrdersOrder = {
  id: '1',
  status: 'issued',
  productIcon: 'order-flight',
  productTitle: 'Voo Ida e Volta',
  orderNumber: '2151215',
  createdAtLabel: 'Criado em 12/05/22',
  trip: {
    destination: 'São Paulo - São José dos Campos',
    people: '2 viajantes',
    dates: '25 Mar 2023 - 02 Abr 2023',
  },
};

describe('Orders', () => {
  it('renders the order list and results count', async () => {
    await render(<Orders filter="issued" orders={[order]} />);
    expect(screen.getByText('Meus pedidos')).toBeOnTheScreen();
    expect(screen.getByText('Voo Ida e Volta')).toBeOnTheScreen();
    expect(screen.getByText('1 pedidos encontrados')).toBeOnTheScreen();
  });

  it('renders the empty state when there are no orders', async () => {
    await render(
      <Orders
        filter="issued"
        orders={[]}
        emptyState={{
          message: 'Você ainda não possui pedidos',
          title: 'Aproveite para pesquisar\nsua viagem agora',
          ctaLabel: 'Pesquisar viagem agora',
        }}
      />,
    );
    expect(screen.getByText('Você ainda não possui pedidos')).toBeOnTheScreen();
    expect(screen.getByText('Pesquisar viagem agora')).toBeOnTheScreen();
    expect(screen.queryByText('Voo Ida e Volta')).not.toBeOnTheScreen();
  });

  it('fires onChangeFilter when a filter chip is pressed', async () => {
    const onChangeFilter = jest.fn();
    await render(<Orders filter="issued" orders={[order]} onChangeFilter={onChangeFilter} />);
    await fireEvent.press(screen.getByText('Em andamento'));
    expect(onChangeFilter).toHaveBeenCalledWith('ongoing');
  });

  it('fires onSearch when the search field is pressed', async () => {
    const onSearch = jest.fn();
    await render(<Orders filter="issued" orders={[order]} onSearch={onSearch} />);
    await fireEvent.press(screen.getByRole('search'));
    expect(onSearch).toHaveBeenCalledTimes(1);
  });
});
