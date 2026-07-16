import { render, screen, fireEvent } from '@testing-library/react-native';
import { PasswordResetSuccess } from './PasswordResetSuccess';

describe('PasswordResetSuccess', () => {
  it('renders the title, description and login link', async () => {
    await render(<PasswordResetSuccess />);
    expect(screen.getByText('Senha redefinida')).toBeOnTheScreen();
    expect(screen.getByText('Ir para login')).toBeOnTheScreen();
  });

  it('fires onPressLogin', async () => {
    const onPressLogin = jest.fn();
    await render(<PasswordResetSuccess onPressLogin={onPressLogin} />);
    await fireEvent.press(screen.getByText('Ir para login'));
    expect(onPressLogin).toHaveBeenCalledTimes(1);
  });
});
