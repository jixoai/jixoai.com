#!/usr/bin/env tsx

import { z } from 'zod';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { GitHubClient } from './shared/github-client.js';
import { loadConfig } from './config.js';
import type { GitHubProject } from '../src/types/index.js';

const config = loadConfig();
const OUTPUT_DIR = config.paths.projectsOutputDir;

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

async function fetchProjects(client: GitHubClient): Promise<GitHubProject[]> {
  console.log(`Fetching repositories for organization: ${config.github.org}`);

  const { data: repos } = await client.listOrgRepos();

  // Filter out archived repos
  const activeRepos = repos.filter(repo => !repo.archived);

  console.log(`Found ${activeRepos.length} active repositories (${repos.length - activeRepos.length} archived)`);

  // Validate and transform each repo
  const projects: GitHubProject[] = activeRepos
    .map(repo => {
      const validated = GitHubRepoSchema.safeParse(repo);

      if (!validated.success) {
        console.warn(`Skipping invalid repo ${repo.name}:`, validated.error.message);
        return null;
      }

      return repoToProject(validated.data);
    })
    .filter((p): p is GitHubProject => p !== null);

  return projects;
}

async function saveProjects(projects: GitHubProject[]): Promise<void> {
  // Ensure output directory exists
  await mkdir(OUTPUT_DIR, { recursive: true });

  // Save as individual JSON files for each project
  for (const project of projects) {
    const filename = `${project.name}.json`;
    const filepath = join(OUTPUT_DIR, filename);
    await writeFile(filepath, JSON.stringify(project, null, 2));
    console.log(`Saved ${filename}`);
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

  const projects = await fetchProjects(client);
  await saveProjects(projects);
  console.log('Projects fetch completed successfully');
}

main().catch(error => {
  console.error('Failed to fetch projects:', error);
  process.exit(1);
});
