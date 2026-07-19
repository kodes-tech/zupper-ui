import { fireEvent, render, screen } from '@testing-library/react-native';
import { FilterChip } from './FilterChip';

describe('FilterChip', () => {
  it('renders the label', async () => {
    await render(<FilterChip label="Gastronomia" />);
    expect(screen.getByText('Gastronomia')).toBeOnTheScreen();
  });

  it('renders selected and unselected states', async () => {
    await render(<FilterChip label="Passeios" selected />);
    expect(screen.getByText('Passeios')).toBeOnTheScreen();
  });

  it('calls onPress when pressed', async () => {
    const onPress = jest.fn();
    await render(<FilterChip label="Gastronomia" onPress={onPress} />);
    await fireEvent.press(screen.getByTestId('filter-chip'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
