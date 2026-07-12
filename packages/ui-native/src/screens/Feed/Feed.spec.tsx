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
  const greeting = {
    title: 'Olá, Ana',
    subtitle: '@ana',
    role: 'partner' as const,
    ctaLabel: 'Meu perfil',
  };

  it('renders the greeting and the community section with posts', () => {
    render(<Feed greeting={greeting} posts={[post]} />);
    expect(screen.getByText('Olá, Ana')).toBeOnTheScreen();
    expect(screen.getByText('Comunidade Zupper')).toBeOnTheScreen();
    expect(screen.getByText('Conteúdo de teste')).toBeOnTheScreen();
  });

  it('renders the search field', () => {
    render(<Feed greeting={greeting} />);
    expect(screen.getByText('Qual seu destino?')).toBeOnTheScreen();
  });
});
