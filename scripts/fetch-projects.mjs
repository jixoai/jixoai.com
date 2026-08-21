#!/usr/bin/env node
/**
 * jixoai.com release-version fetcher (scripts/fetch-projects.mjs).
 *
 * Reads projects.manifest.json (curated repo list), queries the latest
 * GitHub Release for each repo, and writes src/lib/projects.generated.json
 * (gitignored) for the static build to consume.
 *
 * Auth ladder per repo:
 *   1. REST API with GH_TOKEN/GITHUB_TOKEN bearer (CI path — the Actions
 *      workflow injects secrets.GITHUB_TOKEN).
 *   2. `gh api` via the local CLI login (developer path — gh is logged in).
 *   3. Anonymous REST API (last resort; subject to rate limits).
 *
 * A 404 ("no latest release") is a normal result → version "v—". A transport
 * failure falls back to the previous generated value when one exists.
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

const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN || '';

const die = (message) => {
  console.error(`[fetch-projects] ${message}`);
  process.exit(1);
};

/** REST API attempt; returns { tag, url } | null (404), throws on failure. */
async function fetchViaApi(repo) {
  const response = await fetch(`https://api.github.com/repos/${ORG}/${repo}/releases/latest`, {
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

/** Local gh CLI attempt (uses its own stored login); same contract as above. */
function fetchViaGh(repo) {
  const result = spawnSync(
    'gh',
    ['api', `repos/${ORG}/${repo}/releases/latest`, '--jq', '{tag: .tag_name, url: .html_url}'],
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

/** "v0.2.0" → "v0.2.0"; "openspecui@9.0.2" → "v9.0.2"; null → "v—". */
function displayVersion(tag) {
  if (!tag) return NO_RELEASE;
  let version = tag.includes('@') ? tag.slice(tag.lastIndexOf('@') + 1) : tag;
  if (/^[0-9]/.test(version)) version = `v${version}`;
  return version;
}

async function resolveProject(project, previous) {
  const strategies = token ? [fetchViaApi] : [fetchViaApi, fetchViaGh];
  let lastError;
  for (const strategy of strategies) {
    try {
      const release = await strategy(project.repo);
      return {
        repo: project.repo,
        name: project.name,
        description: project.description,
        tag: release ? release.tag : null,
        version: displayVersion(release ? release.tag : null),
        repoUrl: `https://github.com/${ORG}/${project.repo}`,
        releaseUrl: release ? release.url : null,
      };
    } catch (error) {
      lastError = error;
    }
  }
  console.warn(
    `[fetch-projects] warning: ${project.repo} unreachable (${lastError?.message}); ` +
      (previous ? 'keeping the previous generated value' : 'recording no release'),
  );
  return previous
    ? { ...previous, name: project.name, description: project.description }
    : {
        repo: project.repo,
        name: project.name,
        description: project.description,
        tag: null,
        version: NO_RELEASE,
        repoUrl: `https://github.com/${ORG}/${project.repo}`,
        releaseUrl: null,
      };
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
    console.log(
      `[fetch-projects] ${project.repo} → ${resolved.version}` +
        (resolved.tag ? ` (tag ${resolved.tag})` : ' (no release yet)'),
    );
  }

  const payload = { fetchedAt: new Date().toISOString(), projects };
  writeFileSync(generatedPath, `${JSON.stringify(payload, null, 2)}\n`);
  console.log(`[fetch-projects] wrote ${path.relative(repoRoot, generatedPath)} (${projects.length} projects)`);
}

main().catch((error) => die(error instanceof Error ? error.message : String(error)));
