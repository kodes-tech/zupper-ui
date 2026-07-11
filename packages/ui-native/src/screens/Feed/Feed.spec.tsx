import { render, screen } from '@testing-library/react-native';
import { Feed } from './Feed';
import type { FeedPost } from './Feed';

const post: FeedPost = {
  id: '1',
  authorName: 'Ana Silva',
  authorAvatar: { uri: 'https://example.com/a.jpg' },
  role: 'partner',
  type: 'dica',
  text: 'Conteúdo de teste',
  likes: 1,
};

describe('Feed', () => {
  it('shows the empty state when there are no posts', () => {
    render(<Feed posts={[]} />);
    expect(screen.getByText(/Nenhuma publicação/)).toBeOnTheScreen();
  });

  it('shows the error state', () => {
    render(<Feed error="Falhou" />);
    expect(screen.getByText('Falhou')).toBeOnTheScreen();
  });

  it('renders the posts', () => {
    render(<Feed posts={[post]} />);
    expect(screen.getByText('Conteúdo de teste')).toBeOnTheScreen();
  });
});
