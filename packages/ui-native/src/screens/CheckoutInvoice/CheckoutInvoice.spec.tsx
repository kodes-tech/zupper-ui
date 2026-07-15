import { render, screen, fireEvent } from '@testing-library/react-native';
import { CheckoutInvoice } from './CheckoutInvoice';

const baseProps = {
  route: 'GRU - REC',
  tripDate: '15 de julho',
  totalPrice: 'R$ 2.434,67',
};

describe('CheckoutInvoice', () => {
  it('renders the header, step title and every section', async () => {
    await render(<CheckoutInvoice {...baseProps} />);
    expect(screen.getByText('Checkout - 4 de 4')).toBeOnTheScreen();
    expect(screen.getByText('Emissão de nota fiscal')).toBeOnTheScreen();
    expect(screen.getByText('Situação fiscal')).toBeOnTheScreen();
    expect(screen.getByText('Nome Completo *')).toBeOnTheScreen();
    expect(screen.getByText('CEP')).toBeOnTheScreen();
    expect(screen.getByText('Informações importantes')).toBeOnTheScreen();
  });

  it('shows "Finalizar compra" as the CTA label (last step)', async () => {
    await render(<CheckoutInvoice {...baseProps} />);
    expect(screen.getByText('Finalizar compra')).toBeOnTheScreen();
    expect(screen.queryByText('Avançar para a próxima etapa')).toBeNull();
  });

  it('fires onPressFinish when the CTA is pressed', async () => {
    const onPressFinish = jest.fn();
    await render(<CheckoutInvoice {...baseProps} onPressFinish={onPressFinish} />);
    await fireEvent.press(screen.getByText('Finalizar compra'));
    expect(onPressFinish).toHaveBeenCalledTimes(1);
  });
});
