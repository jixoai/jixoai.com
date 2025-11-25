import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { existsSync } from 'fs';
import type { I18nRule } from './types.js';

export class I18nRulesResolver {
  async resolve(filePath: string): Promise<I18nRule[]> {
    const rules: I18nRule[] = [];
    let currentDir = dirname(filePath);
    const root = process.cwd();

    while (currentDir.startsWith(root)) {
      const ruleFile = join(currentDir, 'i18n-rules.md');
      if (existsSync(ruleFile)) {
        const content = await readFile(ruleFile, 'utf-8');
        rules.push({ path: currentDir, rules: content });
      }
      currentDir = dirname(currentDir);
    }

    return rules.reverse(); // Apply from root to specific
  }
}
