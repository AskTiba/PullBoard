import { Router } from "express";
import { getAuthenticatedUser, loginWithGitHub } from "../controllers/AuthController";
import { authHandler } from "../middlewares/authHendler";

const router = Router();

router.post("/login", loginWithGitHub);
router.get("/user", authHandler, getAuthenticatedUser);

export default router;