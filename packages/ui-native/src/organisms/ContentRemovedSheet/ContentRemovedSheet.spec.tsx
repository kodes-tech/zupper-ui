import { render, screen, fireEvent } from '@testing-library/react-native';
import { ContentRemovedSheet } from './ContentRemovedSheet';

describe('ContentRemovedSheet', () => {
  it('renders the title, body (with reason) and actions', async () => {
    await render(<ContentRemovedSheet reason="informação incorreta sobre o destino" />);
    expect(screen.getByText('Publicação removida')).toBeOnTheScreen();
    expect(screen.getByText(/informação incorreta sobre o destino/)).toBeOnTheScreen();
    expect(screen.getByText('Contestar decisão')).toBeOnTheScreen();
    expect(screen.getByText('Fechar')).toBeOnTheScreen();
  });

  it('fires onContest', async () => {
    const onContest = jest.fn();
    await render(<ContentRemovedSheet reason="spam" onContest={onContest} />);
    await fireEvent.press(screen.getByText('Contestar decisão'));
    expect(onContest).toHaveBeenCalled();
  });

  it('fires onClose', async () => {
    const onClose = jest.fn();
    await render(<ContentRemovedSheet reason="spam" onClose={onClose} />);
    await fireEvent.press(screen.getByText('Fechar'));
    expect(onClose).toHaveBeenCalled();
  });
});
