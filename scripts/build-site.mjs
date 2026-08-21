#!/usr/bin/env node
/**
 * jixoai.com build orchestrator (scripts/build-site.mjs).
 *
 * Pipeline (order is load-bearing — see .github/workflows/deploy.yml):
 *  1. fetch-projects: query GitHub Releases → src/lib/projects.generated.json.
 *  2. vite build (SvelteKit + adapter-static) into dist/.
 *  3. Copy dist/* into public/ — the GitHub Pages artifact root.
 *
 * Result: public/ is directly deployable (upload-pages-artifact) or
 * previewable with `python3 -m http.server --directory public`.
 */

import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(repoRoot, 'dist');
const publicDir = path.join(repoRoot, 'public');

const die = (message) => {
  console.error(`[build-site] ${message}`);
  process.exit(1);
};

function run(command, args, label) {
  const result = spawnSync(command, args, { cwd: repoRoot, stdio: 'inherit' });
  if (result.status !== 0) {
    die(`${label} failed (exit ${result.status})`);
  }
}

/** vite's exports map hides ./bin/vite.js — resolve the package root through
 *  the exported ./package.json and join the bin path explicitly (same trick
 *  as the ui and unipty build scripts). */
function resolveViteBin() {
  const packageDir = path.dirname(require.resolve('vite/package.json', { paths: [repoRoot] }));
  const bin = path.join(packageDir, 'bin', 'vite.js');
  if (!existsSync(bin)) {
    die('cannot locate the vite binary; run `npm install` first');
  }
  return bin;
}

function main() {
  if (!existsSync(path.join(repoRoot, 'node_modules'))) {
    die('node_modules missing; run `npm install` first');
  }

  console.log('[build-site] 1/3 fetching project release versions');
  run(process.execPath, ['scripts/fetch-projects.mjs'], 'fetch-projects');
  if (!existsSync(path.join(repoRoot, 'src', 'lib', 'projects.generated.json'))) {
    die('fetch-projects did not emit src/lib/projects.generated.json');
  }

  console.log('[build-site] 2/3 building the static site (SvelteKit → dist/)');
  run(process.execPath, [resolveViteBin(), 'build'], 'vite build');
  if (!existsSync(path.join(distDir, 'index.html'))) {
    die('site build did not emit dist/index.html');
  }

  console.log('[build-site] 3/3 publishing dist/ → public/');
  rmSync(publicDir, { recursive: true, force: true });
  mkdirSync(publicDir, { recursive: true });
  cpSync(distDir, publicDir, { recursive: true });
  if (!existsSync(path.join(publicDir, 'index.html'))) {
    die('public/index.html missing after copy');
  }
  console.log('[build-site] ok: site in public/');
  console.log('[build-site] preview: python3 -m http.server --directory public');
}

main();
