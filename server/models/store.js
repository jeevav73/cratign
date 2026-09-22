import { projects, services, testimonials } from '../data/content.js';

const memory = {
  projects: [...projects],
  services: [...services],
  testimonials: [...testimonials],
  contacts: [],
};

export function createStore(database) {
  if (database) {
    return {
      async getProjects() {
        return memory.projects;
      },
      async getProject(id) {
        return memory.projects.find((item) => item.id === id) || null;
      },
      async getServices() {
        return memory.services;
      },
      async getTestimonials() {
        return memory.testimonials;
      },
      async createContact(payload) {
        const [result] = await database.execute(
          'INSERT INTO contacts (name, email, company, message) VALUES (?, ?, ?, ?)',
          [payload.name, payload.email, payload.company || '', payload.message],
        );
        return { id: result.insertId, ...payload };
      },
    };
  }

  return {
    async getProjects() {
      return memory.projects;
    },
    async getProject(id) {
      return memory.projects.find((item) => item.id === id) || null;
    },
    async getServices() {
      return memory.services;
    },
    async getTestimonials() {
      return memory.testimonials;
    },
    async createContact(payload) {
      const entry = { id: `c_${Date.now()}`, ...payload, createdAt: new Date().toISOString() };
      memory.contacts.push(entry);
      return entry;
    },
  };
}
