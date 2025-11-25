#!/usr/bin/env tsx

import { OpenAI } from 'openai';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { dirname, join, relative, sep } from 'path';
import { createHash } from 'crypto';
import { languages, type Language, defaultLanguage } from '../../src/types/index.js';
import { loadConfig } from '../config.js';
import { I18nCacheManager } from './cache-manager.js';
import { MarkdownFileScanner } from './file-scanner.js';
import { I18nRulesResolver } from './rules-resolver.js';
import { ContentTranslator } from './translator.js';
import type { TranslationCache } from './types.js';

// Load config (this also loads .env.local)
const config = loadConfig();

const API_KEY = config.ai.apiKey;
const API_BASE_URL = config.ai.baseUrl;
const CONTENT_DIRS = config.paths.contentDirs;
const I18N_CACHE_FILE = config.paths.i18nCacheFile;
const I18N_CACHE_DIR = config.paths.i18nCacheDir;

function md5(content: string): string {
  return createHash('md5').update(content).digest('hex');
}

async function translateFile(
  filePath: string,
  cache: TranslationCache,
  rulesResolver: I18nRulesResolver,
  translator: ContentTranslator,
  sourceLang: Language
): Promise<void> {
  const content = await readFile(filePath, 'utf-8');
  const contentHash = md5(content);

  if (!cache[filePath]) {
    cache[filePath] = {};
  }

  if (cache[filePath][sourceLang]?.hash === contentHash) {
    console.log(`  - ${relative(process.cwd(), filePath)} - unchanged`);
    return;
  }

  console.log(`  ${relative(process.cwd(), filePath)}`);

  cache[filePath][sourceLang] = {
    content,
    hash: contentHash,
    timestamp: Date.now(),
  };

  const rules = await rulesResolver.resolve(filePath);
  const targetLanguages = languages.filter(lang => lang !== sourceLang);

  // Check which languages need translation
  const langsToTranslate = targetLanguages.filter(lang => {
    const cached = cache[filePath][lang];
    return !cached || cached.hash !== contentHash;
  });

  if (langsToTranslate.length === 0) {
    console.log(`    All translations cached`);
    return;
  }

  console.log(`    Translating to ${langsToTranslate.length} languages...`);

  // Parallel translation for all languages
  const translations = await translator.translateToAllLanguages(
    content,
    sourceLang,
    langsToTranslate,
    rules
  );

  // Save translation results
  for (const [lang, translatedContent] of translations) {
    cache[filePath][lang] = {
      content: translatedContent,
      hash: contentHash,
      timestamp: Date.now(),
    };

    const fileDir = dirname(filePath);
    const fileName = filePath.split(sep).pop()!;
    const outputPath = join(fileDir, lang, fileName);
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, translatedContent);

    console.log(`    - ${lang}`);
  }
}

async function main() {
  if (!API_KEY) {
    console.error('DEEPSEEK_API_KEY or OPENAI_API_KEY environment variable is required');
    process.exit(1);
  }

  const client = new OpenAI({ apiKey: API_KEY, baseURL: API_BASE_URL });
  const cacheManager = new I18nCacheManager(I18N_CACHE_FILE, I18N_CACHE_DIR);
  const scanner = new MarkdownFileScanner();
  const rulesResolver = new I18nRulesResolver();
  const translator = new ContentTranslator(client);

  await cacheManager.download();
  await cacheManager.extract();

  const cache = await cacheManager.load();

  const allFiles = await scanner.scan(CONTENT_DIRS);
  console.log(`\nFound ${allFiles.length} markdown files\n`);

  for (const file of allFiles) {
    await translateFile(file, cache, rulesResolver, translator, defaultLanguage);
  }

  await cacheManager.save(cache);
  await cacheManager.compress();

  console.log('\nTranslation completed');
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
