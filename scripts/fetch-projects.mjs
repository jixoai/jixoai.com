#!/usr/bin/env node
/**
 * jixoai.com release-version + README fetcher (scripts/fetch-projects.mjs).
 *
 * Orthogonal intents (maintained 2026-09-06): 1) read
 * projects.manifest.json (curated, owner-aware repo list); 2) query the
 * latest GitHub Release for each repo; 3) fetch each repo's README from
 * raw GitHub; 4) write src/lib/projects.generated.json (gitignored) for
 * the static build to consume. Roster/config changes are manifest edits,
 * never code edits. (2026-09-06 readme-i18n) 3b) fetch each repo's
 * translated READMEs (README-<lang>.md for the eight non-en hub locales,
 * concurrently per repo) into readmeTranslations; a 404 means "no such
 * translation" → null, never an error.
 *
 * Owner-aware repos (2026-09-06, project-hub spec): a bare name
 * ("opentray") means the jixoai org; "owner/name" entries carry an explicit
 * owner and resolves identically — the releases URL, the repoUrl
 * concatenation and the README raw path all split owner/name.
 *
 * Auth ladder per repo (releases AND README):
 *   1. REST API with GH_TOKEN/GITHUB_TOKEN bearer (CI path — the Actions
 *      workflow injects secrets.GITHUB_TOKEN).
 *   2. `gh api` via the local CLI login (developer path — gh is logged in).
 *   3. Anonymous REST API (last resort; subject to rate limits).
 *
 * A 404 ("no latest release" / "no README") is a normal result → version
 * "v—" / readme null. A transport failure falls back to the previous
 * generated value when one exists (a stale build beats a broken build).
 */

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = path.join(repoRoot, 'projects.manifest.json');
const generatedPath = path.join(repoRoot, 'src', 'lib', 'projects.generated.json');
const ORG = 'jixoai';
const NO_RELEASE = 'v—';
/** The eight non-en hub locales a README translation may exist for
 * (README-zh.md … README-ar.md at the repo head). */
const TRANSLATION_LANGS = ['zh', 'es', 'fr', 'de', 'ru', 'ja', 'ko', 'ar'];

const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN || '';

const die = (message) => {
  console.error(`[fetch-projects] ${message}`);
  process.exit(1);
};

/** "opentray" → { owner: "jixoai", name: "opentray" }; "Gaubee/dweb" →
 *  { owner: "Gaubee", name: "dweb" } — the one owner-aware seam. */
function parseRepo(repo) {
  const slash = repo.indexOf('/');
  if (slash === -1) return { owner: ORG, name: repo, slug: repo };
  const owner = repo.slice(0, slash);
  const name = repo.slice(slash + 1);
  return { owner, name, slug: `${owner.toLowerCase()}--${name}` };
}

