import { render, screen, fireEvent } from '@testing-library/react-native';
import { CancelSuccessSheet } from './CancelSuccessSheet';

describe('CancelSuccessSheet', () => {
  it('renders the success copy', async () => {
    await render(<CancelSuccessSheet />);
    expect(screen.getByText('Cancelamento de pedido')).toBeOnTheScreen();
    expect(screen.getByText('O seu pedido foi cancelado')).toBeOnTheScreen();
  });

  it('fires onNewSearch', async () => {
    const onNewSearch = jest.fn();
    await render(<CancelSuccessSheet onNewSearch={onNewSearch} />);
    await fireEvent.press(screen.getByText('Fazer uma nova busca'));
    expect(onNewSearch).toHaveBeenCalledTimes(1);
  });
});
