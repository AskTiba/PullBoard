import { NextFunction, Request, Response } from "express";
import { loginUserWithGitHub } from "../services/auth";

export async function loginWithGitHub(req: Request, res: Response, next: NextFunction) {
    const { idToken, githubAccessToken } = req.body;
    if (!idToken || !githubAccessToken) {
        res.status(400).json({ message: "Bearer token or GitHub Access Token not provided" })
    }

    try {
        const { username, avatarUrl } = await loginUserWithGitHub(idToken, githubAccessToken);
        res.status(200).json({ message: "Successful Authentication", username, avatarUrl })
    } catch (err) {
        next(err);
    }
}

export async function getAuthenticatedUser(req: Request, res: Response, next: NextFunction) {
    if (req.body?.user?.username) {
        return res.status(200).json({
            username: req.body.user.username,
            avatarUrl: req.body.user.avatarUrl
        })
    }
    next("Could not get authenticated user's username");
} 