/** REST API attempt; returns { tag, url } | null (404), throws on failure. */
async function fetchReleaseViaApi(ownerName) {
  const response = await fetch(`https://api.github.com/repos/${ownerName}/releases/latest`, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'jixoai.com-site-build',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  return { tag: data.tag_name, url: data.html_url };
}

/** README via the REST contents API (base64 body, honoring the token);
 *  returns the decoded markdown | null (404), throws on failure. */
async function fetchReadmeViaApi(ownerName) {
  const response = await fetch(`https://api.github.com/repos/${ownerName}/readme`, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'jixoai.com-site-build',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  return Buffer.from(data.content, 'base64').toString('utf8');
}

/** Local gh CLI attempts (use its own stored login); same contracts. */
function fetchReleaseViaGh(ownerName) {
  const result = spawnSync(
    'gh',
    ['api', `repos/${ownerName}/releases/latest`, '--jq', '{tag: .tag_name, url: .html_url}'],
    { encoding: 'utf8' },
  );
  if (result.status === 0 && result.stdout.trim()) {
    try {
      const parsed = JSON.parse(result.stdout);
      return { tag: parsed.tag, url: parsed.url };
    } catch {
      /* fall through */
    }
  }
  if (/Not Found|"status":\s*"404"/.test(result.stderr || '')) return null;
  throw new Error(`gh api exited ${result.status}: ${(result.stderr || '').trim()}`);
}

function fetchReadmeViaGh(ownerName) {
  const result = spawnSync(
    'gh',
    ['api', `repos/${ownerName}/readme`, '--jq', '.content'],
    { encoding: 'utf8' },
  );
  if (result.status === 0 && result.stdout.trim()) {
    try {
      return Buffer.from(result.stdout.trim(), 'base64').toString('utf8');
    } catch {
      /* fall through */
    }
  }
  if (/Not Found|"status":\s*"404"/.test(result.stderr || '')) return null;
  throw new Error(`gh api exited ${result.status}: ${(result.stderr || '').trim()}`);
}

/** Translated README (README-<lang>.md) via the contents API with the
 *  path pinned; same contract as fetchReadmeViaApi but for an exact
 *  filename — the default README's case-insensitive `…/readme`
 *  endpoint cannot address translations. */
async function fetchReadmeTranslationViaApi(ownerName, lang) {
  const response = await fetch(
    `https://api.github.com/repos/${ownerName}/contents/README-${lang}.md`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'jixoai.com-site-build',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    },
  );
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  return Buffer.from(data.content, 'base64').toString('utf8');
}

function fetchReadmeTranslationViaGh(ownerName, lang) {
  const result = spawnSync(
    'gh',
    ['api', `repos/${ownerName}/contents/README-${lang}.md`, '--jq', '.content'],
    { encoding: 'utf8' },
  );
  if (result.status === 0 && result.stdout.trim()) {
    try {
      return Buffer.from(result.stdout.trim(), 'base64').toString('utf8');
    } catch {
      /* fall through */
    }
  }
  if (/Not Found|"status":\s*"404"/.test(result.stderr || '')) return null;
  throw new Error(`gh api exited ${result.status}: ${(result.stderr || '').trim()}`);
}

/** "v0.2.0" → "v0.2.0"; "openspecui@9.0.2" → "v9.0.2"; null → "v—". */
function displayVersion(tag) {
  if (!tag) return NO_RELEASE;
  let version = tag.includes('@') ? tag.slice(tag.lastIndexOf('@') + 1) : tag;
  if (/^[0-9]/.test(version)) version = `v${version}`;
  return version;
}

/** Run one strategy ladder until a value lands; null-result is a value. */
async function withLadder(strategies, step) {
  let lastError;
  for (const strategy of strategies) {
    try {
      return await strategy();
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError ?? new Error('no strategy');
}

async function resolveProject(project, previous) {
  const { owner, name, slug } = parseRepo(project.repo);
  const ownerName = `${owner}/${name}`;
  const strategies = token
    ? [() => fetchReleaseViaApi(ownerName)]
    : [() => fetchReleaseViaApi(ownerName), () => fetchReleaseViaGh(ownerName)];
  const readmeStrategies = token
    ? [() => fetchReadmeViaApi(ownerName)]
    : [() => fetchReadmeViaApi(ownerName), () => fetchReadmeViaGh(ownerName)];

  const base = {
    repo: project.repo,
    slug,
    name: project.name,
    description: project.description,
    descriptionZh: project.descriptionZh ?? null,
    site: project.site ?? null,
    logo: project.logo ?? null,
    repoUrl: `https://github.com/${ownerName}`,
  };

  try {
    const release = await withLadder(strategies);
    // README is a separate resource: its failure must not discard the
    // freshly fetched release (fall back to the previous readme only).
    let readme = null;
    let readmeError = null;
    try {
      readme = await withLadder(readmeStrategies);
    } catch (error) {
      readmeError = error;
    }
    if (readmeError) {
      console.warn(
        `[fetch-projects] warning: ${project.repo} README unreachable (${readmeError.message}); ` +
          (previous?.readme ? 'keeping the previous generated value' : 'recording no readme'),
      );
      readme = previous?.readme ?? null;
    }
    // Translations: all eight candidates fetched concurrently (they are
    // independent resources); per-language failure semantics mirror the
    // default README — 404 → null, transport failure → previous value.
    const translationEntries = await Promise.all(
      TRANSLATION_LANGS.map(async (lang) => {
        const translationStrategies = token
          ? [() => fetchReadmeTranslationViaApi(ownerName, lang)]
          : [
              () => fetchReadmeTranslationViaApi(ownerName, lang),
              () => fetchReadmeTranslationViaGh(ownerName, lang),
            ];
        try {
          return [lang, await withLadder(translationStrategies)];
        } catch (error) {
          console.warn(
            `[fetch-projects] warning: ${project.repo} README-${lang}.md unreachable (${error.message}); ` +
              'keeping the previous generated value',
          );
          return [lang, previous?.readmeTranslations?.[lang] ?? null];
        }
      }),
    );
    const readmeTranslations = Object.fromEntries(translationEntries);
    return {
      ...base,
      tag: release ? release.tag : null,
      version: displayVersion(release ? release.tag : null),
      releaseUrl: release ? release.url : null,
      readme,
      readmeTranslations,
    };
  } catch (error) {
    console.warn(
      `[fetch-projects] warning: ${project.repo} unreachable (${error.message}); ` +
        (previous ? 'keeping the previous generated value' : 'recording no release'),
    );
    // Identity fields refresh from the manifest (base wins); the network
    // facts (tag/version/releaseUrl/readme) survive from the stale entry.
    return previous
      ? { ...previous, ...base }
      : {
          ...base,
          tag: null,
          version: NO_RELEASE,
          releaseUrl: null,
          readme: previous?.readme ?? null,
          readmeTranslations: {},
        };
  }
}

async function main() {
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  if (!Array.isArray(manifest.projects) || manifest.projects.length === 0) {
    die('projects.manifest.json carries no projects');
  }
  const previous = existsSync(generatedPath)
    ? new Map(JSON.parse(readFileSync(generatedPath, 'utf8')).projects.map((p) => [p.repo, p]))
    : new Map();

  const projects = [];
  for (const project of manifest.projects) {
    const resolved = await resolveProject(project, previous.get(project.repo));
    projects.push(resolved);
    const translations = Object.entries(resolved.readmeTranslations ?? {})
      .filter(([, markdown]) => markdown)
      .map(([lang]) => lang);
    console.log(
      `[fetch-projects] ${project.repo} → ${resolved.version}` +
        (resolved.tag ? ` (tag ${resolved.tag})` : ' (no release yet)') +
        (resolved.readme ? ` + README (${resolved.readme.length} chars)` : ' (no readme)') +
        (translations.length > 0 ? ` + README translations (${translations.join(', ')})` : ''),
    );
  }

  const payload = { fetchedAt: new Date().toISOString(), projects };
  writeFileSync(generatedPath, `${JSON.stringify(payload, null, 2)}\n`);
  console.log(`[fetch-projects] wrote ${path.relative(repoRoot, generatedPath)} (${projects.length} projects)`);
}

main().catch((error) => die(error instanceof Error ? error.message : String(error)));
