import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard.jsx';
import MagneticButton from './MagneticButton.jsx';

export default function Work({ projects, heading = 'SELECTED WORK', limit }) {
  const list = limit ? projects.slice(0, limit) : projects;

  return (
    <section id="work" className="px-5 py-20 md:px-10 md:py-28">
      <div className="mb-12 flex items-end justify-between gap-6">
        <div className="overflow-hidden">
          <motion.h2
            className="font-display text-[clamp(2.2rem,6vw,6rem)] font-medium tracking-[-0.05em]"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {heading}
          </motion.h2>
        </div>
        <span className="hidden font-display text-xs tracking-[0.24em] text-muted md:block">
          03 — PORTFOLIO
        </span>
      </div>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
        {list.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
      {limit ? (
        <div className="mt-14">
          <MagneticButton
            as={Link}
            to="/work"
            className="rounded-full border border-line px-7 py-4 font-display text-xs tracking-[0.22em] hover:border-accent hover:text-accent"
          >
            VIEW ALL WORK →
          </MagneticButton>
        </div>
      ) : null}
    </section>
  );
}
