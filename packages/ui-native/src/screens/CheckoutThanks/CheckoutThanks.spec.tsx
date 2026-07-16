import { render, screen, fireEvent } from '@testing-library/react-native';
import { CheckoutThanks } from './CheckoutThanks';
import type { CheckoutThanksProps } from './CheckoutThanks';

const baseProps: CheckoutThanksProps = {
  statusMessage: 'Parabéns! O seu pedido #48213 está em processo de aprovação.',
  email: 'joao.silva@email.com',
  priceRows: [
    { label: 'Tarifa por adulto', value: 'R$ 2.165,79' },
    { label: 'TOTAL PAGO', value: 'R$ 2.259,98', bold: true },
  ],
  paymentMethod: 'pix',
  pixValue: 'R$ 2.259,98',
};

describe('CheckoutThanks', () => {
  it('renders the header, status message and price summary', async () => {
    await render(<CheckoutThanks {...baseProps} />);
    expect(screen.getByText('Reserva concluída')).toBeOnTheScreen();
    expect(
      screen.getByText('Parabéns! O seu pedido #48213 está em processo de aprovação.'),
    ).toBeOnTheScreen();
    expect(screen.getByText('Sua compra')).toBeOnTheScreen();
    expect(screen.getByText('R$ 2.259,98')).toBeOnTheScreen();
  });

  it('shows the email notice based on emailExists', async () => {
    const { rerender } = await render(<CheckoutThanks {...baseProps} emailExists={false} />);
    expect(screen.getByText(/ainda não possui uma conta/)).toBeOnTheScreen();
    expect(screen.getByText('Criar conta agora')).toBeOnTheScreen();

    await rerender(<CheckoutThanks {...baseProps} emailExists />);
    expect(screen.getByText(/já possui uma conta/)).toBeOnTheScreen();
    expect(screen.getByText('Acessar meus pedidos')).toBeOnTheScreen();
  });

  it('renders the pix payment details', async () => {
    await render(<CheckoutThanks {...baseProps} paymentMethod="pix" pixValue="R$ 2.259,98" />);
    expect(screen.getByText('Pagamento via PIX')).toBeOnTheScreen();
    expect(screen.getByText('1x de R$ 2.259,98')).toBeOnTheScreen();
  });

  it('renders the credit card payment details', async () => {
    await render(
      <CheckoutThanks
        {...baseProps}
        paymentMethod="creditCard"
        cardBrand="Visa"
        cardLastDigits="4242"
        installmentCount={3}
        installmentValue="R$ 753,33"
        extraInstallmentsValue="R$ 753,32"
      />,
    );
    expect(screen.getByText('**** **** **** 4242')).toBeOnTheScreen();
    expect(screen.getByText('3x s/ juros')).toBeOnTheScreen();
    expect(screen.getByText('1º R$ 753,33 + demais R$ 753,32')).toBeOnTheScreen();
  });

  it('fires onPressAccount and onPressBackToHome', async () => {
    const onPressAccount = jest.fn();
    const onPressBackToHome = jest.fn();
    await render(
      <CheckoutThanks
        {...baseProps}
        onPressAccount={onPressAccount}
        onPressBackToHome={onPressBackToHome}
      />,
    );
    await fireEvent.press(screen.getByText('Criar conta agora'));
    expect(onPressAccount).toHaveBeenCalledTimes(1);
    await fireEvent.press(screen.getByText('Voltar para tela inicial'));
    expect(onPressBackToHome).toHaveBeenCalledTimes(1);
  });

  it('renders the error state with the review-payment link instead of the account CTAs', async () => {
    const onPressReviewPayment = jest.fn();
    await render(
      <CheckoutThanks
        {...baseProps}
        status="error"
        statusMessage="Infelizmente algo deu errado na reserva do seu pedido #48213."
        onPressReviewPayment={onPressReviewPayment}
      />,
    );
    expect(screen.getByText('Erro ao processar')).toBeOnTheScreen();
    expect(
      screen.getByText('Infelizmente algo deu errado na reserva do seu pedido #48213.'),
    ).toBeOnTheScreen();
    expect(screen.queryByText('Criar conta agora')).toBeNull();
    await fireEvent.press(screen.getByText('Revise seus dados de pagamento'));
    expect(onPressReviewPayment).toHaveBeenCalledTimes(1);
  });

  it('renders the pix instructions with the numbered steps and fires onPressCopyPixCode', async () => {
    const onPressCopyPixCode = jest.fn();
    await render(<CheckoutThanks {...baseProps} onPressCopyPixCode={onPressCopyPixCode} />);
    expect(screen.getByText('Instruções para realizar o pagamento')).toBeOnTheScreen();
    expect(screen.getByText('Acesse o menu PIX')).toBeOnTheScreen();
    expect(screen.getByText('Siga os passos no APP e finalize a transação')).toBeOnTheScreen();
    await fireEvent.press(screen.getByText('Copiar código'));
    expect(onPressCopyPixCode).toHaveBeenCalledTimes(1);
  });

  it('omits the pix instructions for credit card payments', async () => {
    await render(<CheckoutThanks {...baseProps} paymentMethod="creditCard" cardLastDigits="4242" />);
    expect(screen.queryByText('Instruções para realizar o pagamento')).toBeNull();
  });
});
