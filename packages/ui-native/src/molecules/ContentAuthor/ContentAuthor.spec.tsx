import { render, screen } from '@testing-library/react-native';
import { ContentAuthor } from './ContentAuthor';

const baseProps = {
  name: 'Carlos Souza',
  handle: '@carlosviaja',
  avatar: { uri: 'avatar' },
  role: 'traveler' as const,
};

describe('ContentAuthor', () => {
  it('renders name, handle and role', async () => {
    await render(<ContentAuthor {...baseProps} />);
    expect(screen.getByText('Carlos Souza')).toBeOnTheScreen();
    expect(screen.getByText('@carlosviaja')).toBeOnTheScreen();
    expect(screen.getByText('Viajante')).toBeOnTheScreen();
  });

  it('renders location only when provided', async () => {
    const { rerender } = await render(<ContentAuthor {...baseProps} />);
    expect(screen.queryByText('Fernando de Noronha')).toBeNull();
    await rerender(<ContentAuthor {...baseProps} location="Fernando de Noronha" />);
    expect(screen.getByText('Fernando de Noronha')).toBeOnTheScreen();
  });
});
