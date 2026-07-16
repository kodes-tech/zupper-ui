import { render, screen, fireEvent } from '@testing-library/react-native';
import { PasswordResetErrorSheet } from './PasswordResetErrorSheet';

describe('PasswordResetErrorSheet', () => {
  it('renders the message and CTA', async () => {
    await render(<PasswordResetErrorSheet />);
    expect(
      screen.getByText('Ops!... Não foi possível enviar o link para seu e-mail.'),
    ).toBeOnTheScreen();
    expect(screen.getByText('Voltar e tentar novamente')).toBeOnTheScreen();
  });

  it('fires onPressRetry and onDismiss', async () => {
    const onPressRetry = jest.fn();
    const onDismiss = jest.fn();
    await render(<PasswordResetErrorSheet onPressRetry={onPressRetry} onDismiss={onDismiss} />);
    await fireEvent.press(screen.getByText('Voltar e tentar novamente'));
    expect(onPressRetry).toHaveBeenCalledTimes(1);
    await fireEvent.press(screen.getByLabelText('Fechar sheet'));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
