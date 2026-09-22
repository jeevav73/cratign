export function createServiceController(store) {
  return {
    async list(req, res, next) {
      try {
        const data = await store.getServices();
        res.json({ success: true, data });
      } catch (error) {
        next(error);
      }
    },
  };
}
