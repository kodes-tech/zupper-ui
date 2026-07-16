import { render, screen, fireEvent } from '@testing-library/react-native';
import { ForgotPassword } from './ForgotPassword';

describe('ForgotPassword', () => {
  it('renders the title, description and email field', async () => {
    await render(<ForgotPassword />);
    expect(screen.getByText('Esqueci minha senha')).toBeOnTheScreen();
    expect(screen.getByPlaceholderText('Digite seu e-mail')).toBeOnTheScreen();
  });

  it('fires onBack', async () => {
    const onBack = jest.fn();
    await render(<ForgotPassword onBack={onBack} />);
    await fireEvent.press(screen.getByLabelText('Voltar'));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('fires onSubmit only when canSubmit is true', async () => {
    const onSubmit = jest.fn();
    await render(<ForgotPassword canSubmit={false} onSubmit={onSubmit} />);
    await fireEvent.press(screen.getByText('Solicitar nova senha'));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('always allows pressing "Voltar para o login"', async () => {
    const onPressBackToLogin = jest.fn();
    await render(<ForgotPassword onPressBackToLogin={onPressBackToLogin} />);
    await fireEvent.press(screen.getByText('Voltar para o login'));
    expect(onPressBackToLogin).toHaveBeenCalledTimes(1);
  });
});
