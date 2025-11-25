import type { Language } from '../../src/types/index.js';

export interface TranslationCache {
  [filePath: string]: {
    [lang: string]: {
      content: string;
      hash: string;
      timestamp: number;
    };
  };
}

export interface I18nRule {
  path: string;
  rules: string;
}

export interface TranslationConfig {
  apiKey: string;
  baseUrl: string;
  cacheFile: string;
  cacheDir: string;
  contentDirs: string[];
}

export type { Language };
