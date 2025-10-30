import { Router } from 'express';
import { DependencyController } from '../controllers/DependencyController';

const router = Router();
const dependencyController = new DependencyController();

router.get('/:owner/:repo/dependency-history', dependencyController.getDependencyHistory);

export default router;
