/**
 * audit-icons — garante a integridade 1:1 do sistema de ícones nos DOIS renderers:
 *
 *   assets/<key>.svg ↔ names.ts ↔ {native,web}/svg/<Comp>.tsx ↔ registry ↔ svg/index.ts
 *
 * A fonte da verdade é `assets/` deste pacote. Cada ícone vira um componente por
 * renderer (react-native-svg e <svg> DOM), registrado no registry correspondente.
 * Este script falha (exit 1) se algum elo se soltar — use no CI e antes de publicar.
 * Os arquivos derivados são regenerados por `generate-icons.mjs --sync`.
 *
 * Uso: `npm run icons:audit -w @kodes-tech/icons`
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const PKG = resolve(HERE, '..');
const ASSETS = resolve(PKG, 'assets');

const toPascal = (kebab) => kebab.replace(/(^|-)([a-z0-9])/g, (_, __, c) => c.toUpperCase());

const sources = existsSync(ASSETS)
  ? readdirSync(ASSETS)
      .filter((f) => f.endsWith('.svg'))
      .map((f) => f.replace('.svg', ''))
  : [];

const namesTs = readFileSync(resolve(PKG, 'src/names.ts'), 'utf8');
const namesBody = namesTs.slice(namesTs.indexOf('iconNames = ['), namesTs.indexOf('] as const'));
const names = [...namesBody.matchAll(/'([a-z0-9-]+)'/g)].map((m) => m[1]);

const errors = [];

// assets ↔ names.ts
for (const s of sources) {
  if (!names.includes(s)) errors.push(`assets/${s}.svg -> ausente em names.ts (rode --sync)`);
}
for (const n of names) {
  if (!sources.includes(n)) errors.push(`names.ts '${n}' -> missing assets/${n}.svg`);
}

// por renderer: componente ↔ registry ↔ index
for (const renderer of ['native', 'web']) {
  const svgDir = resolve(PKG, `src/${renderer}/svg`);
  const compFiles = readdirSync(svgDir)
    .filter((f) => f.endsWith('.tsx'))
    .map((f) => f.replace('.tsx', ''));

  const registryTs = readFileSync(resolve(PKG, `src/${renderer}/registry.ts`), 'utf8');
  const regBody = registryTs.slice(registryTs.indexOf('registry:'), registryTs.lastIndexOf('};'));
  const registry = [
    ...regBody.matchAll(/(?:'([a-z0-9-]+)'|([a-zA-Z0-9]+))\s*:\s*Svgs\.([A-Za-z0-9]+)/g),
  ].map((m) => ({ key: m[1] ?? m[2], comp: m[3] }));

  const svgIndex = readFileSync(resolve(svgDir, 'index.ts'), 'utf8');
  const exported = [...svgIndex.matchAll(/export \{ default as ([A-Za-z0-9]+) \}/g)].map(
    (m) => m[1],
  );

  const registered = new Set(registry.map((r) => r.comp));
  const keys = new Set(registry.map((r) => r.key));

  for (const r of registry) {
    if (!compFiles.includes(r.comp))
      errors.push(`${renderer}: registry '${r.key}' -> missing svg/${r.comp}.tsx`);
    if (!exported.includes(r.comp))
      errors.push(`${renderer}: registry '${r.key}' -> not exported in svg/index.ts`);
    if (toPascal(r.key) !== r.comp)
      errors.push(`${renderer}: registry '${r.key}' -> component ${r.comp} does not match the key`);
  }
  for (const c of compFiles) {
    if (!registered.has(c))
      errors.push(`${renderer}: svg/${c}.tsx -> not registered in registry.ts`);
    if (!exported.includes(c))
      errors.push(`${renderer}: svg/${c}.tsx -> not exported in svg/index.ts`);
  }
  for (const n of names) {
    if (!keys.has(n))
      errors.push(`${renderer}: names.ts '${n}' -> ausente no registry (rode --sync)`);
  }
}

if (errors.length) {
  console.error(`✗ icon audit failed (${errors.length}):`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}
console.log(
  `✓ icons OK — ${names.length} ícones, 1:1 em assets/ + names.ts + native/ + web/ (registry + exports)`,
);
