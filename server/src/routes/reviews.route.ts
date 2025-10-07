import { Router } from "express";
import {
  getPRReviews,
  getUserRepoReviews,
  getUserReviews,
  getReviewsByReviewer,
  getReviewStats
} from "../controllers/reviews";
import { authHandler } from "../middlewares/authHendler";

const router = Router();

router.get("/reviews/:username", authHandler, getUserReviews);


router.get("/reviews/:username/:repo", authHandler, getUserRepoReviews);


router.get("/reviews/:username/:repo/:pullNumber", authHandler, getPRReviews);


router.get("/reviewer/:reviewer", authHandler, getReviewsByReviewer);


router.get("/stats/:username", authHandler, getReviewStats);

export default router;