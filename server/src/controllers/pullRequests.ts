import { NextFunction, Request, Response } from "express";
import {
  getAllPRsForUser,
  getGitHubRateLimit,
  getTotalPRCountViaSearch,
} from "../services/github.open.prs";
import { PRState } from "../types/github.types";
import {
  formatPullRequestResponse,
  formatRepoPRResponse,
} from "../utils/pullRequestFormatter";
import { fetchPullRequestsOfRepo } from "../services/github.repos";
import { Octokit } from "octokit";

// All PRs of a User
export async function getUserPRs(req: Request, res: Response, next: NextFunction) {
  try {
    const { githubAccessToken } = req.body.user;
    const { username } = req.params;
    const { state = "open", per_page = "10", page = "1" } = req.query;

    const validStates: PRState[] = ["open", "closed", "all"];
    const prState = validStates.includes(state as PRState)
      ? (state as PRState)
      : "open";

    const perPage = Math.min(
      Math.max(parseInt(per_page as string) || 10, 1),
      100
    );
    const pageNum = Math.max(parseInt(page as string) || 1, 1);

    const options = { perPage, page: pageNum };
    const octokit = new Octokit({ auth: githubAccessToken });
    const [reposWithPRs, totalPRsAllRepos, rateLimit] =
      await Promise.all([
        getAllPRsForUser(octokit, username, prState, options),
        getTotalPRCountViaSearch(octokit, username, prState),
        getGitHubRateLimit(octokit),
      ]);

    const response = formatPullRequestResponse({
      prs: reposWithPRs,
      pageNum,
      perPage,
      prState,
      username,
      totalPRsOverride: Math.min(totalPRsAllRepos, 1000),
    });

    res.status(200).json({
      ...response,
      rate_limit: rateLimit,
    });
  } catch (error: any) {
    next(error);
  }
}

// All PRs of a Repos
export async function getPullRequestsOfRepository(req: Request, res: Response, next: NextFunction) {
  const { repo, username } = req.params;
  const { state = 'open', page = '1', per_page = '30' } = req.query;

  try {
    const { githubAccessToken } = req.body.user;
    const validStates: PRState[] = ['open', 'closed', 'all'];
    const prState = validStates.includes(state as PRState) ? state as PRState : 'open';

    const perPage = Math.min(Math.max(parseInt(per_page as string) || 30, 1), 100);
    const pageNum = Math.max(parseInt(page as string) || 1, 1);
    const octokit = new Octokit({ auth: githubAccessToken });
    const [prs, rateLimit] = await Promise.all([
      fetchPullRequestsOfRepo(octokit, username, repo, prState, pageNum, perPage),
      getGitHubRateLimit(octokit)
    ]);

    const response = formatRepoPRResponse({
      pullRequests: prs.data,
      pagination: prs.pagination,
      state: prState,
      username: username,
      repo: repo
    });

    res.status(200).json({
      ...response,
      rate_limit: rateLimit
    });
  } catch (error) {
    next(error);
  }
}