import { NextFunction, Request, Response } from "express";
import { fetchGitHubAccessToken } from "../services/auth";

export async function authHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const bearerToken = req.headers.authorization;

        if (!bearerToken) {
            res.status(401).send();
        }

        const idToken = bearerToken?.replace("Bearer ", "") || "";
        const githubAccessToken = await fetchGitHubAccessToken(idToken);

        if (!githubAccessToken) {
            return res.status(401).send();
        }

        req.body = req.body ? { ...req.body, user: { githubAccessToken } } : { user: { githubAccessToken } }
        return next();
    } catch (err) {
        res.status(401).send();
    }
}