#!/usr/bin/env tsx

import { z } from 'zod';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { GitHubClient } from './shared/github-client.js';
import { loadConfig } from './config.js';

const config = loadConfig();
const DOCS_OUTPUT_DIR = config.paths.docsOutputDir;

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

    console.log('');
  }

  console.log(`Completed: ${totalDocs} docs from ${activeRepos.length} projects`);
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
