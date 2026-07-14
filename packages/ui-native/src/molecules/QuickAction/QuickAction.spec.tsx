import { render, screen } from '@testing-library/react-native';
import { QuickAction } from './QuickAction';

describe('QuickAction', () => {
  it('renders the label', async () => {
    await render(<QuickAction icon={{ uri: 'https://example.com/i.png' }} label="Pacotes" />);
    expect(screen.getByText('Pacotes')).toBeOnTheScreen();
  });
});
