import { renderToStaticMarkup } from 'react-dom/server';
import { iconColor as nativeIconColor } from '../native/Icon';
import { Icon, iconColor, iconNames } from './Icon';

describe('Icon (web)', () => {
  it('renders the requested icon as a DOM <svg>', () => {
    const html = renderToStaticMarkup(<Icon name="heart" />);
    expect(html).toContain('<svg');
    expect(html).toContain('width="24"');
  });

  it('renders every registered icon without throwing', () => {
    for (const name of iconNames) {
      expect(renderToStaticMarkup(<Icon name={name} size={16} />)).toContain('<svg');
    }
  });

  it('reports the same intrinsic color as the native renderer (parity)', () => {
    for (const name of iconNames) {
      expect(iconColor(name)).toBe(nativeIconColor(name));
    }
  });
});
