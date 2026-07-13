import { tokens, colors, spacing, typography, radii, elevation, sizes } from './index';

describe('@kodes-tech/tokens', () => {
  it('exposes all groups in the aggregate object', () => {
    expect(tokens).toMatchObject({
      colors,
      spacing,
      typography,
      radii,
      elevation,
      sizes,
    });
  });

  it('sizes uses a numeric scale (px)', () => {
    expect(typeof sizes.control).toBe('number');
    expect(sizes.control).toBeGreaterThan(0);
  });

  it('spacing uses a numeric scale (px)', () => {
    expect(typeof spacing.md).toBe('number');
    expect(spacing.md).toBeGreaterThan(0);
  });

  it('colors are hex strings', () => {
    expect(colors.brand.strong).toMatch(/^#[0-9a-fA-F]{3,8}$/);
    expect(colors.text.primary).toMatch(/^#/);
  });

  it('typography has family, scale, and weights', () => {
    expect(typeof typography.family).toBe('string');
    expect(typeof typography.size.md).toBe('number');
    expect(typography.weight.bold).toBe('700');
  });

  it('radii includes pill (fully rounded)', () => {
    expect(radii.pill).toBeGreaterThanOrEqual(999);
  });

  it('elevation is an increasing numeric scale', () => {
    expect(elevation.none).toBe(0);
    expect(elevation.high).toBeGreaterThan(elevation.low);
  });
});
