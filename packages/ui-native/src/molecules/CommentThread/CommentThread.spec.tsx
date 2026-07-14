import { render, screen } from '@testing-library/react-native';
import { CommentThread } from './CommentThread';
import type { Comment } from './CommentThread';

const comments: Comment[] = [
  { id: '1', name: 'Marina', text: 'Anotado! Vou nessa semana.' },
  { id: '2', name: 'Pedro', text: 'O Cais é incrível mesmo' },
];

describe('CommentThread', () => {
  it('renders the heading with the comment count and the replies', async () => {
    await render(<CommentThread comments={comments} />);
    expect(screen.getByText('Comentários (2)')).toBeOnTheScreen();
    expect(screen.getByText('Marina')).toBeOnTheScreen();
    expect(screen.getByText('Pedro')).toBeOnTheScreen();
  });

  it('renders the author comment when provided', async () => {
    await render(
      <CommentThread
        authorComment={{ name: 'Carlos Souza', text: 'Vale muito a visita!' }}
        comments={[]}
      />,
    );
    expect(screen.getByText('Carlos Souza')).toBeOnTheScreen();
    expect(screen.getByText('Comentários (0)')).toBeOnTheScreen();
  });
});
