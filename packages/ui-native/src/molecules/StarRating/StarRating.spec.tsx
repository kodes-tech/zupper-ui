import { render, screen } from '@testing-library/react-native';
import { StarRating } from './StarRating';

describe('StarRating', () => {
  it('exposes the rating via accessibility label', async () => {
    await render(<StarRating rating={4} />);
    expect(screen.getByLabelText('4 estrelas')).toBeOnTheScreen();
  });
});
