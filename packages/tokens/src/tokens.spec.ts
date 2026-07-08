import { tokens, colors, spacing, typography, radii, elevation } from './index';

describe('@zupper/tokens', () => {
  it('expõe todos os grupos no objeto agregado', () => {
    expect(tokens).toMatchObject({
      colors,
      spacing,
      typography,
      radii,
      elevation,
    });
  });

  it('spacing usa escala numérica (px)', () => {
    expect(typeof spacing.md).toBe('number');
    expect(spacing.md).toBeGreaterThan(0);
  });

  it('cores são strings hex', () => {
    expect(colors.primary).toMatch(/^#[0-9a-fA-F]{3,8}$/);
    expect(colors.text.strong).toMatch(/^#/);
  });

  it('tipografia tem família, escala e pesos', () => {
    expect(typeof typography.family).toBe('string');
    expect(typeof typography.size.body).toBe('number');
    expect(typography.weight.bold).toBe('700');
  });

  it('radii inclui o pill (arredondado total)', () => {
    expect(radii.pill).toBeGreaterThanOrEqual(999);
  });

  it('elevation é uma escala numérica crescente', () => {
    expect(elevation.none).toBe(0);
    expect(elevation.high).toBeGreaterThan(elevation.low);
  });
});
