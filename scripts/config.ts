import { config as loadEnv } from 'dotenv';
import { z } from 'zod';
import { join } from 'path';

// Load environment variables from .env.local and .env
loadEnv({ path: join(process.cwd(), '.env.local') });
loadEnv({ path: join(process.cwd(), '.env') });

export const ConfigSchema = z.object({
  github: z.object({
    token: z.string().default(''),
    org: z.string().default('jixoai'),
  }),
  ai: z.object({
    apiKey: z.string().default(''),
    baseUrl: z.string().default('https://api.deepseek.com'),
    model: z.string().default('deepseek-chat'),
  }),
  paths: z.object({
    contentDirs: z.array(z.string()),
    projectsOutputDir: z.string(),
    docsOutputDir: z.string(),
    logoOutputDir: z.string(),
    i18nCacheFile: z.string(),
    i18nCacheDir: z.string(),
  }),
  build: z.object({
    logoExtensions: z.array(z.string()).default(['jpg', 'png', 'avif', 'webp']),
  }),
});

export type Config = z.infer<typeof ConfigSchema>;

export function loadConfig(): Config {
  const cwd = process.cwd();

  const config: Config = {
    github: {
      token: process.env.GITHUB_TOKEN || '',
      org: 'jixoai',
    },
    ai: {
      apiKey: process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY || '',
      baseUrl: process.env.API_BASE_URL || 'https://api.deepseek.com',
      model: 'deepseek-chat',
    },
    paths: {
      contentDirs: [
        join(cwd, 'src', 'content', 'blog'),
        join(cwd, 'src', 'content', 'docs'),
      ],
      projectsOutputDir: join(cwd, 'src', 'content', 'projects'),
      docsOutputDir: join(cwd, 'src', 'content', 'docs'),
      logoOutputDir: join(cwd, 'public', 'projects'),
      i18nCacheFile: join(cwd, 'i18n.zip'),
      i18nCacheDir: join(cwd, '.i18n-cache'),
    },
    build: {
      logoExtensions: ['jpg', 'png', 'avif', 'webp'],
    },
  };

  return ConfigSchema.parse(config);
}

export const ORG_NAME = 'jixoai';
