// Valida o conteúdo do que seria publicado em cada pacote:
// (1) nenhum *.spec.* ou *.stories.* vaza; (2) a saída de build está presente.
import { execSync } from 'node:child_process';

const packages = [
  { dir: 'packages/tokens', mustInclude: 'dist/' },
  { dir: 'packages/ui-native', mustInclude: 'lib/' },
];

let failed = false;

/**
 * Lista os arquivos que iriam no tarball via `npm pack --dry-run --json`. O `prepare`
 * dos pacotes (ex.: o `bob build` do ui-native) escreve progresso no stdout junto do
 * JSON, então extraímos só o array JSON da saída (o `ℹ`/`✓` do bob não tem colchetes).
 * Em caso de falha, o `npm pack` sai != 0 (execSync lança) OU devolve `{ error }` no
 * --json; tratamos os dois para dar uma mensagem clara em vez de stack trace cru.
 */
function packedFiles(dir) {
  let raw;
  try {
    raw = execSync('npm pack --dry-run --json', { cwd: dir, encoding: 'utf8' });
  } catch (e) {
    return { error: e.stderr?.toString().trim() || e.message };
  }
  const json = raw.match(/\[[\s\S]*\]/); // ignora o ruído do prepare antes do JSON
  if (!json) {
    return { error: `saída sem JSON do npm pack:\n${raw.slice(0, 300)}` };
  }
  let parsed;
  try {
    parsed = JSON.parse(json[0]);
  } catch {
    return { error: `JSON inválido do npm pack:\n${raw.slice(0, 300)}` };
  }
  if (!Array.isArray(parsed) || !parsed[0]?.files) {
    return { error: parsed?.error?.detail || parsed?.error?.summary || 'formato inesperado do npm pack --json' };
  }
  return { files: parsed[0].files.map((f) => f.path) };
}

for (const pkg of packages) {
  const { files, error } = packedFiles(pkg.dir);

  if (error) {
    console.error(`\n📦 ${pkg.dir}\n  ❌ falha ao empacotar (build ausente/quebrado?): ${error}`);
    failed = true;
    continue;
  }

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
