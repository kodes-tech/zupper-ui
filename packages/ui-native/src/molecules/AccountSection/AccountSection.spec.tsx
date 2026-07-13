import { render, screen } from '@testing-library/react-native';
import { AccountSection } from './AccountSection';
import type { AccountSectionRow } from './AccountSection';

const rows: AccountSectionRow[] = [
  { id: 'help', icon: 'account-help', title: 'Central de ajuda', cta: 'Ir agora', boxed: false },
  { id: 'about', icon: 'account-about-zupper', title: 'Sobre o Zupper', cta: 'Ir agora', boxed: false },
];

describe('AccountSection', () => {
  it('renders the title and every row', () => {
    render(<AccountSection title="Ajuda" rows={rows} />);
    expect(screen.getByText('Ajuda')).toBeOnTheScreen();
    expect(screen.getByText('Central de ajuda')).toBeOnTheScreen();
    expect(screen.getByText('Sobre o Zupper')).toBeOnTheScreen();
  });
});
