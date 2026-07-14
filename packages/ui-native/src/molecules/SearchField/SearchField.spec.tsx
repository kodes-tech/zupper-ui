import { render, screen } from '@testing-library/react-native';
import { SearchField } from './SearchField';

describe('SearchField', () => {
  it('renders the placeholder', async () => {
    await render(<SearchField />);
    expect(screen.getByText('Qual seu destino?')).toBeOnTheScreen();
  });
});
