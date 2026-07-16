import { Text } from 'react-native';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ResetPassword } from './ResetPassword';

const requirements = [
  { label: 'Letra maiúscula', met: false },
  { label: 'Letra minúscula', met: false },
  { label: '8 caracteres', met: false },
  { label: 'Número e símbolo', met: false },
];

describe('ResetPassword', () => {
  it('renders the title, description, password fields and requirements', async () => {
    await render(<ResetPassword requirements={requirements} />);
    expect(screen.getAllByText('Redefinir senha').length).toBeGreaterThan(0);
    expect(screen.getByPlaceholderText('Digite sua nova senha')).toBeOnTheScreen();
    expect(screen.getByPlaceholderText('Confirme sua senha')).toBeOnTheScreen();
    expect(screen.getByText('Letra maiúscula')).toBeOnTheScreen();
    expect(screen.getByText('8 caracteres')).toBeOnTheScreen();
  });

  it('fires onBack', async () => {
    const onBack = jest.fn();
    await render(<ResetPassword requirements={requirements} onBack={onBack} />);
    await fireEvent.press(screen.getByLabelText('Voltar'));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('renders the confirm-password error message only when provided', async () => {
    await render(<ResetPassword requirements={requirements} confirmPasswordError="As senhas não coincidem" />);
    expect(screen.getByText('As senhas não coincidem')).toBeOnTheScreen();
  });

  it('fires onSubmit only when canSubmit is true', async () => {
    const onSubmit = jest.fn();
    const { rerender } = await render(
      <ResetPassword requirements={requirements} canSubmit={false} onSubmit={onSubmit} />,
    );
    await fireEvent.press(screen.getByTestId('button'));
    expect(onSubmit).not.toHaveBeenCalled();

    await rerender(<ResetPassword requirements={requirements} canSubmit onSubmit={onSubmit} />);
    await fireEvent.press(screen.getByTestId('button'));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('renders the overlay when provided', async () => {
    await render(<ResetPassword requirements={requirements} overlay={<Text>Sheet aberto</Text>} />);
    expect(screen.getByText('Sheet aberto')).toBeOnTheScreen();
  });
});
