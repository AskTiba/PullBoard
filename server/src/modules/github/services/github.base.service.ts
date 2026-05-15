import { Injectable, Logger } from '@nestjs/common';
import { Octokit } from 'octokit';

@Injectable()
export class GithubService {
  protected readonly logger = new Logger(GithubService.name);
  
  // 🧠 GLOBAL SEARCH CACHE
  // We cache search results to protect the strictly limited GitHub Search API quota.
  // TTL: 5 minutes for search results.
  protected static searchCache = new Map<string, { data: any, timestamp: number }>();

  async getOctokit(token?: string) {
    // 🛡️ AUTHORITATIVE TOKEN INJECTION
    // Prioritize user-specific OAuth tokens to upgrade API quota from 10 to 30+ req/min.
    return new Octokit({
      auth: token || process.env.GITHUB_TOKEN,
    });
  }

  protected async getCachedSearch(key: string, fetcher: () => Promise<any>) {
    const cached = GithubService.searchCache.get(key);
    const now = Date.now();
    const TTL = 5 * 60 * 1000; // 5 Minutes

    if (cached && (now - cached.timestamp < TTL)) {
      return cached.data;
    }

    const data = await fetcher();
    GithubService.searchCache.set(key, { data, timestamp: now });
    return data;
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
