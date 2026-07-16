import { Text } from 'react-native';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ResetPassword } from './ResetPassword';

describe('ResetPassword', () => {
  it('renders the title, description and password fields', async () => {
    await render(<ResetPassword />);
    expect(screen.getAllByText('Redefinir senha').length).toBeGreaterThan(0);
    expect(screen.getByPlaceholderText('Digite sua nova senha')).toBeOnTheScreen();
    expect(screen.getByPlaceholderText('Confirme sua senha')).toBeOnTheScreen();
  });

  it('fires onBack', async () => {
    const onBack = jest.fn();
    await render(<ResetPassword onBack={onBack} />);
    await fireEvent.press(screen.getByLabelText('Voltar'));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('renders the confirm-password error message only when provided', async () => {
    await render(<ResetPassword confirmPasswordError="As senhas não coincidem" />);
    expect(screen.getByText('As senhas não coincidem')).toBeOnTheScreen();
  });

  it('fires onSubmit only when canSubmit is true', async () => {
    const onSubmit = jest.fn();
    const { rerender } = await render(<ResetPassword canSubmit={false} onSubmit={onSubmit} />);
    await fireEvent.press(screen.getByTestId('button'));
    expect(onSubmit).not.toHaveBeenCalled();

    await rerender(<ResetPassword canSubmit onSubmit={onSubmit} />);
    await fireEvent.press(screen.getByTestId('button'));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('renders the overlay when provided', async () => {
    await render(<ResetPassword overlay={<Text>Sheet aberto</Text>} />);
    expect(screen.getByText('Sheet aberto')).toBeOnTheScreen();
  });
});
