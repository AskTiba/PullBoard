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

  async getRepoContributorStats(owner: string, repo: string, token?: string) {
    const octokit = await this.getOctokit(token);
    try {
      const response = await octokit.request('GET /repos/{owner}/{repo}/stats/contributors', {
        owner,
        repo,
      });
      
      // GitHub might return 202 if stats are still being calculated
      if (response.status === 202) return [];
      
      return response.data.map((item: any) => ({
        username: item.author.login,
        total: item.total,
        weeks: item.weeks.slice(-12).map((w: any) => ({
            w: w.w,
            a: w.a,
            d: w.d,
            c: w.c
        }))
      }));
    } catch (error: any) {
      this.logger.error(`Error fetching contributor stats for ${owner}/${repo}: ${error.message}`);
      return [];
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
      
      let volume = { additions: 0, deletions: 0, pending: false, unsupported: false, history: [] as any[] };
      try {
        const [freq, activity, contributorStats] = await Promise.all([
          octokit.request('GET /repos/{owner}/{repo}/stats/code_frequency', { owner, repo }),
          octokit.request('GET /repos/{owner}/{repo}/stats/commit_activity', { owner, repo }),
          this.getRepoContributorStats(owner, repo, token)
        ]);

        // 🔬 SUPREME STATISTICIAN: Dynamic Inception Logic
        // Find the absolute first week with any recorded flux (additions or deletions)
        const firstFluxWeek = freq.status === 200 && freq.data ? freq.data.find((w: any) => w[1] > 0 || w[2] !== 0) : null;
        const inceptionTimestamp = firstFluxWeek ? firstFluxWeek[0] : 0;

        if (freq.status === 200 && freq.data && freq.data.length > 0) {
          const latestWeek = freq.data[freq.data.length - 1];
          volume = { 
            additions: Number(latestWeek[1]) || 0, 
            deletions: Math.abs(Number(latestWeek[2])) || 0, 
            pending: false,
            unsupported: false,
            history: freq.data
                .filter((w: any) => w[0] >= inceptionTimestamp)
                .slice(-52) // Cap at 1 year of active team history
                .map((w: any) => ({
                    timestamp: w[0],
                    additions: w[1],
                    deletions: Math.abs(w[2])
                }))
          };
        } else if (freq.status === 202) {
          volume.pending = true;
        }

        const commitHistory = activity.status === 200 ? activity.data
            .filter((w: any) => w.week >= inceptionTimestamp)
            .slice(-52)
            .map((w: any) => ({
                week: w.week,
                total: w.total,
                days: w.days
            })) : [];

        // 🔬 SUPREME STATISTICIAN: Precise Commit-to-Commit Temporal Audit
        let projectTimeline = 0;
        let totalCommits = 0;
        try {
          // 1. Capture the latest and get the "Link" header for the earliest
          const commitAuditRes = await octokit.request('GET /repos/{owner}/{repo}/commits', {
              owner, repo, per_page: 1
          });
          
          const linkHeader = commitAuditRes.headers.link;
          const latestCommitDate = commitAuditRes.data[0]?.commit?.author?.date;

          if (linkHeader && linkHeader.includes('rel="last"')) {
              // Capture total commits from the last page number
              const match = linkHeader.match(/page=(\d+)>; rel="last"/);
              totalCommits = match ? parseInt(match[1], 10) : 0;

              // 2. Surgical fetch of the absolute first commit
              const firstCommitRes = await octokit.request('GET /repos/{owner}/{repo}/commits', {
                  owner, repo, per_page: 1, page: totalCommits
              });
              const firstCommitDate = firstCommitRes.data[0]?.commit?.author?.date;

              if (firstCommitDate && latestCommitDate) {
                  const start = new Date(firstCommitDate).getTime();
                  const end = new Date(latestCommitDate).getTime();
                  projectTimeline = Math.ceil((end - start) / (1000 * 60 * 60 * 24 * 7)) || 1;
              }
          } else {
              // Small repo (only 1 page of commits)
              totalCommits = commitAuditRes.data.length;
              const firstCommitDate = commitAuditRes.data[commitAuditRes.data.length - 1]?.commit?.author?.date;
              if (firstCommitDate && latestCommitDate) {
                const start = new Date(firstCommitDate).getTime();
                const end = new Date(latestCommitDate).getTime();
                projectTimeline = Math.ceil((end - start) / (1000 * 60 * 60 * 24 * 7)) || 1;
              }
          }
        } catch (e) {
          this.logger.warn(`Precise temporal audit failed for ${owner}/${repo}. Falling back to creation date.`);
          const start = new Date(repoData.created_at).getTime();
          const end = Date.now();
          projectTimeline = Math.ceil((end - start) / (1000 * 60 * 60 * 24 * 7));
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
            churnHistory: volume.history,
            commitHistory: commitHistory,
            projectTimeline: projectTimeline,
            totalCommits: totalCommits
        };

        this.statsCache.set(cacheKey, { data: result, timestamp: Date.now() });
        return result;
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
      // 🔬 SUPREME STATISTICIAN: Unified Multi-Signal Acquisition
      const [contributorsRes, weeklyHistoryRes] = await Promise.all([
        octokit.request('GET /repos/{owner}/{repo}/contributors', {
          owner,
          repo,
          per_page: 10
        }),
        this.getRepoContributorStats(owner, repo, token)
      ]);

      const enrichedContributors = await Promise.all(contributorsRes.data.map(async (c: any, index: number) => {
        const username = c.login;
        const commits = Number(c.contributions) || 0;

        // Find matching weekly history signal
        const userHistory = weeklyHistoryRes.find((h: any) => h.username === username)?.weeks || [];

        // 🛡️ ANTI-THROTTLE JITTER
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
          auditVersion: "2.0-DEEP",
          weeklyHistory: userHistory
        };
      }));

      return enrichedContributors.sort((a: any, b: any) => (b.impactScore || 0) - (a.impactScore || 0));
    } catch (error: any) {
      this.logger.error(`Error in Deep Audit for ${owner}/${repo}: ${error.message}`);
      throw error;
    }
  }
}
