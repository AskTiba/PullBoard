// src/auth/githubSignIn.ts
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { auth } from "./firebase";

// interface GithubSignInResult {
//     user: User;
//     githubAccessToken: string;
//     idToken: string;
// }

/**
 * Sign in a user with GitHub via Firebase Authentication.
 * Returns both the Firebase ID token and GitHub access token.
 */
export async function signInWithGitHub(): Promise<any> {
    const provider = new GithubAuthProvider();

    // Request additional GitHub scopes if needed
    provider.addScope("repo");
    provider.addScope("user");

    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log(user)

    const credential = GithubAuthProvider.credentialFromResult(result);
    const githubAccessToken = credential?.accessToken;

    if (!githubAccessToken) {
        throw new Error("GitHub access token not found in Firebase credentials");
    }

    const idToken = await user.getIdToken();
    console.log("***********************TOKEN****************************")
    console.log(idToken);
    console.log("***********************GAT****************************")
    console.log(githubAccessToken);
    // return { user, githubAccessToken, idToken };
    return { user }
}
