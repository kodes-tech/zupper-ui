/**
 * generate-icons — gera os componentes de ícone a partir de `assets/<name>.svg`.
 *
 * Fonte da verdade: `assets/` deste pacote (SVG cru, agnóstico de framework).
 * Cada ícone vira DOIS componentes gerados do MESMO svg:
 *   - `src/native/svg/<Pascal>.tsx` — react-native-svg  (svgr --native)
 *   - `src/web/svg/<Pascal>.tsx`    — <svg> DOM         (svgr)
 * Além dos componentes, o script regenera os arquivos derivados (sempre em sync
 * com `assets/`): `src/names.ts`, `src/{native,web}/svg/index.ts` e
 * `src/{native,web}/registry.ts`. Não há passo manual de registro — depois de
 * gerar, rode `npm run icons:audit` para validar os elos.
 *
 * Uso:
 *   node scripts/generate-icons.mjs <name-kebab> [...]  # um ou mais ícones
 *   node scripts/generate-icons.mjs --all               # todos os assets
 *   node scripts/generate-icons.mjs --sync              # só os arquivos derivados
 *
 * A normalização replica o formato canônico do design system: sem
 * `overflow/preserveAspectRatio/style` de export do Figma, `var(--stroke-0, X)`
 * colapsado no fallback. Requer rede para gerar (usa `npx @svgr/cli`); `--sync`
 * funciona offline.
 */
import { execSync } from 'node:child_process';
import { writeFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const PKG = resolve(HERE, '..');
const ASSETS = resolve(PKG, 'assets');
const NATIVE_OUT = resolve(PKG, 'src/native/svg');
const WEB_OUT = resolve(PKG, 'src/web/svg');

const toPascal = (kebab) => kebab.replace(/(^|-)([a-z0-9])/g, (_, __, c) => c.toUpperCase());
const isBareKey = (key) => /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key);

const allNames = () =>
  readdirSync(ASSETS)
    .filter((f) => f.endsWith('.svg'))
    .map((f) => f.replace('.svg', ''))
    .sort();

// ---------------------------------------------------------------------------
// Geração de um componente (svgr) — normalização comum aos dois renderers.
// ---------------------------------------------------------------------------
const normalize = (raw, pascal) =>
  raw
    .replace(/\s*overflow="visible"/g, '')
    .replace(/\s*preserveAspectRatio="none"/g, '')
    .replace(/\s*style=\{\{\s*display: 'block',?\s*\}\}/g, '')
    .replace(/var\(--[a-z0-9-]+,\s*([^)]+)\)/gi, '$1')
    .replace(/SvgIcon/g, 'Svg')
    .replace(new RegExp(`Svg${pascal.replace(/^Svg/, '')}`, 'g'), `Svg${pascal}`);

const generateOne = (name) => {
  const src = resolve(ASSETS, `${name}.svg`);
  if (!existsSync(src)) {
    console.error(`não encontrei ${src}`);
    process.exit(1);
  }
  const pascal = toPascal(name);
  const svgr = (nativeFlag) =>
    execSync(
      `npx --yes @svgr/cli@latest ${nativeFlag} --typescript --no-dimensions --icon=false --expand-props=end "${src}"`,
      { encoding: 'utf8' },
    );

  // native: sem xmlns (react-native-svg não usa)
  const native = normalize(svgr('--native'), pascal).replace(/\s*xmlns="[^"]*"/g, '');
  writeFileSync(resolve(NATIVE_OUT, `${pascal}.tsx`), native);

  // web: mantém xmlns (o <svg> DOM pode ser extraído/embutido standalone)
  const web = normalize(svgr(''), pascal);
  writeFileSync(resolve(WEB_OUT, `${pascal}.tsx`), web);

  console.log(`✓ ${name} → native/svg/${pascal}.tsx + web/svg/${pascal}.tsx`);
};

// ---------------------------------------------------------------------------
// Sync — regenera os arquivos derivados a partir de assets/.
// ---------------------------------------------------------------------------
const GENERATED_HEADER = '// GERADO por scripts/generate-icons.mjs — não edite à mão.\n';

const syncDerived = () => {
  const names = allNames();

  const namesTs =
    GENERATED_HEADER +
    '/** Todos os nomes de ícone registrados (para galerias, pickers e o audit visual). */\n' +
    'export const iconNames = [\n' +
    names.map((n) => `  '${n}',`).join('\n') +
    '\n] as const;\n\n' +
    'export type IconName = (typeof iconNames)[number];\n';
  writeFileSync(resolve(PKG, 'src/names.ts'), namesTs);

  const indexTs =
    GENERATED_HEADER +
    names.map((n) => `export { default as ${toPascal(n)} } from './${toPascal(n)}';`).join('\n') +
    '\n';
  writeFileSync(resolve(NATIVE_OUT, 'index.ts'), indexTs);
  writeFileSync(resolve(WEB_OUT, 'index.ts'), indexTs);

  const registryTs = (propsType, importLines) =>
    GENERATED_HEADER +
    importLines +
    "import type { IconName } from '../names';\n" +
    "import * as Svgs from './svg';\n" +
    '\n' +
    '/**\n' +
    ' * Registro nome → componente SVG (gerados do Figma via svgr, em `./svg`).\n' +
    ' * Cada ícone carrega a própria cor do Figma; o `Icon` só controla o tamanho.\n' +
    ' */\n' +
    `export const registry: Record<IconName, (props: ${propsType}) => React.JSX.Element> = {\n` +
    names.map((n) => `  ${isBareKey(n) ? n : `'${n}'`}: Svgs.${toPascal(n)},`).join('\n') +
    '\n};\n';

  writeFileSync(
    resolve(PKG, 'src/native/registry.ts'),
    registryTs(
      'SvgProps',
      "import type * as React from 'react';\nimport type { SvgProps } from 'react-native-svg';\n",
    ),
  );
  writeFileSync(
    resolve(PKG, 'src/web/registry.ts'),
    registryTs('React.SVGProps<SVGSVGElement>', "import type * as React from 'react';\n"),
  );

  console.log(`✓ sync — ${names.length} ícones em names.ts, index.ts (2x) e registry.ts (2x)`);
};

// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('uso: node scripts/generate-icons.mjs <name-kebab> [...] | --all | --sync');
  process.exit(1);
}
if (!args.includes('--sync')) {
  const targets = args.includes('--all') ? allNames() : args;
  for (const name of targets) generateOne(name);
}
syncDerived();
