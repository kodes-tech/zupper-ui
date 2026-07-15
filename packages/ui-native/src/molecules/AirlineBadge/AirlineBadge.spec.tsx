import { render, screen } from '@testing-library/react-native';
import { AirlineBadge } from './AirlineBadge';

describe('AirlineBadge', () => {
  it('renders the code when there is no logo', async () => {
    await render(<AirlineBadge code="LA" color="#1B0088" />);
    expect(screen.getByText('LA')).toBeOnTheScreen();
  });

  it('renders the logo instead of the code when an icon is given', async () => {
    await render(<AirlineBadge code="G3" icon="airline-gol" color="#F97316" />);
    expect(screen.queryByText('G3')).toBeNull();
  });

  it('falls back to the neutral code badge without a color', async () => {
    await render(<AirlineBadge code="AD" />);
    expect(screen.getByText('AD')).toBeOnTheScreen();
  });
});
