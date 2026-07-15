import { render, screen } from '@testing-library/react-native';
import { RangeSlider } from './RangeSlider';

describe('RangeSlider', () => {
  it('renders the formatted min/max labels', () => {
    render(
      <RangeSlider
        min={0}
        max={1000}
        values={[200, 800]}
        formatLabel={(v) => `R$ ${v}`}
      />,
    );
    expect(screen.getByText('R$ 200')).toBeOnTheScreen();
    expect(screen.getByText('R$ 800')).toBeOnTheScreen();
  });
});
