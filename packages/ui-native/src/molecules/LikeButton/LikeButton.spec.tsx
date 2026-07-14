import { render, screen, fireEvent } from '@testing-library/react-native';
import { LikeButton } from './LikeButton';

describe('LikeButton', () => {
  it('renders the count', () => {
    render(<LikeButton count={42} />);
    expect(screen.getByText('42')).toBeOnTheScreen();
  });

  it('fires onPress when pressed', () => {
    const onPress = jest.fn();
    render(<LikeButton count={1} onPress={onPress} />);
    fireEvent.press(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
