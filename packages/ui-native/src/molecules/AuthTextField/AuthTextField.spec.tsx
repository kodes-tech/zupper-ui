import { render, screen, fireEvent } from '@testing-library/react-native';
import { AuthTextField } from './AuthTextField';

describe('AuthTextField', () => {
  it('renders the label and placeholder', async () => {
    await render(<AuthTextField label="Email" icon="email" placeholder="Seu email" />);
    expect(screen.getByText('Email')).toBeOnTheScreen();
    expect(screen.getByPlaceholderText('Seu email')).toBeOnTheScreen();
  });

  it('renders the error message only when provided', async () => {
    await render(<AuthTextField label="Senha" icon="lock" error="Senha incorreta" />);
    expect(screen.getByText('Senha incorreta')).toBeOnTheScreen();
  });

  it('fires onPressTrailingIcon', async () => {
    const onPressTrailingIcon = jest.fn();
    await render(
      <AuthTextField
        label="Senha"
        icon="lock"
        trailingIcon="eye-slash"
        onPressTrailingIcon={onPressTrailingIcon}
      />,
    );
    await fireEvent.press(screen.getByLabelText('Alternar visibilidade: Senha'));
    expect(onPressTrailingIcon).toHaveBeenCalledTimes(1);
  });

  it('omits the trailing icon when not provided', async () => {
    await render(<AuthTextField label="Email" icon="email" />);
    expect(screen.queryByLabelText('Alternar visibilidade: Email')).not.toBeOnTheScreen();
  });
});
