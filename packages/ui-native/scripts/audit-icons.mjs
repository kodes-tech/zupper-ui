/**
 * audit-icons — garante a integridade 1:1 do sistema de ícones:
 *   assets/icons/<key>.svg  ↔  svg/<Comp>.tsx  ↔  registry (Icon.tsx)  ↔  svg/index.ts
 *
 * A fonte da verdade dos ícones é `assets/icons/` na RAIZ do repo. Cada ícone
 * vira um atom (componente `react-native-svg`) registrado no `Icon`. Este script
 * falha (exit 1) se algum elo se soltar — use no CI e antes de publicar.
 *
 * Uso: `npm run icons:audit -w @zupper/ui-native`
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const UI = resolve(HERE, '..');
const ICONS = resolve(UI, '../../assets/icons'); // repo-root assets/icons
const SVG_DIR = resolve(UI, 'src/atoms/Icon/svg');

const pascalToKebab = (s) =>
  s
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Za-z])([0-9])/g, '$1-$2')
    .toLowerCase();

// registry: key -> Component (from Icon.tsx)
const iconTsx = readFileSync(resolve(UI, 'src/atoms/Icon/Icon.tsx'), 'utf8');
const regBody = iconTsx.slice(iconTsx.indexOf('const registry'), iconTsx.indexOf('} as const'));
const registry = [...regBody.matchAll(/(?:'([a-z0-9-]+)'|([a-zA-Z0-9]+))\s*:\s*Svgs\.([A-Za-z0-9]+)/g)].map(
  (m) => ({ key: m[1] ?? m[2], comp: m[3] }),
);

const compFiles = readdirSync(SVG_DIR)
  .filter((f) => f.endsWith('.tsx'))
  .map((f) => f.replace('.tsx', ''));

const svgIndex = readFileSync(resolve(SVG_DIR, 'index.ts'), 'utf8');
const exported = [...svgIndex.matchAll(/export \{ default as ([A-Za-z0-9]+) \}/g)].map((m) => m[1]);

const sources = existsSync(ICONS)
  ? readdirSync(ICONS)
      .filter((f) => f.endsWith('.svg'))
      .map((f) => f.replace('.svg', ''))
  : [];

const errors = [];
const registered = new Set(registry.map((r) => r.comp));
const keys = new Set(registry.map((r) => r.key));

for (const r of registry) {
  if (!compFiles.includes(r.comp)) errors.push(`registry '${r.key}' -> missing svg/${r.comp}.tsx`);
  if (!exported.includes(r.comp)) errors.push(`registry '${r.key}' -> not exported in svg/index.ts`);
  if (!sources.includes(r.key)) errors.push(`registry '${r.key}' -> missing assets/icons/${r.key}.svg`);
  if (pascalToKebab(r.comp) !== r.key)
    errors.push(`registry '${r.key}' -> component ${r.comp} does not kebab to the key`);
}
for (const c of compFiles) {
  if (!registered.has(c)) errors.push(`svg/${c}.tsx -> not registered in Icon.tsx`);
  if (!exported.includes(c)) errors.push(`svg/${c}.tsx -> not exported in svg/index.ts`);
}
for (const s of sources) {
  if (!keys.has(s)) errors.push(`assets/icons/${s}.svg -> no matching atom in the registry`);
}

if (errors.length) {
  console.error(`✗ icon audit failed (${errors.length}):`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}
console.log(`✓ icons OK — ${registry.length} atoms, 1:1 with assets/icons/ + registry + exports`);
