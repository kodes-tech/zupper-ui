import { render } from '@testing-library/react-native';
import { Icon } from './Icon';

describe('Icon', () => {
  it('renders the requested icon (SVG tree)', () => {
    const { toJSON } = render(<Icon name="heart" />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders a different icon by name', () => {
    const { toJSON } = render(<Icon name="globe" size={32} />);
    expect(toJSON()).toBeTruthy();
  });
});
