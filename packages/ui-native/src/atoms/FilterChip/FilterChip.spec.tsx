import { fireEvent, render, screen } from '@testing-library/react-native';
import { FilterChip } from './FilterChip';

describe('FilterChip', () => {
  it('renders the label', () => {
    render(<FilterChip label="Gastronomia" />);
    expect(screen.getByText('Gastronomia')).toBeOnTheScreen();
  });

  it('renders selected and unselected states', () => {
    render(<FilterChip label="Passeios" selected />);
    expect(screen.getByText('Passeios')).toBeOnTheScreen();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    render(<FilterChip label="Gastronomia" onPress={onPress} />);
    fireEvent.press(screen.getByTestId('filter-chip'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
