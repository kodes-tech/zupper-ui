// Valida o conteúdo do que seria publicado em cada pacote:
// (1) nenhum *.spec.* ou *.stories.* vaza; (2) a saída de build está presente.
import { execSync } from 'node:child_process';

const packages = [
  { dir: 'packages/tokens', mustInclude: 'dist/' },
  { dir: 'packages/ui-native', mustInclude: 'lib/' },
];

let failed = false;

for (const pkg of packages) {
  const raw = execSync('npm pack --dry-run --json', { cwd: pkg.dir, encoding: 'utf8' });
  const files = JSON.parse(raw)[0].files.map((f) => f.path);

  console.log(`\n📦 ${pkg.dir} — ${files.length} arquivos no tarball`);

  const leaked = files.filter((f) => /\.(spec|stories)\./.test(f));
  if (leaked.length) {
    console.error(`  ❌ vazando testes/stories: ${leaked.join(', ')}`);
    failed = true;
  } else {
    console.log('  ✅ sem .spec/.stories');
  }

  if (!files.some((f) => f.startsWith(pkg.mustInclude))) {
    console.error(`  ❌ build ausente (esperado ${pkg.mustInclude})`);
    failed = true;
  } else {
    console.log(`  ✅ build presente (${pkg.mustInclude})`);
  }
}

process.exit(failed ? 1 : 0);
