import { render, screen } from '@testing-library/react-native';
import { CountdownBanner } from './CountdownBanner';

describe('CountdownBanner', () => {
  it('renders the formatted duration', async () => {
    await render(<CountdownBanner duration="14:38" />);
    expect(screen.getByText('Duração da oferta: 14:38')).toBeOnTheScreen();
  });
});
