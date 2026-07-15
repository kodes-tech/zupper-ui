import { render, screen, fireEvent } from '@testing-library/react-native';
import { CheckoutHeader } from './CheckoutHeader';

describe('CheckoutHeader', () => {
  it('renders the step title', async () => {
    await render(<CheckoutHeader currentStep={1} totalSteps={4} />);
    expect(screen.getByText('Checkout - 1 de 4')).toBeOnTheScreen();
  });

  it('renders the countdown banner when offerDuration is set', async () => {
    await render(<CheckoutHeader currentStep={1} totalSteps={4} offerDuration="14:38" />);
    expect(screen.getByText('Duração da oferta: 14:38')).toBeOnTheScreen();
  });

  it('omits the countdown banner by default', async () => {
    await render(<CheckoutHeader currentStep={1} totalSteps={4} />);
    expect(screen.queryByText(/Duração da oferta/)).toBeNull();
  });

  it('fires onBack when the back button is pressed', async () => {
    const onBack = jest.fn();
    await render(<CheckoutHeader currentStep={1} totalSteps={4} onBack={onBack} />);
    await fireEvent.press(screen.getByLabelText('Voltar'));
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
