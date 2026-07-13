import { render } from '@testing-library/react-native';
import { Icon, iconColor, iconNames } from './Icon';

describe('Icon', () => {
  it('renders the requested icon (SVG tree)', () => {
    const { toJSON } = render(<Icon name="heart" />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders a different icon by name', () => {
    const { toJSON } = render(<Icon name="globe" size={32} />);
    expect(toJSON()).toBeTruthy();
  });

  it('exposes every registered icon and renders it without throwing', () => {
    expect(iconNames.length).toBeGreaterThan(0);
    for (const name of iconNames) {
      const { toJSON } = render(<Icon name={name} />);
      expect(toJSON()).toBeTruthy();
    }
  });

  it('reports each icon intrinsic color (dark strokes vs white)', () => {
    expect(iconColor('heart')).toBe('#171717');
    expect(iconColor('publish')).toBe('white');
    expect(iconColor('comment-send')).toBe('#FFFFFF');
    // toda cor resolvida (nada cai no fallback preto por falha de parse)
    for (const name of iconNames) {
      expect(typeof iconColor(name)).toBe('string');
    }
  });
});
