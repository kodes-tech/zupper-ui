import { render, screen, fireEvent } from '@testing-library/react-native';
import { SocialBar } from './SocialBar';

describe('SocialBar', () => {
  it('renders like and comment counters', () => {
    render(<SocialBar likes={128} comments={12} />);
    expect(screen.getByText('128')).toBeOnTheScreen();
    expect(screen.getByText('12')).toBeOnTheScreen();
  });

  it('fires the action callbacks', () => {
    const onLike = jest.fn();
    const onComment = jest.fn();
    const onShare = jest.fn();
    const onMore = jest.fn();
    render(
      <SocialBar
        likes={0}
        comments={0}
        onLike={onLike}
        onComment={onComment}
        onShare={onShare}
        onMore={onMore}
      />,
    );
    fireEvent.press(screen.getByLabelText('Curtir — 0 curtidas'));
    fireEvent.press(screen.getByLabelText('Comentar — 0 comentários'));
    fireEvent.press(screen.getByLabelText('Compartilhar'));
    fireEvent.press(screen.getByLabelText('Mais opções'));
    expect(onLike).toHaveBeenCalledTimes(1);
    expect(onComment).toHaveBeenCalledTimes(1);
    expect(onShare).toHaveBeenCalledTimes(1);
    expect(onMore).toHaveBeenCalledTimes(1);
  });
});
