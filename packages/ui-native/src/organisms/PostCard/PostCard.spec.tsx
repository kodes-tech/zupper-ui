import { render, screen, fireEvent } from '@testing-library/react-native';
import { PostCard } from './PostCard';
import type { PostCardProps } from './PostCard';

const baseProps: PostCardProps = {
  authorName: 'Ana Silva',
  authorAvatar: { uri: 'https://example.com/a.jpg' },
  role: 'partner',
  type: 'dica',
  text: 'Dica de teste',
  likes: 10,
};

describe('PostCard', () => {
  it('renders author, text and type tag', () => {
    render(<PostCard {...baseProps} />);
    expect(screen.getByText('Ana Silva')).toBeOnTheScreen();
    expect(screen.getByText('Dica de teste')).toBeOnTheScreen();
    expect(screen.getByText('Dica local')).toBeOnTheScreen();
  });

  it('fires onLike when the like button is pressed', () => {
    const onLike = jest.fn();
    render(<PostCard {...baseProps} onLike={onLike} />);
    fireEvent.press(screen.getByLabelText(/Curtir/));
    expect(onLike).toHaveBeenCalledTimes(1);
  });
});
