import { readdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export class MarkdownFileScanner {
  async scan(dirs: string[]): Promise<string[]> {
    const files: string[] = [];

    for (const dir of dirs) {
      if (!existsSync(dir)) continue;
      const dirFiles = await this.scanDirectory(dir);
      files.push(...dirFiles);
    }

    return files;
  }

  private async scanDirectory(dir: string): Promise<string[]> {
    const files: string[] = [];
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        const subFiles = await this.scanDirectory(fullPath);
        files.push(...subFiles);
      } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
        files.push(fullPath);
      }
    }

    return files;
  }
}
