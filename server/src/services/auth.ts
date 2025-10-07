import { getGitHubToken, saveGitHubToken } from "../auth/database";
import { auth } from "../config/firebase";

export async function loginUserWithGitHub(idToken: string, githubAccessToken: string) {
    try {
        const decoded = await auth.verifyIdToken(idToken);
        console.log(decoded);
        const uid = decoded.uid;
        
        await saveGitHubToken(uid, githubAccessToken);
    } catch (err: any) {
        throw new Error(`Login error ${err.message}`)
    }
}

export async function fetchGitHubAccessToken(idToken: string): Promise<string | null> {
    try {
        const decoded = await auth.verifyIdToken(idToken);
        const uid = decoded.uid;

        const gat = await getGitHubToken(uid);
        return gat;

    } catch (err: any) {
        throw new Error(err.message)
    }
}