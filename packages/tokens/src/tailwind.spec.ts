import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import { tailwindPreset } from './tailwind';
import { avatarSize, sizes } from './sizes';

/**
 * Compila as classes pedidas com o Tailwind REAL, sobre o preset publicado.
 *
 * O teste de classe emitida (`className` contém `w-avatar-md`) que o `AvatarFallback`
 * já tem NÃO cobre isto: ele prova que o componente pede a classe certa, não que a
 * classe existe. Uma escala aninhada passa naquele teste e mesmo assim gera zero CSS.
 */
async function compile(classNames: readonly string[]): Promise<string> {
  const { css } = await postcss([
    tailwindcss({
      content: [{ raw: `<div class="${classNames.join(' ')}"></div>`, extension: 'html' }],
      presets: [tailwindPreset],
      corePlugins: { preflight: false },
    }),
  ]).process('@tailwind utilities;', { from: undefined });
  return css;
}

/** Casa `.classe { prop: valor }` sem depender da indentação do output. */
const rule = (className: string, property: string, value: string): RegExp =>
  new RegExp(`\\.${className.replace(/[-]/g, '\\-')}\\s*\\{\\s*${property}:\\s*${value}\\s*\\}`);

describe('tailwindPreset — escalas de dimensão', () => {
  const avatarEntries = Object.entries(avatarSize);

  it.each(avatarEntries)('gera w-avatar-%s e h-avatar-%s (%spx) a partir do token', async (key, value) => {
    const css = await compile([`w-avatar-${key}`, `h-avatar-${key}`]);

    expect(css).toMatch(rule(`w-avatar-${key}`, 'width', `${value}px`));
    expect(css).toMatch(rule(`h-avatar-${key}`, 'height', `${value}px`));
  });

  /**
   * Regressão: a escala já foi registrada aninhada (`width: { avatar: {...} }`) supondo
   * que o Tailwind achataria como faz com `colors`. Ele não achata — o objeto vazava
   * como `.w-avatar width { sm: 28px; … }` e o avatar colapsava em todo consumidor.
   */
  it('não emite regra malformada a partir de objeto aninhado', async () => {
    const css = await compile(avatarEntries.flatMap(([key]) => [`w-avatar-${key}`, `h-avatar-${key}`]));

    expect(css).not.toMatch(/\.[\w-]+ (width|height) \{/);
  });

  it('mantém as escalas planas já existentes (h-control)', async () => {
    const css = await compile(['h-control']);

    expect(css).toMatch(rule('h-control', 'height', `${sizes.control}px`));
  });
});
