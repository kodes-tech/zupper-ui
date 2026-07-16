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
  it('renders the order number in the header and summary', async () => {
    await render(<OrderDetails {...baseProps} />);
    expect(screen.getByText('Pedido #2151215')).toBeOnTheScreen();
    expect(screen.getByText('Voo Ida e Volta')).toBeOnTheScreen();
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

  const flight = {
    direction: 'ida' as const,
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
  };

  it('renders the "Detalhes do seu voo" title and a FlightLegCard per flight', async () => {
    await render(<OrderDetails {...baseProps} flights={[flight]} />);
    expect(screen.getByText('Detalhes do seu voo')).toBeOnTheScreen();
    expect(screen.getByText('Voo de ida')).toBeOnTheScreen();
    expect(screen.getByText('Gol airlines')).toBeOnTheScreen();
  });

  it('renders the baggage card for a flight that has it', async () => {
    await render(
      <OrderDetails
        {...baseProps}
        flights={[
          {
            ...flight,
            baggage: [{ icon: 'baggage-personal', title: 'Inclui uma mochila ou bolsa', description: 'Tamanho limitado.' }],
          },
        ]}
      />,
    );
    expect(screen.getByText('Bagagem')).toBeOnTheScreen();
    expect(screen.getByText('Inclui uma mochila ou bolsa')).toBeOnTheScreen();
  });

  it('renders payment details, payment method, travelers and important info', async () => {
    await render(
      <OrderDetails
        {...baseProps}
        paymentDetails={[
          { label: 'Tarifa por adulto', value: 'R$ 856,12' },
          { label: 'TOTAL A PAGAR', value: 'R$ 1.255,12', emphasized: true },
        ]}
        paymentMethod={{ methodLabel: 'PIX', rows: [{ label: 'Pagamento via PIX', value: '1x de R$ 1.255,12' }] }}
        travelers={[{ role: 'Adulto 1', name: 'Maria Joaquina Silva, 30/11/1991' }]}
        importantInfo={[
          {
            title: 'Políticas de alteração e cancelamento',
            flightPolicies: [
              {
                direction: 'ida',
                route: 'Florianópolis - Congonhas (Voucher 01)',
                cancelPolicy: 'Não permite cancelamento',
                farePolicy: 'Alterações a partir de R$ 478,00',
              },
              {
                direction: 'volta',
                route: 'Congonhas - Florianópolis (Voucher 02)',
                cancelPolicy: 'Não permite cancelamento',
                farePolicy: 'Alterações a partir de R$ 478,00',
              },
            ],
          },
          {
            title: 'Sobre seu pedido',
            paragraphs: ['Alterações de nome não são permitidas.'],
          },
        ]}
      />,
    );
    expect(screen.getByText('Detalhes do pagamento')).toBeOnTheScreen();
    expect(screen.getByText('TOTAL A PAGAR')).toBeOnTheScreen();
    expect(screen.getByText('Forma de pagamento')).toBeOnTheScreen();
    expect(screen.getByText('PIX')).toBeOnTheScreen();
    expect(screen.getByText('Viajantes')).toBeOnTheScreen();
    expect(screen.getByText('Maria Joaquina Silva, 30/11/1991')).toBeOnTheScreen();
    expect(screen.getByText('Informações importantes')).toBeOnTheScreen();
    expect(screen.getByText('Políticas de alteração e cancelamento')).toBeOnTheScreen();
    expect(screen.getByText('VOO DE IDA')).toBeOnTheScreen();
    expect(screen.getByText('VOO DE VOLTA')).toBeOnTheScreen();
    expect(screen.getByText('Florianópolis - Congonhas (Voucher 01)')).toBeOnTheScreen();
    expect(screen.getByText('Sobre seu pedido')).toBeOnTheScreen();
    expect(screen.getByText('Alterações de nome não são permitidas.')).toBeOnTheScreen();
  });

  it('renders the change-payment-method link only when onPressChange is provided', async () => {
    const onPressChange = jest.fn();
    await render(
      <OrderDetails
        {...baseProps}
        paymentMethod={{
          methodLabel: 'PIX',
          rows: [{ label: 'Pagamento via PIX', value: '1x de R$ 1.255,12' }],
          onPressChange,
        }}
      />,
    );
    await fireEvent.press(screen.getByText('Alterar forma de pagamento'));
    expect(onPressChange).toHaveBeenCalledTimes(1);
  });

  it('omits the change-payment-method link when onPressChange is not provided', async () => {
    await render(
      <OrderDetails
        {...baseProps}
        paymentMethod={{ methodLabel: 'PIX', rows: [{ label: 'Pagamento via PIX', value: '1x de R$ 1.255,12' }] }}
      />,
    );
    expect(screen.queryByText('Alterar forma de pagamento')).not.toBeOnTheScreen();
  });
});
