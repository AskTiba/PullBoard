import { useFetchWrapper } from "../hooks/fetchWrapper";


export async function loginWithGithub(idToken: string, githubAccessToken: string) {
    const path = "http://localhost:3200/api/login";
    const fetchWrapper = useFetchWrapper();

    const response = await fetchWrapper.post(path, { idToken, githubAccessToken });

    if (response.status === 200) {
        const user = await response.json();
        return user;
    }
    return null;
}