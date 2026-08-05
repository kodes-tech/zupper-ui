import { render, screen } from '@testing-library/react-native';
import { AvatarFallback } from './AvatarFallback';

describe('AvatarFallback', () => {
  it('renders the initials', async () => {
    await render(<AvatarFallback initials="HN" />);
    expect(screen.getByText('HN')).toBeOnTheScreen();
  });

  it.each(['sm', 'md', 'lg'] as const)('renders the %s size', async (size) => {
    await render(<AvatarFallback size={size} initials="AB" />);
    expect(screen.getByTestId('avatar-fallback')).toBeOnTheScreen();
  });

  // NativeWind does not compile `className` into styles under jest, so the size map is
  // asserted through the emitted class names — enough to catch a size wired to the wrong
  // token (e.g. `md` silently falling back to the 28px `sm` slot).
  // [AC-1] `md` occupies the 44px slot · [AC-2] `sm`/`lg` stay on their original slots.
  it.each([
    ['sm', 'avatar-sm'],
    ['md', 'avatar-md'],
    ['lg', 'avatar-lg'],
  ] as const)('sizes the %s container with the %s token', async (size, token) => {
    await render(<AvatarFallback size={size} initials="AB" />);
    expect(screen.getByTestId('avatar-fallback').props.className).toContain(
      `w-${token} h-${token}`,
    );
  });
});
