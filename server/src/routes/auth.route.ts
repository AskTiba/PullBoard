import { Router } from "express";
import { loginWithGitHub } from "../controllers/AuthController";

const router = Router();

router.post("/login", loginWithGitHub);

export default router;