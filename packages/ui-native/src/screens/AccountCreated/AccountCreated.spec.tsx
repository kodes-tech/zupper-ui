import { render, screen, fireEvent } from '@testing-library/react-native';
import { AccountCreated } from './AccountCreated';

describe('AccountCreated', () => {
  it('renders the success message and CTA', async () => {
    await render(<AccountCreated />);
    expect(screen.getByText('Conta criada com sucesso')).toBeOnTheScreen();
    expect(screen.getByText('Entrar na minha conta')).toBeOnTheScreen();
  });

  it('fires onPressEnter', async () => {
    const onPressEnter = jest.fn();
    await render(<AccountCreated onPressEnter={onPressEnter} />);
    await fireEvent.press(screen.getByText('Entrar na minha conta'));
    expect(onPressEnter).toHaveBeenCalledTimes(1);
  });
});
