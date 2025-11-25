#!/usr/bin/env tsx

import { z } from 'zod';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { GitHubClient } from './shared/github-client.js';
import { loadConfig } from './config.js';

const config = loadConfig();
const DOCS_OUTPUT_DIR = config.paths.docsOutputDir;
const LOGO_OUTPUT_DIR = config.paths.logoOutputDir;
const LOGO_EXTENSIONS = config.build.logoExtensions;

// Zod schema for GitHub content item
const GitHubContentItemSchema = z.object({
  name: z.string(),
  path: z.string(),
  sha: z.string(),
  type: z.enum(['file', 'dir', 'symlink', 'submodule']),
});

type GitHubContentItem = z.infer<typeof GitHubContentItemSchema>;

interface RepoDoc {
  project: string;
  path: string;
  content: string;
  sha: string;
}

async function fetchDocsRecursive(
  client: GitHubClient,
  repo: string,
  path: string,
  results: RepoDoc[] = []
): Promise<RepoDoc[]> {
  const contents = await client.getRepoContent(repo, path);

  for (const item of contents) {
    const validated = GitHubContentItemSchema.safeParse(item);
    if (!validated.success) {
      console.warn(`  Skipping invalid content item:`, validated.error.message);
      continue;
    }

    const contentItem = validated.data;
    if (contentItem.type === 'file' && (contentItem.name.endsWith('.md') || contentItem.name.endsWith('.mdx'))) {
      const content = await client.downloadFile(repo, contentItem.path);
      results.push({
        project: repo,
        path: contentItem.path,
        content,
        sha: contentItem.sha,
      });
      console.log(`  Downloaded ${contentItem.path}`);
    } else if (contentItem.type === 'dir') {
      await fetchDocsRecursive(client, repo, contentItem.path, results);
    }
  }

  return results;
}

async function fetchProjectLogo(
  client: GitHubClient,
  repo: string
): Promise<{ filename: string; buffer: Buffer } | null> {
  const rootContents = await client.getRepoContent(repo, '');

  for (const item of rootContents) {
    const validated = GitHubContentItemSchema.safeParse(item);
    if (!validated.success) continue;

    const contentItem = validated.data;
    if (contentItem.type === 'file') {
      const lowerName = contentItem.name.toLowerCase();
      if (lowerName.startsWith('logo.') && LOGO_EXTENSIONS.some(ext => lowerName.endsWith(`.${ext}`))) {
        const buffer = await client.downloadBinaryFile(repo, contentItem.name);
        const ext = contentItem.name.split('.').pop();
        return { filename: `${repo}.${ext}`, buffer };
      }
    }
  }

  return null;
}

async function saveDocs(docs: RepoDoc[]): Promise<void> {
  for (const doc of docs) {
    // Convert path like "docs/guide.md" to "project-name/guide.md"
    const relativePath = doc.path.replace(/^docs\/?/, '');
    const outputPath = join(DOCS_OUTPUT_DIR, doc.project, relativePath);

    // Ensure directory exists
    const dir = join(outputPath, '..');
    await mkdir(dir, { recursive: true });

    // Save the file
    await writeFile(outputPath, doc.content);
  }
}

async function saveLogo(_repo: string, logo: { filename: string; buffer: Buffer }): Promise<void> {
  await mkdir(LOGO_OUTPUT_DIR, { recursive: true });
  const outputPath = join(LOGO_OUTPUT_DIR, logo.filename);
  await writeFile(outputPath, new Uint8Array(logo.buffer));
  console.log(`  Saved logo: ${logo.filename}`);
}

async function main() {
  const client = new GitHubClient({
    token: config.github.token,
    org: config.github.org,
  });

  console.log('Fetching repositories...');
  const { data: repos } = await client.listOrgRepos();

  const activeRepos = repos.filter(repo => !repo.archived);
  console.log(`Found ${activeRepos.length} active repositories\n`);

  let totalDocs = 0;
  let totalLogos = 0;

  for (const repo of activeRepos) {
    console.log(`Processing ${repo.name}...`);

    // Fetch docs
    const docs = await fetchDocsRecursive(client, repo.name, 'docs');
    if (docs.length > 0) {
      await saveDocs(docs);
      totalDocs += docs.length;
      console.log(`  Saved ${docs.length} documentation files`);
    } else {
      console.log(`  No docs found`);
    }

    // Fetch logo
    const logo = await fetchProjectLogo(client, repo.name);
    if (logo) {
      await saveLogo(repo.name, logo);
      totalLogos++;
    } else {
      console.log(`  No logo found`);
    }

    console.log('');
  }

  console.log(`Completed: ${totalDocs} docs, ${totalLogos} logos from ${activeRepos.length} projects`);
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
