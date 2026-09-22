import { Router } from 'express';
import { createTestimonialController } from '../controllers/testimonials.js';

export function createTestimonialRouter(store) {
  const router = Router();
  const controller = createTestimonialController(store);
  router.get('/', controller.list);
  return router;
}
