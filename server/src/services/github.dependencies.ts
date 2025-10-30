import { Octokit } from "octokit";

export async function fetchPackageJsonContent(octokit: Octokit, owner: string, repo: string, path: string, ref: string) {
    try {
        const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
            owner,
            repo,
            path,
            ref,
        });

        // The content is base64 encoded
        if (response.data && 'content' in response.data) {
            const content = Buffer.from(response.data.content, 'base64').toString('utf8');
            const parsedContent = JSON.parse(content);
            console.log(`Successfully parsed package.json for ${owner}/${repo} at ${ref}:`, parsedContent);
            return parsedContent;
        }
        return null;
    } catch (error: any) {
        if (error.status === 404) {
            console.warn(`package.json not found at ${path} for commit ${ref} in ${owner}/${repo}`);
            return null;
        }
        console.error(`Error fetching/parsing package.json for ${owner}/${repo} at ${ref}:`, error.message);
        throw new Error(`Failed to fetch package.json content: ${error.message}`);
    }
}

export async function fetchDependencyHistory(octokit: Octokit, owner: string, repo: string) {
    console.log(`Fetching commits for ${owner}/${repo}`);
    const commits = await octokit.request('GET /repos/{owner}/{repo}/commits', {
        owner,
        repo,
        per_page: 100, // Fetch 100 commits per page
    });
    console.log(`Fetched ${commits.data.length} commits for ${owner}/${repo}`);

    const dependencyHistory = [];

    for (const commit of commits.data) {
        const clientPackageJson = await fetchPackageJsonContent(octokit, owner, repo, 'client/package.json', commit.sha);
        const serverPackageJson = await fetchPackageJsonContent(octokit, owner, repo, 'server/package.json', commit.sha);

        const combinedDependencies = {
            ...(clientPackageJson?.dependencies || {}),
            ...(serverPackageJson?.dependencies || {}),
        };
        const combinedDevDependencies = {
            ...(clientPackageJson?.devDependencies || {}),
            ...(serverPackageJson?.devDependencies || {}),
        };

        if (Object.keys(combinedDependencies).length > 0 || Object.keys(combinedDevDependencies).length > 0) {
            dependencyHistory.push({
                commit: {
                    sha: commit.sha,
                    message: commit.commit.message,
                    author: commit.commit.author?.name,
                    date: commit.commit.author?.date,
                },
                dependencies: combinedDependencies,
                devDependencies: combinedDevDependencies,
            });
        }
    }
    console.log(`Generated dependency history with ${dependencyHistory.length} entries for ${owner}/${repo}`);
    return dependencyHistory;
}
