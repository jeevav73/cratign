import { Router } from 'express';
import { createServiceController } from '../controllers/services.js';

export function createServiceRouter(store) {
  const router = Router();
  const controller = createServiceController(store);
  router.get('/', controller.list);
  return router;
}
