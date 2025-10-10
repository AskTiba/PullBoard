import { api } from "../lib/axios";

export async function signIn(idToken: string, githubAccessToken: string) {
    const url = "http://localhost:3200/api/login";
    const response = await api.request({
        url,
        method: "POST",
        data: {
            idToken,
            githubAccessToken
        }
    });
    return response.status === 200 ? response.data : null;
}