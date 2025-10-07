import { Router } from "express";

import { getAllRepositoriesOfUser } from "../controllers/RepositoryController";
import { authHandler } from "../middlewares/authHendler";

const router = Router();

router.get('/repos/:username', authHandler, getAllRepositoriesOfUser);

export default router;