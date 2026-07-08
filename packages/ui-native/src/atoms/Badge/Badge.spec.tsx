import { render, screen } from '@testing-library/react-native';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renderiza o label', () => {
    render(<Badge label="Novo" />);
    expect(screen.getByText('Novo')).toBeOnTheScreen();
  });

  it('aceita o tone', () => {
    render(<Badge label="Ativo" tone="success" />);
    expect(screen.getByText('Ativo')).toBeOnTheScreen();
  });
});
