export function createTestimonialController(store) {
  return {
    async list(req, res, next) {
      try {
        const data = await store.getTestimonials();
        res.json({ success: true, data });
      } catch (error) {
        next(error);
      }
    },
  };
}
