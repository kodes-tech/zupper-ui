import { render, screen, fireEvent } from '@testing-library/react-native';
import { OrderDetails } from './OrderDetails';
import type { OrderDetailsProps } from './OrderDetails';

const baseProps: OrderDetailsProps = {
  productIcon: 'order-flight',
  productTitle: 'Voo Ida e Volta',
  orderNumber: '2151215',
  createdAtLabel: 'Criado em 12/05/22',
  trip: {
    destination: 'São Paulo - São José dos Campos',
    people: '1 passageiro (1 Adulto)',
    dates: '25 Mar 2023 - 02 Abr 2023',
  },
  status: 'ongoing',
  timelineSteps: [
    { title: 'Pedido recebido', timestamp: '28/02/2023 às 15:55', tone: 'success' },
    { title: 'Emitido parcial', timestamp: '28/02/2023 às 15:55', tone: 'warning' },
  ],
};

describe('OrderDetails', () => {
  it('renders the order header, trip summary and timeline', async () => {
    await render(<OrderDetails {...baseProps} />);
    expect(screen.getByText('Detalhes do pedido')).toBeOnTheScreen();
    expect(screen.getByText('Voo Ida e Volta')).toBeOnTheScreen();
    expect(screen.getByText('#2151215')).toBeOnTheScreen();
    expect(screen.getByText('São Paulo - São José dos Campos')).toBeOnTheScreen();
    expect(screen.getByText('Pedido recebido')).toBeOnTheScreen();
    expect(screen.getByText('Emitido parcial')).toBeOnTheScreen();
  });

  it('renders the pending notice and alert only when provided', async () => {
    await render(
      <OrderDetails
        {...baseProps}
        pendingNotice={{ title: 'Trecho pendente', description: 'Regularize o pagamento.' }}
        alertNotice="Atenção! Altere a forma de pagamento."
      />,
    );
    expect(screen.getByText('Trecho pendente')).toBeOnTheScreen();
    expect(screen.getByText('Atenção! Altere a forma de pagamento.')).toBeOnTheScreen();
  });

  it('fires onPressCta and onPressChangePayment', async () => {
    const onPressCta = jest.fn();
    const onPressChangePayment = jest.fn();
    await render(
      <OrderDetails
        {...baseProps}
        ctaLabel="Pagar trecho pendente"
        onPressCta={onPressCta}
        changePaymentLabel="Alterar forma de pagamento"
        onPressChangePayment={onPressChangePayment}
      />,
    );
    await fireEvent.press(screen.getByText('Pagar trecho pendente'));
    await fireEvent.press(screen.getByText('Alterar forma de pagamento'));
    expect(onPressCta).toHaveBeenCalledTimes(1);
    expect(onPressChangePayment).toHaveBeenCalledTimes(1);
  });

  it('renders a FlightLegCard per flight', async () => {
    await render(
      <OrderDetails
        {...baseProps}
        flights={[
          {
            direction: 'ida',
            dateLabel: 'Qua, 24 de maio 2024',
            airline: { name: 'Gol airlines' },
            flightNumber: 'LA522',
            flightClass: 'Econômica',
            aircraftModel: 'Boeing 747',
            departure: { time: '11:30', dateLabel: 'Qua, 24 maio', city: 'Florianópolis, SC', code: 'FLN', name: 'Aeroporto Internacional Hercílio Luz' },
            arrival: { time: '12:55', dateLabel: 'Qua, 24 maio', city: 'Congonhas, SP', code: 'CGH', name: 'Aeroporto Internacional de Congonhas' },
            duration: '1h50',
            locator: 'SWOK2A',
            eTicket: 'SWOK2A',
          },
        ]}
      />,
    );
    expect(screen.getByText('Voo de ida')).toBeOnTheScreen();
    expect(screen.getByText('Gol airlines')).toBeOnTheScreen();
  });
});
