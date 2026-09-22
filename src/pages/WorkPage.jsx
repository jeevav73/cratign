import { useEffect, useState } from 'react';
import Work from '../components/Work.jsx';
import Contact from '../components/Contact.jsx';
import { projects as localProjects } from '../data/projects.js';
import { fetchProjects } from '../utils/api.js';

export default function WorkPage() {
  const [projects, setProjects] = useState(localProjects);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    fetchProjects()
      .then((payload) => {
        if (alive && payload.data?.length) setProjects(payload.data);
      })
      .catch(() => {
        if (alive) setError('Showing archived work while the live archive reconnects.');
      });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="pt-24">
      {error ? (
        <p className="px-5 font-display text-xs tracking-[0.18em] text-muted md:px-10">{error}</p>
      ) : null}
      <Work projects={projects} heading="ALL WORK" />
      <Contact />
    </div>
  );
}
