import { Octokit } from "octokit";
import { getGitHubToken, saveGitHubToken } from "../auth/database";
import { auth } from "../config/firebase";

export async function loginUserWithGitHub(idToken: string, githubAccessToken: string) {
    try {
        const decoded = await auth.verifyIdToken(idToken);
        const uid = decoded.uid;
        const octokit = new Octokit({ auth: githubAccessToken });
        const user = await octokit.request("GET /user")

        await saveGitHubToken(uid, githubAccessToken, user?.data?.login, user?.data?.avatar_url);

        return { username: user?.data?.login, avatarUrl: user?.data?.avatar_url };
    } catch (err: any) {
        throw new Error(`Login error ${err.message}`)
    }
}

export async function fetchGitHubAccessToken(idToken: string): Promise<any> {
    try {
        const decoded = await auth.verifyIdToken(idToken);
        const uid = decoded.uid;

        const user = await getGitHubToken(uid);
        return user;

    } catch (err: any) {
        throw new Error(err.message)
    }
}