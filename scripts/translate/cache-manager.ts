import AdmZip from 'adm-zip';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { execSync } from 'child_process';
import type { TranslationCache } from './types.js';

export class I18nCacheManager {
  constructor(
    private readonly cacheFile: string,
    private readonly cacheDir: string
  ) {}

  async download(): Promise<void> {
    if (existsSync(this.cacheFile)) {
      console.log('i18n.zip already exists, skipping download');
      return;
    }

    console.log('Downloading i18n.zip from latest release...');
    try {
      execSync(`gh release download --pattern "i18n.zip" --clobber`, { stdio: 'inherit' });
      console.log('Downloaded i18n.zip');
    } catch {
      console.log('No previous i18n.zip found in releases, starting fresh');
    }
  }

  async extract(): Promise<void> {
    if (!existsSync(this.cacheFile)) {
      await mkdir(this.cacheDir, { recursive: true });
      return;
    }

    console.log('Extracting i18n.zip...');
    const zip = new AdmZip(this.cacheFile);
    zip.extractAllTo(this.cacheDir, true);
    console.log('Extracted cache');
  }

  async load(): Promise<TranslationCache> {
    const cacheFile = join(this.cacheDir, 'cache.json');
    if (!existsSync(cacheFile)) {
      return {};
    }

    const content = await readFile(cacheFile, 'utf-8');
    return JSON.parse(content) as TranslationCache;
  }

  async save(cache: TranslationCache): Promise<void> {
    await mkdir(this.cacheDir, { recursive: true });
    const cacheFile = join(this.cacheDir, 'cache.json');
    await writeFile(cacheFile, JSON.stringify(cache, null, 2));
  }

  async compress(): Promise<void> {
    console.log('Compressing i18n cache...');
    const zip = new AdmZip();
    zip.addLocalFolder(this.cacheDir);
    zip.writeZip(this.cacheFile);
    console.log('Compressed to i18n.zip');
  }
}
