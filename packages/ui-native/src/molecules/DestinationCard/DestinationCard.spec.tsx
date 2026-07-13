import { render, screen } from '@testing-library/react-native';
import { DestinationCard } from './DestinationCard';

describe('DestinationCard', () => {
  it('renders the destination name', () => {
    render(<DestinationCard name="Noronha" image={{ uri: 'https://example.com/x.jpg' }} />);
    expect(screen.getByText('Noronha')).toBeOnTheScreen();
  });
});
