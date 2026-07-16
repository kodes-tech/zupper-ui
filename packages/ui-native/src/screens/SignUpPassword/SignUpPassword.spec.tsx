import { Text } from 'react-native';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { SignUpPassword } from './SignUpPassword';

const requirements = [
  { label: 'Letra maiúscula', met: false },
  { label: 'Letra minúscula', met: false },
  { label: '8 caracteres', met: false },
  { label: 'Número e símbolo', met: false },
];

describe('SignUpPassword', () => {
  it('renders the title, password field and requirements', async () => {
    await render(<SignUpPassword requirements={requirements} />);
    expect(screen.getByText('Crie sua senha')).toBeOnTheScreen();
    expect(screen.getByPlaceholderText('Digite sua senha')).toBeOnTheScreen();
    expect(screen.getByText('Letra maiúscula')).toBeOnTheScreen();
    expect(screen.getByText('8 caracteres')).toBeOnTheScreen();
  });

  it('fires onSubmit only when canSubmit is true', async () => {
    const onSubmit = jest.fn();
    const { rerender } = await render(
      <SignUpPassword requirements={requirements} canSubmit={false} onSubmit={onSubmit} />,
    );
    await fireEvent.press(screen.getByTestId('button'));
    expect(onSubmit).not.toHaveBeenCalled();

    await rerender(<SignUpPassword requirements={requirements} canSubmit onSubmit={onSubmit} />);
    await fireEvent.press(screen.getByTestId('button'));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('fires onPressTerms and onPressPrivacyPolicy', async () => {
    const onPressTerms = jest.fn();
    const onPressPrivacyPolicy = jest.fn();
    await render(
      <SignUpPassword
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

  it('renders the overlay when provided', async () => {
    await render(<SignUpPassword requirements={requirements} overlay={<Text>Sheet aberto</Text>} />);
    expect(screen.getByText('Sheet aberto')).toBeOnTheScreen();
  });
});
