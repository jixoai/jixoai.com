import { Octokit } from '@octokit/rest';
import { z } from 'zod';

const GitHubClientConfigSchema = z.object({
  token: z.string().min(1, 'GitHub token is required'),
  org: z.string().min(1, 'Organization name is required'),
});

export type GitHubClientConfig = z.infer<typeof GitHubClientConfigSchema>;

const OctokitErrorSchema = z.object({
  status: z.number(),
  message: z.string().optional(),
});

export class GitHubClient {
  private octokit: Octokit;

  constructor(private readonly config: GitHubClientConfig) {
    GitHubClientConfigSchema.parse(config);
    this.octokit = new Octokit({ auth: config.token });
  }

  async listOrgRepos() {
    try {
      return await this.octokit.repos.listForOrg({
        org: this.config.org,
        type: 'public',
        per_page: 100,
      });
    } catch (error: unknown) {
      throw this.handleError(error, 'Failed to list repos');
    }
  }

  async getRepoContent(repo: string, path: string) {
    try {
      const { data } = await this.octokit.repos.getContent({
        owner: this.config.org,
        repo,
        path,
      });
      return Array.isArray(data) ? data : [data];
    } catch (error: unknown) {
      if (this.isNotFoundError(error)) {
        return [];
      }
      throw this.handleError(error, `Failed to get content: ${path}`);
    }
  }

  async downloadFile(repo: string, path: string): Promise<string> {
    const { data } = await this.octokit.repos.getContent({
      owner: this.config.org,
      repo,
      path,
    });

    if ('content' in data && data.type === 'file') {
      return Buffer.from(data.content, 'base64').toString('utf-8');
    }

    throw new Error(`Failed to download file: ${path}`);
  }

  async downloadBinaryFile(repo: string, path: string): Promise<Buffer> {
    const { data } = await this.octokit.repos.getContent({
      owner: this.config.org,
      repo,
      path,
    });

    if ('content' in data && data.type === 'file') {
      return Buffer.from(data.content, 'base64');
    }

    throw new Error(`Failed to download binary file: ${path}`);
  }

  private isNotFoundError(error: unknown): boolean {
    const parsed = OctokitErrorSchema.safeParse(error);
    return parsed.success && parsed.data.status === 404;
  }

  private handleError(error: unknown, message: string): Error {
    const parsed = OctokitErrorSchema.safeParse(error);
    if (parsed.success) {
      return new Error(`${message}: ${parsed.data.message || 'Unknown error'}`);
    }
    return error instanceof Error ? error : new Error(String(error));
  }
}
