#!/usr/bin/env tsx

import { z } from 'zod';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { GitHubClient } from './shared/github-client.js';
import { loadConfig } from './config.js';
import type { GitHubProject } from '../src/types/index.js';

const config = loadConfig();
const OUTPUT_DIR = config.paths.projectsOutputDir;
const LOGO_OUTPUT_DIR = join(process.cwd(), 'public', 'projects');

// Zod schema for GitHub API response validation
const GitHubRepoSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  html_url: z.string().url(),
  homepage: z.string().url().nullable().or(z.literal('')).transform(val => val || null),
  stargazers_count: z.number(),
  forks_count: z.number(),
  language: z.string().nullable(),
  topics: z.array(z.string()).default([]),
  archived: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

type GitHubRepo = z.infer<typeof GitHubRepoSchema>;

function repoToProject(repo: GitHubRepo): GitHubProject {
  return {
    name: repo.name,
    description: repo.description,
    url: repo.html_url,
    homepage: repo.homepage,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: repo.language,
    topics: repo.topics,
    archived: repo.archived,
    createdAt: repo.created_at,
    updatedAt: repo.updated_at,
  };
}

async function fetchProjectLogo(
  client: GitHubClient,
  repo: string
): Promise<{ filename: string; buffer: Buffer } | null> {
  const LOGO_EXTENSIONS = ['png', 'jpg', 'jpeg', 'avif', 'webp'];
  
  try {
    const rootContents = await client.getRepoContent(repo, '');
    
    for (const item of rootContents) {
      if (item.type === 'file') {
        const lowerName = item.name.toLowerCase();
        if (lowerName.startsWith('logo.') && LOGO_EXTENSIONS.some(ext => lowerName.endsWith(`.${ext}`))) {
          const buffer = await client.downloadBinaryFile(repo, item.name);
          const ext = item.name.split('.').pop();
          return { filename: `${repo}.${ext}`, buffer };
        }
      }
    }
  } catch (error) {
    // console.warn(`Failed to check logo for ${repo}:`, error);
  }

  return null;
}

async function fetchProjects(client: GitHubClient): Promise<{ projects: GitHubProject[], logos: Map<string, Buffer> }> {
  console.log(`Fetching repositories for organization: ${config.github.org}`);

  const { data: repos } = await client.listOrgRepos();

  // Filter out archived repos
  const activeRepos = repos.filter(repo => !repo.archived);

  console.log(`Found ${activeRepos.length} active repositories (${repos.length - activeRepos.length} archived)`);

  const logos = new Map<string, Buffer>();

  // Validate and transform each repo
  const projects = await Promise.all(activeRepos.map(async repo => {
    const validated = GitHubRepoSchema.safeParse(repo);

    if (!validated.success) {
      console.warn(`Skipping invalid repo ${repo.name}:`, validated.error.message);
      return null;
    }

    const project = repoToProject(validated.data);
    
    // Check for logo
    const logo = await fetchProjectLogo(client, repo.name);
    if (logo) {
      project.logo = `/projects/${logo.filename}`;
      logos.set(logo.filename, logo.buffer);
    }

    return project;
  }));

  return { 
    projects: projects.filter((p): p is GitHubProject => p !== null),
    logos
  };
}

async function saveProjects(projects: GitHubProject[], logos: Map<string, Buffer>): Promise<void> {
  // Ensure output directories exist
  await mkdir(OUTPUT_DIR, { recursive: true });
  await mkdir(LOGO_OUTPUT_DIR, { recursive: true });

  // Save as individual JSON files for each project
  for (const project of projects) {
    const filename = `${project.name}.json`;
    const filepath = join(OUTPUT_DIR, filename);
    await writeFile(filepath, JSON.stringify(project, null, 2));
    console.log(`Saved ${filename}`);
  }

  // Save logos
  for (const [filename, buffer] of logos.entries()) {
    const filepath = join(LOGO_OUTPUT_DIR, filename);
    await writeFile(filepath, new Uint8Array(buffer));
    console.log(`Saved logo ${filename}`);
  }

  // Also save as a combined file for easy access
  const allProjectsPath = join(OUTPUT_DIR, '_all.json');
  await writeFile(allProjectsPath, JSON.stringify(projects, null, 2));
  console.log(`Saved _all.json with ${projects.length} projects`);
}

async function main() {
  const client = new GitHubClient({
    token: config.github.token,
    org: config.github.org,
  });

  const { projects, logos } = await fetchProjects(client);
  await saveProjects(projects, logos);
  console.log('Projects fetch completed successfully');
}

main().catch(error => {
  console.error('Failed to fetch projects:', error);
  process.exit(1);
});
