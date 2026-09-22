import { Router } from 'express';
import { createContactController } from '../controllers/contact.js';
import { validateContact } from '../middleware/validate.js';

export function createContactRouter(store) {
  const router = Router();
  const controller = createContactController(store);
  router.post('/', validateContact, controller.create);
  return router;
}
