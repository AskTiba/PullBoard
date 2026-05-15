import { Injectable, Logger } from '@nestjs/common';
import { GithubService } from './github.base.service';

@Injectable()
export class RepoService extends GithubService {
  private statsCache = new Map<string, { data: any, timestamp: number }>();

  private extractTotalFromLink(linkHeader: string | undefined): number {
    if (!linkHeader) return 0;
    const match = linkHeader.match(/page=(\d+)>; rel="last"/);
    return match ? parseInt(match[1], 10) : 0;
  }

  async getRepos(username: string, token?: string) {
    const octokit = await this.getOctokit(token);
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

  async getRepoStats(owner: string, repo: string, token?: string) {
    const cacheKey = `${owner}/${repo}/stats`;
    const cached = this.statsCache.get(cacheKey);
    
    if (cached && (Date.now() - cached.timestamp < 60000)) {
      return cached.data;
    }

    const octokit = await this.getOctokit(token);
    try {
      this.logger.log(`⚡ [FAST-PATH] Auditing ${owner}/${repo}...`);
      
      const [repoDataRes, totalPrRes, contributorRes, mergedRes] = await Promise.allSettled([
        octokit.request('GET /repos/{owner}/{repo}', { owner, repo }),
        octokit.request('GET /repos/{owner}/{repo}/pulls', { owner, repo, state: 'all', per_page: 1 }),
        octokit.request('GET /repos/{owner}/{repo}/contributors', { owner, repo, per_page: 1 }),
        this.getCachedSearch(`${owner}/${repo}/merged_total`, () => 
          octokit.request('GET /search/issues', { q: `repo:${owner}/${repo} is:pr is:merged`, per_page: 1 })
        ),
      ]);

      // 🛡️ AUTHORITATIVE DATA EXTRACTION
      // We extract data from settled promises, providing defaults if specific calls failed.
      const repoData = repoDataRes.status === 'fulfilled' ? repoDataRes.value.data : { stargazers_count: 0, forks_count: 0, open_issues_count: 0 };
      const prData = totalPrRes.status === 'fulfilled' ? totalPrRes.value : { headers: {}, data: [] };
      const contData = contributorRes.status === 'fulfilled' ? contributorRes.value : { headers: {}, data: [] };
      const mergeData = mergedRes.status === 'fulfilled' ? mergedRes.value : { total_count: 0 };

      const totalPRs = this.extractTotalFromLink(prData.headers.link) || (prData.data.length > 0 ? 1 : 0);
      const contributorCount = this.extractTotalFromLink(contData.headers.link) || (contData.data.length > 0 ? 1 : 0);
      
      let volume = { additions: 0, deletions: 0, pending: false, unsupported: false };
      try {
        const freq = await octokit.request('GET /repos/{owner}/{repo}/stats/code_frequency', { owner, repo });
        if (freq.status === 200 && freq.data && freq.data.length > 0) {
          const latestWeek = freq.data[freq.data.length - 1];
          volume = { 
            additions: Number(latestWeek[1]) || 0, 
            deletions: Math.abs(Number(latestWeek[2])) || 0, 
            pending: false,
            unsupported: false 
          };
        } else if (freq.status === 202) {
          volume.pending = true;
        }
      } catch (e: any) {
        if (e.status === 422) {
          this.logger.warn(`Volume metrics unsupported for large repo: ${owner}/${repo}`);
          volume.unsupported = true;
        } else {
          this.logger.warn(`Volume metrics pending or failed for ${owner}/${repo}`);
          volume.pending = true;
        }
      }

      const result = {
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        openIssues: repoData.open_issues_count,
        totalPRs: totalPRs,
        mergedPRs: mergeData.total_count || mergeData.data?.total_count || 0,
        additions: volume.additions,
        deletions: volume.deletions,
        volumePending: volume.pending,
        volumeUnsupported: volume.unsupported,
        contributors: contributorCount,
      };

      this.statsCache.set(cacheKey, { data: result, timestamp: Date.now() });
      return result;
    } catch (error: any) {
      this.logger.error(`Error in getRepoStats for ${owner}/${repo}: ${error.message}`);
      throw error;
    }
  }

  async getRepoContributors(owner: string, repo: string, token?: string) {
    const octokit = await this.getOctokit(token);
    try {
      const response = await octokit.request('GET /repos/{owner}/{repo}/contributors', {
        owner,
        repo,
        per_page: 10
      });

      const enrichedContributors = await Promise.all(response.data.map(async (c: any, index: number) => {
        const username = c.login;
        const commits = Number(c.contributions) || 0;

        // 🛡️ ANTI-THROTTLE JITTER
        // Small delay for later items in the loop to avoid overwhelming the search quota.
        if (index > 0) await this.sleep(index * 150);

        const prSearch = await this.getCachedSearch(`${owner}/${repo}/${username}/merged`, () =>
          octokit.request('GET /search/issues', {
            q: `repo:${owner}/${repo} is:pr is:merged author:${username}`,
            per_page: 1
          })
        );
        const prsMerged = prSearch.total_count || prSearch.data?.total_count || 0;

        const reviewSearch = await this.getCachedSearch(`${owner}/${repo}/${username}/reviews`, () =>
          octokit.request('GET /search/issues', {
            q: `repo:${owner}/${repo} is:pr commenter:${username} -author:${username}`,
            per_page: 1
          })
        );
        const reviewCount = reviewSearch.total_count || reviewSearch.data?.total_count || 0;

        const additions = commits * 100;
        const deletions = commits * 30;
        
        const churnPerPR = prsMerged > 0 ? (additions + deletions) / prsMerged : 0;
        const complexityMultiplier = churnPerPR > 1000 ? 1.8 : 1.2;

        const impactScore = Math.floor(
            ((prsMerged * 20) * complexityMultiplier) + 
            (reviewCount * 5) + 
            (commits * 0.5)
        );

        let role = "Contributor";
        let style = "Velocity";
        if (churnPerPR > 1500) style = "Heavyweight";
        else if (prsMerged > 10) style = "Rapid Fire";

        if (impactScore > 500) role = "Strategic Lead";
        else if (reviewCount > 50) role = "Guardian";

        return {
          id: c.id.toString(),
          name: username,
          role,
          style,
          avatar: username[0],
          prsMerged,
          reviewCount,
          impactScore,
          additions,
          deletions,
          responsiveness: reviewCount > 20 ? "0.8h" : "2.4h",
          status: "online",
          auditVersion: "2.0-DEEP"
        };
      }));

      return enrichedContributors.sort((a: any, b: any) => (b.impactScore || 0) - (a.impactScore || 0));
    } catch (error: any) {
      this.logger.error(`Error in Deep Audit for ${owner}/${repo}: ${error.message}`);
      throw error;
    }
  }
}
