import { render, screen } from '@testing-library/react-native';
import { AvatarFallback } from './AvatarFallback';

describe('AvatarFallback', () => {
  it('renders the initials', () => {
    render(<AvatarFallback initials="HN" />);
    expect(screen.getByText('HN')).toBeOnTheScreen();
  });

  it.each(['sm', 'lg'] as const)('renders the %s size', (size) => {
    render(<AvatarFallback size={size} initials="AB" />);
    expect(screen.getByTestId('avatar-fallback')).toBeOnTheScreen();
  });
});
