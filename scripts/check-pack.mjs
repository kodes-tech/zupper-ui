// Valida o conteúdo do que seria publicado em cada pacote:
// (1) nenhum *.spec.* ou *.stories.* vaza; (2) a saída de build está presente.
import { execSync } from 'node:child_process';

const packages = [
  { dir: 'packages/tokens', mustInclude: 'dist/' },
  { dir: 'packages/ui-native', mustInclude: 'lib/' },
];

let failed = false;

/**
 * O `npm pack --json` vem pretty-printed (linha isolada `[` … linha isolada `]`).
 * O `prepare` dos pacotes (ex.: o `bob build` do ui-native) imprime progresso no
 * stdout junto — inclusive com colchetes inline (`[BABEL]`, `[1/9]`) — então
 * delimitamos o bloco JSON pelas linhas isoladas `[` e `]`, ignorando o resto.
 */
function extractJsonArray(raw) {
  const lines = raw.split('\n');
  const start = lines.findIndex((l) => l.trim() === '[');
  const end = lines.map((l) => l.trim()).lastIndexOf(']');
  if (start === -1 || end <= start) return null;
  return lines.slice(start, end + 1).join('\n');
}

/**
 * Lista os arquivos que iriam no tarball. Em caso de falha, o `npm pack` sai != 0
 * (execSync lança) OU devolve `{ error }` no --json; tratamos os dois para dar uma
 * mensagem clara em vez de stack trace cru.
 */
function packedFiles(dir) {
  let raw;
  try {
    raw = execSync('npm pack --dry-run --json', { cwd: dir, encoding: 'utf8' });
  } catch (e) {
    return { error: e.stderr?.toString().trim() || e.message };
  }
  const jsonText = extractJsonArray(raw);
  if (!jsonText) {
    return { error: `sem bloco JSON no npm pack:\n${raw.slice(-400)}` };
  }
  let parsed;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    return { error: `JSON inválido do npm pack:\n${raw.slice(-400)}` };
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
