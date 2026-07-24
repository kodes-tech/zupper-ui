// Gera `dist/theme.css` a partir dos temas buildados (`dist/index.js`).
//
// Roda DEPOIS do `tsc` (ver `build`/`prepare` no package.json). O CSS é a ponte de
// theming para o WEB: `:root` traz as variáveis do tema `default` (baseline/fallback)
// e cada `[data-theme="<nome>"]` sobrescreve. As classes do NativeWind referenciam
// `rgb(var(--color-…))`, então trocar o `data-theme` no elemento raiz re-skinna tudo.
//
// Fonte única: os valores vêm de `themeVars` (derivado de `themes.ts`) — nunca editar
// este CSS à mão. No app RN (Metro) o mesmo baseline é usado; a troca em runtime é via
// `vars()` do NativeWind (responsabilidade do app — ver ADR 0005).
import { createRequire } from 'node:module';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const require = createRequire(import.meta.url);
const here = dirname(fileURLToPath(import.meta.url));
const distIndex = resolve(here, '../dist/index.js');

const { themeVars } = require(distIndex);

/** Bloco `selector { --var: value; }` a partir de um mapa de variáveis. */
const block = (selector, vars) => {
  const lines = Object.entries(vars)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join('\n');
  return `${selector} {\n${lines}\n}`;
};

const blocks = [];
for (const [name, vars] of Object.entries(themeVars)) {
  // `default` vira o `:root` (baseline); os demais viram `[data-theme="<nome>"]`.
  blocks.push(block(name === 'default' ? ':root' : `[data-theme="${name}"]`, vars));
}

const banner =
  '/* GERADO por scripts/gen-theme-css.mjs a partir de themes.ts — NÃO editar à mão. */';
const out = `${banner}\n\n${blocks.join('\n\n')}\n`;

const target = resolve(here, '../dist/theme.css');
writeFileSync(target, out, 'utf8');
console.log(`[tokens] theme.css gerado (${Object.keys(themeVars).length} temas) → ${target}`);
