import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProjectVisual from '../components/ProjectVisual.jsx';
import MagneticButton from '../components/MagneticButton.jsx';
import { getNextProject, getProject, projects as localProjects } from '../data/projects.js';
import { fetchProject } from '../utils/api.js';
import { easeOutExpo } from '../utils/animations.js';

export default function ProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState(() => getProject(id));
  const [status, setStatus] = useState(project ? 'ready' : 'loading');

  useEffect(() => {
    let alive = true;
    const local = getProject(id);
    setProject(local);
    setStatus(local ? 'ready' : 'loading');
    fetchProject(id)
      .then((payload) => {
        if (alive && payload.data) {
          setProject(payload.data);
          setStatus('ready');
        }
      })
      .catch(() => {
        if (!alive) return;
        if (!local) setStatus('empty');
      });
    return () => {
      alive = false;
    };
  }, [id]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center px-5 pt-28 font-display tracking-[0.2em] text-muted md:px-10">
        LOADING PROJECT…
      </div>
    );
  }

  if (status === 'empty' || !project) {
    return (
      <div className="flex min-h-screen flex-col justify-center px-5 pt-28 md:px-10">
        <h1 className="font-display text-5xl tracking-[-0.05em]">Project not found.</h1>
        <Link to="/work" className="mt-6 font-display text-sm tracking-[0.18em] text-accent">
          BACK TO WORK →
        </Link>
      </div>
    );
  }

  const next = getNextProject(project.id) || localProjects[0];

  return (
    <article className="pt-24">
      <header className="px-5 pt-10 pb-12 md:px-10">
        <p className="font-display text-[11px] tracking-[0.28em] text-accent">
          {project.category} — {project.year}
        </p>
        <h1 className="mt-6 font-display text-[clamp(3rem,10vw,9rem)] font-medium leading-[0.86] tracking-[-0.06em]">
          {project.name}
        </h1>
        <p className="mt-6 max-w-2xl text-paper-dim">{project.excerpt}</p>
      </header>

      <motion.div
        className="h-[58vh] min-h-[22rem] overflow-hidden md:h-[78vh]"
        initial={{ clipPath: 'inset(100% 0 0 0)', scale: 1.08 }}
        animate={{ clipPath: 'inset(0% 0 0 0)', scale: 1 }}
        transition={{ duration: 1.1, ease: easeOutExpo }}
      >
        <ProjectVisual visual={project.visual} title={project.name} className="h-full w-full" />
      </motion.div>

      <section className="grid gap-12 px-5 py-16 md:grid-cols-[1.2fr_0.8fr] md:px-10 md:py-24">
        <p className="max-w-2xl text-lg leading-relaxed text-paper-dim">{project.description}</p>
        <dl className="space-y-6 font-display text-xs tracking-[0.18em]">
          <div>
            <dt className="text-muted">CLIENT</dt>
            <dd className="mt-2 text-sm tracking-[0.08em]">{project.client}</dd>
          </div>
          <div>
            <dt className="text-muted">SERVICES</dt>
            <dd className="mt-2 text-sm tracking-[0.08em]">{project.services?.join(' / ')}</dd>
          </div>
          <div>
            <dt className="text-muted">YEAR</dt>
            <dd className="mt-2 text-sm tracking-[0.08em]">{project.year}</dd>
          </div>
        </dl>
      </section>

      <section className="grid gap-4 px-5 md:grid-cols-2 md:px-10">
        <div className="min-h-[22rem]">
          <ProjectVisual visual={project.visual} className="h-full min-h-[22rem]" animated={false} />
        </div>
        <div className="min-h-[22rem] bg-ink-soft p-8 md:p-12">
          <p className="font-display text-xs tracking-[0.22em] text-muted">CHALLENGE</p>
          <p className="mt-6 text-lg leading-relaxed">{project.challenge}</p>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10">
        <p className="font-display text-xs tracking-[0.22em] text-muted">APPROACH</p>
        <p className="mt-6 max-w-3xl text-2xl leading-snug tracking-[-0.03em] md:text-4xl">
          {project.approach}
        </p>
      </section>

      <section className="px-5 md:px-10">
        <div className="relative min-h-[18rem] overflow-hidden md:min-h-[28rem]">
          <ProjectVisual visual={project.visual} className="h-full min-h-[18rem] md:min-h-[28rem]" />
          <div className="absolute inset-0 flex items-end p-8">
            <p className="font-display text-xs tracking-[0.28em] text-paper">
              MOVING STUDY — {project.name}
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10">
        <h2 className="font-display text-4xl tracking-[-0.04em] md:text-6xl">DESIGN PROCESS</h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {project.process?.map((step, index) => (
            <li key={step.title} className="border-t border-line pt-6">
              <p className="font-display text-xs text-accent">{String(index + 1).padStart(2, '0')}</p>
              <h3 className="mt-3 font-display text-xl">{step.title}</h3>
              <p className="mt-3 text-sm text-paper-dim">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="px-5 pb-20 md:px-10">
        <h2 className="font-display text-4xl tracking-[-0.04em]">RESULTS</h2>
        <div className="mt-10 grid gap-8 border-t border-line pt-10 md:grid-cols-3">
          {project.results?.map((result) => (
            <div key={result.label}>
              <p className="font-display text-5xl tracking-[-0.05em] text-accent">{result.value}</p>
              <p className="mt-2 text-sm text-muted">{result.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col justify-between gap-8 border-t border-line px-5 py-16 md:flex-row md:items-end md:px-10">
        <div>
          <p className="font-display text-xs tracking-[0.22em] text-muted">NEXT PROJECT</p>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,6vw,5rem)] tracking-[-0.05em]">
            {next.title}
          </h2>
        </div>
        <MagneticButton
          as={Link}
          to={`/work/${next.id}`}
          className="rounded-full border border-line px-7 py-4 font-display text-xs tracking-[0.22em] hover:border-accent hover:text-accent"
        >
          VIEW PROJECT →
        </MagneticButton>
      </section>
    </article>
  );
}
