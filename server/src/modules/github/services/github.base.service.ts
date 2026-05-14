import { Injectable, Logger } from '@nestjs/common';
import { Octokit } from 'octokit';

@Injectable()
export class GithubService {
  private readonly octokit: Octokit;
  private readonly logger = new Logger(GithubService.name);

  constructor() {
    this.octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });
  }

  async getOctokit() {
    return this.octokit;
  }

  protected async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  protected isRateLimitError(error: any): boolean {
    const status = error?.status || error?.response?.status;
    const headers = error?.response?.headers || {};
    const remaining = headers['x-ratelimit-remaining'] ?? headers['X-RateLimit-Remaining'];
    const message: string = (error?.message || '').toLowerCase();
    return status === 403 && (remaining === '0' || message.includes('rate limit') || message.includes('quota exhausted'));
  }
}
