import { NextFunction, Request, Response } from "express";
import { fetchGitHubAccessToken } from "../services/auth";

export async function authHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const bearerToken = req.headers.authorization;

        if (!bearerToken) {
            res.status(401).send();
        }

        const idToken = bearerToken?.replace("Bearer ", "") || "";
        const user = await fetchGitHubAccessToken(idToken);

        if (!user || !user.token) {
            return res.status(401).send();
        }

        req.body = req.body ? { ...req.body, user } : { user }
        return next();
    } catch (err) {
        res.status(401).send();
    }
}