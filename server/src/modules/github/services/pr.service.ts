import { Injectable } from '@nestjs/common';
import { GithubService } from './github.base.service';

@Injectable()
export class PrService extends GithubService {
  async getUserType(username: string): Promise<string> {
    const octokit = await this.getOctokit();
    const response = await octokit.request("GET /users/{username}", { username });
    return (response.data as any)?.type || "User";
  }

  async getAllPRsForUser(username: string, state: 'open' | 'closed' | 'all' = 'open') {
    const octokit = await this.getOctokit();
    try {
      const accountType = await this.getUserType(username);
      const ownerQualifier = accountType === "Organization" ? `org:${username}` : `user:${username}`;
      const stateQualifier = state === "all" ? "" : state === "open" ? " is:open" : " is:closed";
      const q = `${ownerQualifier} is:pr${stateQualifier}`.trim();

      let response: any;
      try {
        response = await octokit.request("GET /search/issues", {
          q,
          sort: "updated",
          order: "desc",
          per_page: 30,
        });
      } catch (err: any) {
        if (this.isRateLimitError(err)) {
          await this.sleep(1000);
          response = await octokit.request("GET /search/issues", { q, sort: "updated", order: "desc" });
        } else {
          throw err;
        }
      }
      return response.data.items;
    } catch (error: any) {
      throw error;
    }
  }
}
