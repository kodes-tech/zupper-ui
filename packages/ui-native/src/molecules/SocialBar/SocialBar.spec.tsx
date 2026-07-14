import { render, screen, fireEvent } from '@testing-library/react-native';
import { SocialBar } from './SocialBar';

describe('SocialBar', () => {
  it('renders like and comment counters', async () => {
    await render(<SocialBar likes={128} comments={12} />);
    expect(screen.getByText('128')).toBeOnTheScreen();
    expect(screen.getByText('12')).toBeOnTheScreen();
  });

  it('fires the action callbacks', async () => {
    const onLike = jest.fn();
    const onComment = jest.fn();
    const onShare = jest.fn();
    const onMore = jest.fn();
    await render(
      <SocialBar
        likes={0}
        comments={0}
        onLike={onLike}
        onComment={onComment}
        onShare={onShare}
        onMore={onMore}
      />,
    );
    await fireEvent.press(screen.getByLabelText('Curtir — 0 curtidas'));
    await fireEvent.press(screen.getByLabelText('Comentar — 0 comentários'));
    await fireEvent.press(screen.getByLabelText('Compartilhar'));
    await fireEvent.press(screen.getByLabelText('Mais opções'));
    expect(onLike).toHaveBeenCalledTimes(1);
    expect(onComment).toHaveBeenCalledTimes(1);
    expect(onShare).toHaveBeenCalledTimes(1);
    expect(onMore).toHaveBeenCalledTimes(1);
  });
});
