import { render, screen, fireEvent } from '@testing-library/react-native';
import { CancelErrorSheet } from './CancelErrorSheet';

describe('CancelErrorSheet', () => {
  it('renders the error copy', async () => {
    await render(<CancelErrorSheet />);
    expect(screen.getByText('Cancelamento de pedido')).toBeOnTheScreen();
    expect(screen.getByText('Hum... não identificamos esse número de pedido.')).toBeOnTheScreen();
  });

  it('fires onRetry and onContactSupport', async () => {
    const onRetry = jest.fn();
    const onContactSupport = jest.fn();
    await render(<CancelErrorSheet onRetry={onRetry} onContactSupport={onContactSupport} />);
    await fireEvent.press(screen.getByText('Voltar e tentar novamente'));
    await fireEvent.press(screen.getByText('Falar com suporte'));
    expect(onRetry).toHaveBeenCalledTimes(1);
    expect(onContactSupport).toHaveBeenCalledTimes(1);
  });
});
