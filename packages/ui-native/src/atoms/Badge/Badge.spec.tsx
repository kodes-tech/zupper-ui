import { render, screen } from '@testing-library/react-native';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders the label', async () => {
    await render(<Badge label="Novo" />);
    expect(screen.getByText('Novo')).toBeOnTheScreen();
  });

  it('accepts the tone', async () => {
    await render(<Badge label="Viajante" tone="brand" />);
    expect(screen.getByText('Viajante')).toBeOnTheScreen();
  });
});
