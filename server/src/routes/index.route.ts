import prsRoute from "./Prs.route"
import reviewsRoute from "./reviews.route";
import repoRoutes from "./repos.route";
import authRoute from "./auth.route";

import { Router } from "express";

const router = Router();

router.use("/api", prsRoute);
router.use("/api", reviewsRoute);
router.use("/api", repoRoutes);
router.use("/api", authRoute);

export default router;