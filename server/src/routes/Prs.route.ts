import { Router } from "express";
import { getPullRequestsOfRepository, getUserPRs } from "../controllers/pullRequests";
import { authHandler } from "../middlewares/authHendler";

const router = Router();

router.get("/prs/:username", authHandler, getUserPRs);

router.get("/prs/:username/:repo", authHandler, getPullRequestsOfRepository);

export default router;
