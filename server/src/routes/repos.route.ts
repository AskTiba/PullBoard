import { Router } from "express";

import { getAllRepositoriesOfUser, getAllCommitsOfRepo } from "../controllers/RepositoryController";
import { authHandler } from "../middlewares/authHendler";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Repos
 *   description: Endpoints for repositories
 */

/**
 * @swagger
 * /api/repos/{username}:
 *   get:
 *     summary: List public repositories of a user
 *     tags: [Repos]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: per_page
 *         schema:
 *           type: integer
 *           default: 30
 *     responses:
 *       200:
 *         description: List of repositories with pagination
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserRepositoriesResponse'
 */
router.get('/repos/:username', authHandler, getAllRepositoriesOfUser);

/**
 * @swagger
 * /api/repos/{owner}/{repo}/commits:
 *   get:
 *     summary: Get all commits of a repository by author
 *     tags: [Repos]
 *     parameters:
 *       - in: path
 *         name: owner
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: repo
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Object with commit counts by author
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 type: integer
 */
router.get('/repos/:owner/:repo/commits', authHandler, getAllCommitsOfRepo);

export default router;