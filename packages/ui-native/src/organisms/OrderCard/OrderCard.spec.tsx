import { render, screen, fireEvent } from '@testing-library/react-native';
import { OrderCard } from './OrderCard';
import type { OrderCardProps } from './OrderCard';

const baseProps: OrderCardProps = {
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

describe('OrderCard', () => {
  it('renders header, trip summary and default status label', async () => {
    await render(<OrderCard {...baseProps} />);
    expect(screen.getByText('Voo Ida e Volta')).toBeOnTheScreen();
    expect(screen.getByText('#2151215')).toBeOnTheScreen();
    expect(screen.getByText('Criado em 12/05/22')).toBeOnTheScreen();
    expect(screen.getByText('São Paulo - São José dos Campos')).toBeOnTheScreen();
    expect(screen.getByText('Emitido')).toBeOnTheScreen();
  });

  it('renders the alert banner only when provided', async () => {
    await render(<OrderCard {...baseProps} alert="Atenção! Taxa de serviço pendente" />);
    expect(screen.getByText('Atenção! Taxa de serviço pendente')).toBeOnTheScreen();
  });

  it('omits the details link when showDetails is false', async () => {
    await render(<OrderCard {...baseProps} showDetails={false} />);
    expect(screen.queryByLabelText('Detalhes')).not.toBeOnTheScreen();
  });

  it('fires onPressDetails', async () => {
    const onPressDetails = jest.fn();
    await render(<OrderCard {...baseProps} onPressDetails={onPressDetails} />);
    await fireEvent.press(screen.getByLabelText('Detalhes'));
    expect(onPressDetails).toHaveBeenCalledTimes(1);
  });
});
