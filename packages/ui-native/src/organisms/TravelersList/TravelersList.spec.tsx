import { render, screen } from '@testing-library/react-native';
import { TravelersList } from './TravelersList';

describe('TravelersList', () => {
  it('renders the title and travelers', () => {
    render(
      <TravelersList
        travelers={[
          { role: 'Adulto 1 (Quarto 1)', details: 'Maria Joaquina Silva, 30/11/1991' },
          { role: 'Criança (Quarto 1)', details: 'João Silva, 10/05/2015' },
        ]}
      />,
    );
    expect(screen.getByText('Viajantes')).toBeOnTheScreen();
    expect(screen.getByText('Adulto 1 (Quarto 1)')).toBeOnTheScreen();
    expect(screen.getByText('Maria Joaquina Silva, 30/11/1991')).toBeOnTheScreen();
    expect(screen.getByText('Criança (Quarto 1)')).toBeOnTheScreen();
  });
});
