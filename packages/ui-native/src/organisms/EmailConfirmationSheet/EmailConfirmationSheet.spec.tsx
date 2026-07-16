import { render, screen, fireEvent } from '@testing-library/react-native';
import { EmailConfirmationSheet } from './EmailConfirmationSheet';

describe('EmailConfirmationSheet', () => {
  it('renders the header, message and CTA', async () => {
    await render(<EmailConfirmationSheet />);
    expect(screen.getByText('Fazer login com o E-mail')).toBeOnTheScreen();
    expect(screen.getByText('Enviamos um e-mail de confirmação')).toBeOnTheScreen();
    expect(screen.getByText('Solicitar reenvio de e-mail')).toBeOnTheScreen();
    expect(screen.getByText('Alterar e-mail de cadastro')).toBeOnTheScreen();
  });

  it('fires onPressResend and onPressChangeEmail', async () => {
    const onPressResend = jest.fn();
    const onPressChangeEmail = jest.fn();
    await render(
      <EmailConfirmationSheet onPressResend={onPressResend} onPressChangeEmail={onPressChangeEmail} />,
    );
    await fireEvent.press(screen.getByText('Solicitar reenvio de e-mail'));
    await fireEvent.press(screen.getByText('Alterar e-mail de cadastro'));
    expect(onPressResend).toHaveBeenCalledTimes(1);
    expect(onPressChangeEmail).toHaveBeenCalledTimes(1);
  });

  it('fires onDismiss when the close icon is pressed', async () => {
    const onDismiss = jest.fn();
    await render(<EmailConfirmationSheet onDismiss={onDismiss} />);
    await fireEvent.press(screen.getByLabelText('Fechar sheet'));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
