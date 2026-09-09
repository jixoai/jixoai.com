/**
 * Internal-link audit (scripts/audit-blog-links.mjs).
 *
 * Third gate, alongside ai-tone-metrics (tone) and audit-blog-deletions
 * (information conservation): every internal link in content/blog must
 * resolve in the prerendered dist/, and no post may leak into the wrong
 * locale.
 *
 * Run it AFTER `npm run build` — resolution is checked against dist/,
 * which is the only place the real URL space exists (trailingSlash:
 * 'always' means /a/b/ is dist/a/b/index.html).
 *
 * Cross-locale rule: a locale-prefixed link (/zh/... and friends) is
 * legitimate only on the mirror line at the end of a post, where the
 * article points at its own translation. Anywhere else it means an en
 * post is sending readers to a zh-only URL.
 *
 * Usage: npm run build && node scripts/audit-blog-links.mjs
 */

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const BLOG = join(ROOT, 'content/blog');
const DIST = join(ROOT, 'dist');
const PREFIXED = ['zh', 'es', 'fr', 'de', 'ru', 'ja', 'ko', 'ar'];

if (!existsSync(DIST)) {
  console.error('dist/ not found — run `npm run build` first');
  process.exit(1);
}

const files = readdirSync(BLOG).filter((f) => f.endsWith('.md')).sort();

let broken = 0;
let crossLocale = 0;
let noSlash = 0;

for (const file of files) {
  const text = readFileSync(join(BLOG, file), 'utf8');
  const links = [...new Set([...text.matchAll(/\]\((\/[^)\s]*)\)/g)].map((m) => m[1]))];
  const issues = [];

  for (const href of links) {
    const clean = href.split('#')[0].split('?')[0];
    if (!clean.endsWith('/')) {
      noSlash++;
      issues.push(`  ? ${href}  (no trailing slash — the site is trailingSlash: 'always')`);
      continue;
    }
    if (!existsSync(join(DIST, clean, 'index.html'))) {
      broken++;
      issues.push(`  ✗ ${href}  -> missing in dist/`);
      continue;
    }
    if (PREFIXED.includes(clean.split('/')[1])) {
      const escaped = clean.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const onMirrorLine = new RegExp(`^- .*\\]\\(${escaped}\\)\\s*$`, 'm').test(text);
      if (!onMirrorLine) {
        crossLocale++;
        issues.push(`  ↔ ${href}  (locale-prefixed, not on the mirror line)`);
      }
    }
  }

  if (issues.length) {
    console.log(`\n### ${file}`);
    console.log(issues.join('\n'));
  }
}

console.log(`\n=== 断链 ${broken} 个，跨语种 ${crossLocale} 个，无尾斜杠 ${noSlash} 个`);
