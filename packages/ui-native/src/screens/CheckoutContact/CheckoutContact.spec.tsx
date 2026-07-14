import { render, screen, fireEvent } from '@testing-library/react-native';
import { CheckoutContact } from './CheckoutContact';
import type { CheckoutContactProps } from './CheckoutContact';

const baseProps: CheckoutContactProps = {
  route: 'GRU - REC',
  tripDate: '15 de julho',
  totalPrice: 'R$ 2.434,67',
};

describe('CheckoutContact', () => {
  it('renders the header, step title and trip summary footer', () => {
    render(<CheckoutContact {...baseProps} />);
    expect(screen.getByText('Checkout - 1 de 4')).toBeOnTheScreen();
    expect(screen.getByText('Como falamos com você?')).toBeOnTheScreen();
    expect(screen.getByText('GRU - REC')).toBeOnTheScreen();
    expect(screen.getByText('R$ 2.434,67')).toBeOnTheScreen();
  });

  it('renders the countdown banner when offerDuration is set', () => {
    render(<CheckoutContact {...baseProps} offerDuration="14:38" />);
    expect(screen.getByText('Duração da oferta: 14:38')).toBeOnTheScreen();
  });

  it('greets the traveler by name and closes the sentence without an email', () => {
    render(<CheckoutContact {...baseProps} travelerName="Ana" />);
    expect(screen.getByText('Ana')).toBeOnTheScreen();
    expect(screen.getByText(/serão enviadas para seu endereço de e-mail\.$/)).toBeOnTheScreen();
  });

  it('shows the confirmation email in the explanatory text when provided', () => {
    render(<CheckoutContact {...baseProps} confirmationEmail="ana@email.com" />);
    expect(screen.getByText('ana@email.com')).toBeOnTheScreen();
  });

  it('shows the phone field error and the SMS checkbox for cellphone', () => {
    render(<CheckoutContact {...baseProps} contactMethod="cellphone" phoneError="Campo obrigatório" />);
    expect(screen.getByText('Campo obrigatório')).toBeOnTheScreen();
    expect(screen.getByText('Aceito receber o status do meu pedido por SMS')).toBeOnTheScreen();
  });

  it('hides the SMS checkbox for phone contact', () => {
    render(<CheckoutContact {...baseProps} contactMethod="phone" />);
    expect(screen.queryByText('Aceito receber o status do meu pedido por SMS')).toBeNull();
  });

  it('fires onChangeContactMethod when a radio option is pressed', () => {
    const onChangeContactMethod = jest.fn();
    render(<CheckoutContact {...baseProps} onChangeContactMethod={onChangeContactMethod} />);
    fireEvent.press(screen.getByText('Telefone'));
    expect(onChangeContactMethod).toHaveBeenCalledWith('phone');
  });

  it('fires onPressNextStep when the CTA is pressed', () => {
    const onPressNextStep = jest.fn();
    render(<CheckoutContact {...baseProps} onPressNextStep={onPressNextStep} />);
    fireEvent.press(screen.getByText('Avançar para a próxima etapa'));
    expect(onPressNextStep).toHaveBeenCalledTimes(1);
  });

  it('fires onPressTripDetails when "Ver detalhes" is pressed', () => {
    const onPressTripDetails = jest.fn();
    render(<CheckoutContact {...baseProps} onPressTripDetails={onPressTripDetails} />);
    fireEvent.press(screen.getByLabelText('Ver detalhes'));
    expect(onPressTripDetails).toHaveBeenCalledTimes(1);
  });
});
