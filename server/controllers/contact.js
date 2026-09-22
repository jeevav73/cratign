export function createContactController(store) {
  return {
    async create(req, res, next) {
      try {
        const data = await store.createContact(req.body);
        res.status(201).json({
          success: true,
          message: 'Thanks — we will be in touch shortly.',
          data: { id: data.id || data._id },
        });
      } catch (error) {
        next(error);
      }
    },
  };
}
