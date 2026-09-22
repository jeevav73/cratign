import { memo, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProjectVisual from './ProjectVisual.jsx';
import { useCursor } from '../context/CursorContext.jsx';
import { easeOutExpo } from '../utils/animations.js';

const MEDIA_CLASS = {
  wide: 'md:col-span-2 min-h-[22rem] md:min-h-[34rem]',
  tall: 'min-h-[22rem] md:min-h-[36rem]',
  square: 'min-h-[22rem] md:min-h-[26rem]',
};

function ProjectCard({ project, index }) {
  const { setCursorState } = useCursor();
  const visualRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const fromLeft = index % 2 === 0;

  useEffect(() => {
    const id = window.setTimeout(() => setVisible(true), 120 + index * 90);
    return () => window.clearTimeout(id);
  }, [index]);

  const onMove = (event) => {
    const node = visualRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.transform = `translate3d(${px * -10}px, ${py * -8}px, 0) scale(1.04)`;
  };

  const onLeave = () => {
    if (visualRef.current) visualRef.current.style.transform = 'translate3d(0, 0, 0) scale(1)';
    setCursorState({ variant: 'default', label: '' });
  };

  return (
    <motion.article
      className={`group ${project.size === 'wide' ? 'md:col-span-2' : ''}`}
      initial={{ opacity: 0, x: fromLeft ? -36 : 36 }}
      animate={visible ? { opacity: 1, x: 0 } : undefined}
      transition={{ duration: 0.8, delay: (index % 4) * 0.05, ease: easeOutExpo }}
    >
      <Link
        to={`/work/${project.id}`}
        className="focus-ring block"
        onMouseEnter={() => setCursorState({ variant: 'view', label: project.name })}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <div
          className={`relative overflow-hidden ${MEDIA_CLASS[project.size] || MEDIA_CLASS.square}`}
        >
          <div
            ref={visualRef}
            className="absolute inset-0 origin-center will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          >
            <ProjectVisual visual={project.visual} className="h-full w-full" />
          </div>
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-display text-xl tracking-[-0.03em] md:text-2xl">{project.title}</h3>
            <p className="mt-1 text-sm text-muted">{project.excerpt}</p>
          </div>
          <p className="shrink-0 pt-1 font-display text-xs tracking-[0.18em] text-muted">
            {project.category} / {project.year}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}

export default memo(ProjectCard);
