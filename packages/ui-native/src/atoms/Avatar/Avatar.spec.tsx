import { render, screen } from '@testing-library/react-native';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders the image', () => {
    render(<Avatar source={{ uri: 'https://example.com/avatar.png' }} />);
    expect(screen.getByTestId('avatar-image')).toBeOnTheScreen();
  });

  it.each(['sm', 'lg'] as const)('renders the %s size', (size) => {
    render(<Avatar size={size} source={{ uri: 'https://example.com/avatar.png' }} />);
    expect(screen.getByTestId('avatar-container')).toBeOnTheScreen();
  });
});
