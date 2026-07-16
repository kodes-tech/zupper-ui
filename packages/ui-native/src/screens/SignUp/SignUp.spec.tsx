import { render, screen, fireEvent } from '@testing-library/react-native';
import { SignUp } from './SignUp';

describe('SignUp', () => {
  it('renders the title, email field and terms', async () => {
    await render(<SignUp />);
    expect(screen.getByText('Crie sua conta')).toBeOnTheScreen();
    expect(screen.getByPlaceholderText('Digite seu email')).toBeOnTheScreen();
    expect(screen.getByText('Termos de Aceite')).toBeOnTheScreen();
    expect(screen.getByText('Política de Privacidade')).toBeOnTheScreen();
  });

  it('renders the social buttons and login footer link', async () => {
    await render(<SignUp />);
    expect(screen.getByText('Criar conta com Facebook')).toBeOnTheScreen();
    expect(screen.getByText('Criar conta com Google')).toBeOnTheScreen();
    expect(screen.getByText('Criar conta com AppleID')).toBeOnTheScreen();
    expect(screen.getByText('Faça o login')).toBeOnTheScreen();
  });

  it('fires onSubmit only when canSubmit is true', async () => {
    const onSubmit = jest.fn();
    const { rerender } = await render(<SignUp canSubmit={false} onSubmit={onSubmit} />);
    await fireEvent.press(screen.getByTestId('button'));
    expect(onSubmit).not.toHaveBeenCalled();

    await rerender(<SignUp canSubmit onSubmit={onSubmit} />);
    await fireEvent.press(screen.getByTestId('button'));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('fires onPressTerms and onPressPrivacyPolicy', async () => {
    const onPressTerms = jest.fn();
    const onPressPrivacyPolicy = jest.fn();
    await render(<SignUp onPressTerms={onPressTerms} onPressPrivacyPolicy={onPressPrivacyPolicy} />);
    await fireEvent.press(screen.getByText('Termos de Aceite'));
    await fireEvent.press(screen.getByText('Política de Privacidade'));
    expect(onPressTerms).toHaveBeenCalledTimes(1);
    expect(onPressPrivacyPolicy).toHaveBeenCalledTimes(1);
  });
});
