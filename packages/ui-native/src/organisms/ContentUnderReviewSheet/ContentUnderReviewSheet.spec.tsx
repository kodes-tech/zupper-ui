import { render, screen, fireEvent } from '@testing-library/react-native';
import { ContentUnderReviewSheet } from './ContentUnderReviewSheet';

describe('ContentUnderReviewSheet', () => {
  it('renders the title, body and actions', async () => {
    await render(<ContentUnderReviewSheet />);
    expect(screen.getByText('Publicação em análise')).toBeOnTheScreen();
    expect(screen.getByText(/Recebemos uma denúncia/)).toBeOnTheScreen();
    expect(screen.getByText('Entenda as regras da comunidade')).toBeOnTheScreen();
    expect(screen.getByText('Fechar')).toBeOnTheScreen();
  });

  it('fires onLearnMore', async () => {
    const onLearnMore = jest.fn();
    await render(<ContentUnderReviewSheet onLearnMore={onLearnMore} />);
    await fireEvent.press(screen.getByText('Entenda as regras da comunidade'));
    expect(onLearnMore).toHaveBeenCalled();
  });

  it('fires onClose', async () => {
    const onClose = jest.fn();
    await render(<ContentUnderReviewSheet onClose={onClose} />);
    await fireEvent.press(screen.getByText('Fechar'));
    expect(onClose).toHaveBeenCalled();
  });
});
