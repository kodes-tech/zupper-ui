import { render, screen, fireEvent } from '@testing-library/react-native';
import { CheckoutContact } from './CheckoutContact';
import type { CheckoutContactProps } from './CheckoutContact';

const baseProps: CheckoutContactProps = {
  route: 'GRU - REC',
  tripDate: '15 de julho',
  totalPrice: 'R$ 2.434,67',
};

describe('CheckoutContact', () => {
  it('renders the header, step title and trip summary footer', async () => {
    await render(<CheckoutContact {...baseProps} />);
    expect(screen.getByText('Checkout - 1 de 4')).toBeOnTheScreen();
    expect(screen.getByText('Como falamos com você?')).toBeOnTheScreen();
    expect(screen.getByText('GRU - REC')).toBeOnTheScreen();
    expect(screen.getByText('R$ 2.434,67')).toBeOnTheScreen();
  });

  it('renders the countdown banner when offerDuration is set', async () => {
    await render(<CheckoutContact {...baseProps} offerDuration="14:38" />);
    expect(screen.getByText('Duração da oferta: 14:38')).toBeOnTheScreen();
  });

  it('greets the traveler by name and closes the sentence without an email', async () => {
    await render(<CheckoutContact {...baseProps} travelerName="Ana" />);
    expect(screen.getByText('Ana')).toBeOnTheScreen();
    expect(screen.getByText(/serão enviadas para seu endereço de e-mail\.$/)).toBeOnTheScreen();
  });

  it('shows the confirmation email in the explanatory text when provided', async () => {
    await render(<CheckoutContact {...baseProps} confirmationEmail="ana@email.com" />);
    expect(screen.getByText('ana@email.com')).toBeOnTheScreen();
  });

  it('shows the phone field error and the SMS checkbox for cellphone', async () => {
    await render(<CheckoutContact {...baseProps} contactMethod="cellphone" phoneError="Campo obrigatório" />);
    expect(screen.getByText('Campo obrigatório')).toBeOnTheScreen();
    expect(screen.getByText('Aceito receber o status do meu pedido por SMS')).toBeOnTheScreen();
  });

  it('hides the SMS checkbox for phone contact', async () => {
    await render(<CheckoutContact {...baseProps} contactMethod="phone" />);
    expect(screen.queryByText('Aceito receber o status do meu pedido por SMS')).toBeNull();
  });

  it('fires onChangeContactMethod when a radio option is pressed', async () => {
    const onChangeContactMethod = jest.fn();
    await render(<CheckoutContact {...baseProps} onChangeContactMethod={onChangeContactMethod} />);
    await fireEvent.press(screen.getByText('Telefone'));
    expect(onChangeContactMethod).toHaveBeenCalledWith('phone');
  });

  it('fires onPressNextStep when the CTA is pressed', async () => {
    const onPressNextStep = jest.fn();
    await render(<CheckoutContact {...baseProps} onPressNextStep={onPressNextStep} />);
    await fireEvent.press(screen.getByText('Avançar para a próxima etapa'));
    expect(onPressNextStep).toHaveBeenCalledTimes(1);
  });

  it('fires onPressTripDetails when "Ver detalhes" is pressed', async () => {
    const onPressTripDetails = jest.fn();
    await render(<CheckoutContact {...baseProps} onPressTripDetails={onPressTripDetails} />);
    await fireEvent.press(screen.getByLabelText('Ver detalhes'));
    expect(onPressTripDetails).toHaveBeenCalledTimes(1);
  });
});
