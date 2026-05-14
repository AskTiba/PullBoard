import { Injectable, Logger } from '@nestjs/common';
import { GithubService } from './github.base.service';

@Injectable()
export class ReviewService extends GithubService {
  async getReviews(owner: string, repo: string, pullNumber: number) {
    const octokit = await this.getOctokit();
    try {
      const response = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews', {
        owner,
        repo,
        pull_number: pullNumber,
      });
      return response.data;
    } catch (error: any) {
      this.logger.error(`Error fetching reviews for ${owner}/${repo}#${pullNumber}: ${error.message}`);
      throw error;
    }
  }
}
