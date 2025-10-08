import { Router } from "express";
import { loginWithGitHub } from "../controllers/AuthController";

const router = Router();

router.get("/login", loginWithGitHub);

export default router;