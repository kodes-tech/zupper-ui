import { tokens, colors, spacing, typography, radii, elevation, sizes } from './index';
import { themes, getTheme, themeVars, hexToTriplet, flattenColors, type ThemeName } from './themes';

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

describe('themes', () => {
  it('hexToTriplet converts #RRGGBB and #RGB to "R G B"', () => {
    expect(hexToTriplet('#FFFFFF')).toBe('255 255 255');
    expect(hexToTriplet('#000000')).toBe('0 0 0');
    expect(hexToTriplet('#0A0A0A')).toBe('10 10 10');
    expect(hexToTriplet('#fff')).toBe('255 255 255'); // forma curta
  });

  it('themeVars use bare "R G B" triplets (exigência do <alpha-value>)', () => {
    for (const vars of Object.values(themeVars)) {
      for (const value of Object.values(vars)) {
        expect(value).toMatch(/^\d{1,3} \d{1,3} \d{1,3}$/);
      }
    }
  });

  it('flattenColors nomeia as variáveis como --color-<grupo>-<chave> (fg vem de text)', () => {
    const vars = flattenColors(themes.default);
    expect(vars['--color-surface-default']).toBe('255 255 255');
    expect(vars['--color-fg-primary']).toBe(hexToTriplet(colors.text.primary));
    // gradient (arrays) e scrim (literal) ficam de fora do flatten
    expect(Object.keys(vars).some((k) => k.startsWith('--color-gradient'))).toBe(false);
    expect(vars['--color-scrim']).toBeUndefined();
  });

  it('getTheme retorna o tema pedido e faz fallback pro default', () => {
    expect(getTheme('default')).toBe(themes.default);
    expect(getTheme('dark')).toBe(themes.dark);
    expect(getTheme()).toBe(themes.default);
    // nome inexistente cai no default (runtime — fora do tipo)
    expect(getTheme('natal' as ThemeName)).toBe(themes.default);
  });

  it('dark difere do default e tem PARIDADE total de chaves de variável', () => {
    const defaultKeys = Object.keys(themeVars.default).sort();
    const darkKeys = Object.keys(themeVars.dark).sort();
    expect(darkKeys).toEqual(defaultKeys); // nenhuma variável faltando/sobrando no dark
    // o fundo de tela muda entre os temas (dark = teal escuro da marca)
    expect(themeVars.dark['--color-surface-screen']).not.toBe(
      themeVars.default['--color-surface-screen'],
    );
  });
});
