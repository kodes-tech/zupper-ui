import { render, screen, fireEvent } from '@testing-library/react-native';
import { PasswordResetEmailSentSheet } from './PasswordResetEmailSentSheet';

describe('PasswordResetEmailSentSheet', () => {
  it('renders the message and CTA', async () => {
    await render(<PasswordResetEmailSentSheet />);
    expect(screen.getByText('Novas instruções foram enviadas para seu email')).toBeOnTheScreen();
    expect(screen.getByText('Ir para login')).toBeOnTheScreen();
  });

  it('fires onPressLogin and onDismiss', async () => {
    const onPressLogin = jest.fn();
    const onDismiss = jest.fn();
    await render(<PasswordResetEmailSentSheet onPressLogin={onPressLogin} onDismiss={onDismiss} />);
    await fireEvent.press(screen.getByText('Ir para login'));
    expect(onPressLogin).toHaveBeenCalledTimes(1);
    await fireEvent.press(screen.getByLabelText('Fechar sheet'));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
