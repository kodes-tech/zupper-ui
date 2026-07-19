import { render, screen, fireEvent } from '@testing-library/react-native';
import { BottomNav } from './BottomNav';
import type { BottomNavItem } from './BottomNav';

const items: BottomNavItem[] = [
  { key: 'home', label: 'Home', icon: 'nav-inicio-neutral', activeIcon: 'nav-inicio' },
  { key: 'search', label: 'Search', icon: 'nav-reservar' },
  { key: 'profile', label: 'Profile', icon: 'nav-conta', activeIcon: 'nav-conta-active' },
];

describe('BottomNav', () => {
  it('renders the given items', async () => {
    await render(<BottomNav items={items} />);
    ['Home', 'Search', 'Profile'].forEach((label) => {
      expect(screen.getByText(label)).toBeOnTheScreen();
    });
  });

  it('fires onNavigate with the item key', async () => {
    const onNavigate = jest.fn();
    await render(<BottomNav items={items} onNavigate={onNavigate} />);
    await fireEvent.press(screen.getByText('Profile'));
    expect(onNavigate).toHaveBeenCalledWith('profile');
  });

  it('marks the active item as selected', async () => {
    await render(<BottomNav items={items} active="profile" />);
    // Exatamente um item fica com accessibilityState.selected = true.
    expect(screen.getByRole('button', { selected: true })).toBeOnTheScreen();
  });

  it('supports up to five items', async () => {
    const five: BottomNavItem[] = [
      ...items,
      { key: 'a', label: 'A', icon: 'nav-pedidos' },
      { key: 'b', label: 'B', icon: 'community' },
    ];
    await render(<BottomNav items={five} />);
    ['Home', 'Search', 'Profile', 'A', 'B'].forEach((label) => {
      expect(screen.getByText(label)).toBeOnTheScreen();
    });
  });
});
