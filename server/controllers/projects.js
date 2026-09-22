export function createProjectController(store) {
  return {
    async list(req, res, next) {
      try {
        const data = await store.getProjects();
        res.json({ success: true, data });
      } catch (error) {
        next(error);
      }
    },
    async getById(req, res, next) {
      try {
        const data = await store.getProject(req.params.id);
        if (!data) {
          res.status(404).json({ success: false, error: 'Project not found.' });
          return;
        }
        res.json({ success: true, data });
      } catch (error) {
        next(error);
      }
    },
  };
}
