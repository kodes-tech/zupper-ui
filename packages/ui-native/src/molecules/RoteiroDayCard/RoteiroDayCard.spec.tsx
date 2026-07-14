import { render, screen } from '@testing-library/react-native';
import { RoteiroDayCard } from './RoteiroDayCard';
import type { RoteiroStop } from './RoteiroDayCard';

const stops: RoteiroStop[] = [
  { id: 'manha', period: 'MANHÃ', title: 'Marco Zero', description: 'Comece cedo.' },
  { id: 'noite', period: 'NOITE', title: 'Rua da Moeda', description: 'Jantar tranquilo.' },
];

describe('RoteiroDayCard', () => {
  it('renders the day header and every stop', () => {
    render(<RoteiroDayCard day="Dia 1." title="Recife Antigo" stops={stops} />);
    expect(screen.getByText('Dia 1.')).toBeOnTheScreen();
    expect(screen.getByText('Recife Antigo')).toBeOnTheScreen();
    expect(screen.getByText('MANHÃ')).toBeOnTheScreen();
    expect(screen.getByText('Marco Zero')).toBeOnTheScreen();
    expect(screen.getByText('Rua da Moeda')).toBeOnTheScreen();
  });
});
