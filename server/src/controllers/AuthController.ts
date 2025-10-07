import { NextFunction, Request, Response } from "express";
import { saveGitHubToken } from "../auth/database";
import { nextTick } from "process";
import { loginUserWithGitHub } from "../services/auth";

export async function loginWithGitHub(req: Request, res: Response, next: NextFunction) {
    const bearerToken = req.headers.authorization;
    const { githubAccessToken } = req.body;

    if (!bearerToken || !githubAccessToken) {
        res.status(400).json({ message: "Bearer token or GitHub Access Token not provided" })
    }

    const idToken = bearerToken?.replace("Bearer ", "") || "";

    try {
        await loginUserWithGitHub(idToken, githubAccessToken);
        res.status(200).json({ message: "Successful Authentication" })
    } catch (err) {
        next(err);
    }

}