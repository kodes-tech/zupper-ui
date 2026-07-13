/**
 * generate-icon — gera UM atom de ícone a partir de `assets/icons/<name>.svg`.
 *
 * Fonte da verdade: `assets/icons/` na raiz do repo (SVG agnóstico de framework).
 * Este script roda svgr (react-native-svg) e normaliza a saída pro formato
 * canônico do design system: sem `xmlns/overflow/style`, `var(--stroke-0, X)`
 * colapsado no fallback, sem o prefixo `Svg`+`Icon`. Depois de gerar, registre o
 * ícone em `src/atoms/Icon/svg/index.ts` e no `registry` de `Icon.tsx`, e rode
 * `npm run icons:audit`.
 *
 * Uso: `node scripts/generate-icon.mjs <name-kebab>`  (ex.: `heart`, `nav-conta`)
 * Requer rede (usa `npx @svgr/cli`). Só (re)escreve o ícone pedido.
 */
import { execSync } from 'node:child_process';
import { writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const UI = resolve(HERE, '..');
const ICONS = resolve(UI, '../../assets/icons');
const OUT = resolve(UI, 'src/atoms/Icon/svg');

const name = process.argv[2];
if (!name) {
  console.error('uso: node scripts/generate-icon.mjs <name-kebab>');
  process.exit(1);
}
const src = resolve(ICONS, `${name}.svg`);
if (!existsSync(src)) {
  console.error(`não encontrei ${src}`);
  process.exit(1);
}

const pascal = name.replace(/(^|-)([a-z0-9])/g, (_, __, c) => c.toUpperCase());

const raw = execSync(
  `npx --yes @svgr/cli@latest --native --typescript --no-dimensions --icon=false --expand-props=end "${src}"`,
  { encoding: 'utf8' },
);

const out = raw
  .replace(/\s*xmlns="[^"]*"/g, '')
  .replace(/\s*overflow="visible"/g, '')
  .replace(/\s*preserveAspectRatio="none"/g, '')
  .replace(/\s*style=\{\{\s*display: 'block',?\s*\}\}/g, '')
  .replace(/var\(--[a-z0-9-]+,\s*([^)]+)\)/gi, '$1')
  .replace(/SvgIcon/g, 'Svg')
  .replace(new RegExp(`Svg${pascal.replace(/^Svg/, '')}`), `Svg${pascal}`);

writeFileSync(resolve(OUT, `${pascal}.tsx`), out);
console.log(`✓ svg/${pascal}.tsx gerado. Agora registre em svg/index.ts + Icon.tsx e rode icons:audit.`);
