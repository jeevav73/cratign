const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function request(path, options) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) },
    ...options,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.error || 'Request failed');
    error.status = response.status;
    error.fields = payload.fields;
    throw error;
  }
  return payload;
}

export function fetchProjects() {
  return request('/projects');
}

export function fetchProject(id) {
  return request(`/projects/${id}`);
}

export function fetchServices() {
  return request('/services');
}

export function fetchTestimonials() {
  return request('/testimonials');
}

export function submitContact(body) {
  return request('/contact', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}
