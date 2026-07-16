import { render, screen } from '@testing-library/react-native';
import { colors } from '@kodes-tech/tokens';
import { BaggageIndicator } from './BaggageIndicator';

describe('BaggageIndicator', () => {
  it('renders the baggage allowance row', async () => {
    await render(<BaggageIndicator />);
    expect(screen.getByLabelText('Franquia de bagagem')).toBeOnTheScreen();
  });

  it('colors included items with the brand color and excluded items with the border color', async () => {
    await render(<BaggageIndicator personalItem checkedBaggage={false} carryOn />);
    expect(screen.getByTestId('baggage-personal').props.color).toBe(colors.brand.zupper);
    expect(screen.getByTestId('baggage-checked').props.color).toBe(colors.border.default);
    expect(screen.getByTestId('baggage-carryon').props.color).toBe(colors.brand.zupper);
  });
});
