import { Router } from 'express';
import { createProjectController } from '../controllers/projects.js';

export function createProjectRouter(store) {
  const router = Router();
  const controller = createProjectController(store);
  router.get('/', controller.list);
  router.get('/:id', controller.getById);
  return router;
}
