import { Injectable, Logger } from '@nestjs/common';
import { GithubService } from './github.base.service';

@Injectable()
export class RepoService extends GithubService {
  async getRepos(username: string) {
    const octokit = await this.getOctokit();
    try {
      const response = await octokit.request('GET /users/{username}/repos', {
        username,
        sort: 'updated',
        per_page: 30,
      });
      return response.data;
    } catch (error: any) {
      this.logger.error(`Error fetching repos for ${username}: ${error.message}`);
      throw error;
    }
  }
}
