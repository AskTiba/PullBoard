import { useContext, useEffect, useState, createContext, ReactNode } from "react";
import { auth } from "../config/firebase";
import { GithubAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { loginWithGithub } from "../services/AuthenticationService";
import { useNavigate } from "react-router-dom";

interface User {
    username: string,
    avatarUrl: string
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    logIn: () => {};
    logOut: () => {};
}

const AuthContext = createContext({} as AuthContextType);

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [loading, isLoading] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (!currentUser) {
                setUser(null)
            }
        })
        return unsubscribe;
    }, []);

    async function logIn() {
        isLoading(true);
        const provider = new GithubAuthProvider();

        provider.addScope("repo");
        provider.addScope("user");

        const result = await signInWithPopup(auth, provider);

        const credential = GithubAuthProvider.credentialFromResult(result);
        const githubAccessToken = credential?.accessToken;

        if (!githubAccessToken) {
            console.error("Login ERRROR");
            return null;
        }

        const user = result.user;
        const idToken = await user.getIdToken();

        const authenticatedUser = await loginWithGithub(idToken, githubAccessToken);
        if (authenticatedUser) {
            const { username, avatarUrl } = authenticatedUser;
            localStorage.setItem("user", JSON.stringify({ username, avatarUrl }))
            setUser({ username, avatarUrl });
            isLoading(false);
            navigate("/");
        }
    }

    async function logOut() {
        auth.signOut();
        localStorage.removeItem("user");
        navigate("/")
    }

    const value = {
        user,
        loading,
        logIn,
        logOut
    };

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
}