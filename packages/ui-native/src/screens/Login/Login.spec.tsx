import { Text } from 'react-native';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Login } from './Login';

describe('Login', () => {
  it('renders the title and fields', async () => {
    await render(<Login />);
    expect(screen.getAllByText('Fazer login').length).toBeGreaterThan(0);
    expect(screen.getByPlaceholderText('Seu email')).toBeOnTheScreen();
    expect(screen.getByPlaceholderText('Sua senha')).toBeOnTheScreen();
    expect(screen.getByText('Esqueceu sua senha?')).toBeOnTheScreen();
  });

  it('renders the social login buttons and footer link', async () => {
    await render(<Login />);
    expect(screen.getByText('Acessar com Facebook')).toBeOnTheScreen();
    expect(screen.getByText('Acessar com Google')).toBeOnTheScreen();
    expect(screen.getByText('Acessar com AppleID')).toBeOnTheScreen();
    expect(screen.getByText('Cadastre-se')).toBeOnTheScreen();
  });

  it('renders the password error message only when provided', async () => {
    await render(<Login passwordError="Senha incorreta" />);
    expect(screen.getByText('Senha incorreta')).toBeOnTheScreen();
  });

  it('fires onSubmit only when canSubmit is true', async () => {
    const onSubmit = jest.fn();
    const { rerender } = await render(<Login canSubmit={false} onSubmit={onSubmit} />);
    await fireEvent.press(screen.getByTestId('button'));
    expect(onSubmit).not.toHaveBeenCalled();

    await rerender(<Login canSubmit onSubmit={onSubmit} />);
    await fireEvent.press(screen.getByTestId('button'));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('fires the social login callbacks', async () => {
    const onPressFacebook = jest.fn();
    const onPressGoogle = jest.fn();
    const onPressApple = jest.fn();
    await render(
      <Login onPressFacebook={onPressFacebook} onPressGoogle={onPressGoogle} onPressApple={onPressApple} />,
    );
    await fireEvent.press(screen.getByText('Acessar com Facebook'));
    await fireEvent.press(screen.getByText('Acessar com Google'));
    await fireEvent.press(screen.getByText('Acessar com AppleID'));
    expect(onPressFacebook).toHaveBeenCalledTimes(1);
    expect(onPressGoogle).toHaveBeenCalledTimes(1);
    expect(onPressApple).toHaveBeenCalledTimes(1);
  });

  it('renders the overlay when provided', async () => {
    await render(<Login overlay={<Text>Sheet aberto</Text>} />);
    expect(screen.getByText('Sheet aberto')).toBeOnTheScreen();
  });
});
