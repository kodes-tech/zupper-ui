import { render, screen } from '@testing-library/react-native';
import { SearchField } from './SearchField';

describe('SearchField', () => {
  it('renders the placeholder', () => {
    render(<SearchField />);
    expect(screen.getByText('Qual seu destino?')).toBeOnTheScreen();
  });
});
