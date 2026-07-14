import { render, screen, fireEvent } from '@testing-library/react-native';
import { CheckoutPayment } from './CheckoutPayment';

const baseProps = {
  route: 'GRU - REC',
  tripDate: '15 de julho',
  totalPrice: 'R$ 2.434,67',
};

describe('CheckoutPayment', () => {
  it('renders the header, step title and payment method selector', () => {
    render(<CheckoutPayment {...baseProps} />);
    expect(screen.getByText('Checkout - 3 de 4')).toBeOnTheScreen();
    expect(screen.getByText('Como prefere pagar?')).toBeOnTheScreen();
    expect(screen.getByText('Forma de pagamento')).toBeOnTheScreen();
    expect(screen.getByText('Cartão de Crédito')).toBeOnTheScreen();
    expect(screen.getByText('PIX')).toBeOnTheScreen();
  });

  it('shows the credit card form only when selected', () => {
    render(<CheckoutPayment {...baseProps} paymentMethod="creditCard" />);
    expect(screen.getByText('Número do cartão *')).toBeOnTheScreen();
    expect(screen.queryByText('Transferência via PIX')).toBeNull();
  });

  it('shows the pix form only when selected', () => {
    render(<CheckoutPayment {...baseProps} paymentMethod="pix" />);
    expect(screen.getByText('Transferência via PIX')).toBeOnTheScreen();
    expect(screen.queryByText('Número do cartão *')).toBeNull();
  });

  it('shows neither form until a method is selected', () => {
    render(<CheckoutPayment {...baseProps} />);
    expect(screen.queryByText('Número do cartão *')).toBeNull();
    expect(screen.queryByText('Transferência via PIX')).toBeNull();
  });

  it('fires onChangePaymentMethod when a method is pressed', () => {
    const onChangePaymentMethod = jest.fn();
    render(<CheckoutPayment {...baseProps} onChangePaymentMethod={onChangePaymentMethod} />);
    fireEvent.press(screen.getByText('PIX'));
    expect(onChangePaymentMethod).toHaveBeenCalledWith('pix');
  });
});
