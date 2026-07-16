import { Text } from 'react-native';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { SignUp } from './SignUp';

const requirements = [
  { label: 'Letra maiúscula', met: false },
  { label: 'Letra minúscula', met: false },
  { label: '8 caracteres', met: false },
  { label: 'Número e símbolo', met: false },
];

describe('SignUp', () => {
  it('renders the title, all form fields, requirements and terms', async () => {
    await render(<SignUp requirements={requirements} />);
    expect(screen.getByText('Crie sua conta')).toBeOnTheScreen();
    expect(screen.getByPlaceholderText('Insira seu primeiro nome')).toBeOnTheScreen();
    expect(screen.getByPlaceholderText('Insira seu último nome')).toBeOnTheScreen();
    expect(screen.getByPlaceholderText('Seu email')).toBeOnTheScreen();
    expect(screen.getByPlaceholderText('Sua senha')).toBeOnTheScreen();
    expect(screen.getByPlaceholderText('Confirme sua senha')).toBeOnTheScreen();
    expect(screen.getByText('Letra maiúscula')).toBeOnTheScreen();
    expect(screen.getByText('8 caracteres')).toBeOnTheScreen();
    expect(screen.getByText('Termos de Aceite')).toBeOnTheScreen();
    expect(screen.getByText('Política de Privacidade')).toBeOnTheScreen();
  });

  it('renders the social buttons and login footer link', async () => {
    await render(<SignUp requirements={requirements} />);
    expect(screen.getByText('Criar conta com Facebook')).toBeOnTheScreen();
    expect(screen.getByText('Criar conta com Google')).toBeOnTheScreen();
    expect(screen.getByText('Criar conta com AppleID')).toBeOnTheScreen();
    expect(screen.getByText('Faça o login')).toBeOnTheScreen();
  });

  it('fires onSubmit only when canSubmit is true', async () => {
    const onSubmit = jest.fn();
    const { rerender } = await render(
      <SignUp requirements={requirements} canSubmit={false} onSubmit={onSubmit} />,
    );
    await fireEvent.press(screen.getByTestId('button'));
    expect(onSubmit).not.toHaveBeenCalled();

    await rerender(<SignUp requirements={requirements} canSubmit onSubmit={onSubmit} />);
    await fireEvent.press(screen.getByTestId('button'));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('fires onPressTerms and onPressPrivacyPolicy', async () => {
    const onPressTerms = jest.fn();
    const onPressPrivacyPolicy = jest.fn();
    await render(
      <SignUp
        requirements={requirements}
        onPressTerms={onPressTerms}
        onPressPrivacyPolicy={onPressPrivacyPolicy}
      />,
    );
    await fireEvent.press(screen.getByText('Termos de Aceite'));
    await fireEvent.press(screen.getByText('Política de Privacidade'));
    expect(onPressTerms).toHaveBeenCalledTimes(1);
    expect(onPressPrivacyPolicy).toHaveBeenCalledTimes(1);
  });

  it('renders the confirm-password error message only when provided', async () => {
    await render(<SignUp requirements={requirements} confirmPasswordError="As senhas não coincidem" />);
    expect(screen.getByText('As senhas não coincidem')).toBeOnTheScreen();
  });

  it('renders the overlay when provided', async () => {
    await render(<SignUp requirements={requirements} overlay={<Text>Sheet aberto</Text>} />);
    expect(screen.getByText('Sheet aberto')).toBeOnTheScreen();
  });
});
