import { NextFunction, Request, Response } from "express";
import { fetchRepositoriesOfUser, fetchAllCommitsOfRepo } from "../services/github.repos"
import { getGitHubRateLimit } from "../services/github.open.prs";
import { formatUserRepositoriesResponse } from "../utils/pullRequestFormatter";
import { Octokit } from "octokit";
import { GITHUB_PAT } from '../config/env';

// List public repositories of a user

export async function getAllRepositoriesOfUser(req: Request, res: Response, next: NextFunction) {
    try {
        const {
            page = '1',
            per_page = '30'
        } = req.query;
        const { username, token } = req.body.user;
        const octokit = new Octokit({ auth: token });

        const perPage = Math.min(Math.max(parseInt(per_page as string) || 30, 1), 100);
        const pageNum = Math.max(parseInt(page as string) || 1, 1);

        const [repos, rateLimit] = await Promise.all([
            fetchRepositoriesOfUser(octokit, pageNum, perPage),
            getGitHubRateLimit(octokit)
        ]);

        const response = formatUserRepositoriesResponse({
            repos: repos.data,
            pagination: repos.pagination,
            username: username
        });

        res.status(200).json({
            ...response,
            rate_limit: rateLimit
        });
    } catch (error) {
        next(error);
    }
}

export async function getAllCommitsOfRepo(req: Request, res: Response, next: NextFunction) {
    try {
        const { owner, repo } = req.params;
        const octokit = new Octokit({
            auth: GITHUB_PAT // Use the backend's PAT
        });

        const commitsByAuthor = await fetchAllCommitsOfRepo(octokit, owner, repo);

        res.status(200).json(commitsByAuthor);
    } catch (error) {
        next(error);
    }
}