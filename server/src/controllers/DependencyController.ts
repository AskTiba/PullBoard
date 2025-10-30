import { Request, Response } from 'express';
import { Octokit } from 'octokit';
import { fetchDependencyHistory } from '../services/github.dependencies';
import { GITHUB_PAT } from '../config/env'; // Assuming GITHUB_PAT is exposed via env

export class DependencyController {
    public async getDependencyHistory(req: Request, res: Response): Promise<void> {
        const { owner, repo } = req.params;
        const octokit = new Octokit({
            auth: GITHUB_PAT // Use the backend's PAT
        });

        try {
            const history = await fetchDependencyHistory(octokit, owner, repo);
            console.log(`Sending ${history.length} dependency history entries for ${owner}/${repo} to frontend.`);
            res.status(200).json(history);
        } catch (error: any) {
            console.error(`Error in DependencyController for ${owner}/${repo}:`, error.message);
            res.status(500).json({ message: error.message });
        }
    }
}
