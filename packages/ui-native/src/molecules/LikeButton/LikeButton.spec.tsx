import { render, screen, fireEvent } from '@testing-library/react-native';
import { LikeButton } from './LikeButton';

describe('LikeButton', () => {
  it('renders the count', async () => {
    await render(<LikeButton count={42} />);
    expect(screen.getByText('42')).toBeOnTheScreen();
  });

  it('fires onPress when pressed', async () => {
    const onPress = jest.fn();
    await render(<LikeButton count={1} onPress={onPress} />);
    await fireEvent.press(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
