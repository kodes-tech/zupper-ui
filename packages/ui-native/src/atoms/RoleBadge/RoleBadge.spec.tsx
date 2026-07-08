import { render, screen } from '@testing-library/react-native';
import { RoleBadge } from './RoleBadge';

describe('RoleBadge', () => {
  it.each([
    ['guest', 'Visitante'],
    ['traveler', 'Viajante'],
    ['partner', 'Parceiro'],
  ] as const)('renders the default label for the %s variant', (variant, expected) => {
    render(<RoleBadge variant={variant} />);
    expect(screen.getByText(expected)).toBeOnTheScreen();
  });

  it('renders a custom label when provided', () => {
    render(<RoleBadge variant="traveler" label="Influencer" />);
    expect(screen.getByText('Influencer')).toBeOnTheScreen();
    expect(screen.queryByText('Viajante')).not.toBeOnTheScreen();
  });
});
