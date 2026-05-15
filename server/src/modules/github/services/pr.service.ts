import { Injectable } from '@nestjs/common';
import { GithubService } from './github.base.service';

@Injectable()
export class PrService extends GithubService {
  async getUserType(username: string, token?: string): Promise<string> {
    const octokit = await this.getOctokit(token);
    const response = await octokit.request("GET /users/{username}", { username });
    return (response.data as any)?.type || "User";
  }

  async getAllPRsForUser(username: string, state: 'open' | 'closed' | 'all' = 'open', token?: string) {
    const octokit = await this.getOctokit(token);
    try {
      const accountType = await this.getUserType(username, token);
      const ownerQualifier = accountType === "Organization" ? `org:${username}` : `user:${username}`;
      const stateQualifier = state === "all" ? "" : state === "open" ? " is:open" : " is:closed";
      const q = `${ownerQualifier} is:pr${stateQualifier}`.trim();

      const response = await octokit.request("GET /search/issues", {
        q,
        sort: "updated",
        order: "desc",
        per_page: 30,
      });
      return response.data.items;
    } catch (error: any) {
      throw error;
    }
  }

  async getRepoPRs(repoContext: string, state: 'open' | 'closed' | 'all' = 'open', token?: string) {
    const octokit = await this.getOctokit(token);
    try {
      this.logger.log(`Fetching PRs for ${repoContext} (State: ${state})...`);
      
      const stateQualifier = state === "all" ? "" : state === "open" ? " is:open" : " is:merged";
      const q = `repo:${repoContext} is:pr${stateQualifier}`.trim();

      const response = await octokit.request("GET /search/issues", {
        q,
        sort: "updated",
        order: "desc",
        per_page: 30,
      });
      
      this.logger.log(`Successfully fetched ${response.data.items.length} PRs for ${repoContext}`);

      return response.data.items.map((item: any) => ({
        id: item.number,
        title: item.title,
        author: item.user.login,
        repository: repoContext,
        status: item.pull_request?.merged_at ? 'merged' : item.state,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        commentsCount: item.comments,
        reviewsCount: 0,
        labels: item.labels.map((l: any) => l.name)
      }));
    } catch (error: any) {
      this.logger.error(`Error in getRepoPRs for ${repoContext}: ${error.message}`);
      throw error;
    }
  }
}
