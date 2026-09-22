import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { NAV_LINKS, SOCIAL_LINKS } from '../data/site.js';
import MagneticButton from './MagneticButton.jsx';

export default function Footer() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-line px-5 py-12 md:px-10">
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <Link to="/" className="focus-ring font-display text-sm tracking-[0.22em]">
          CREATIVE STUDIO
        </Link>
        <nav className="flex flex-col gap-2 font-display text-xs tracking-[0.2em]" aria-label="Footer">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} to={link.href} className="focus-ring text-muted hover:text-paper">
              {link.label}
            </Link>
          ))}
        </nav>
        <ul className="flex flex-col gap-2 font-display text-xs tracking-[0.2em] text-muted">
          {SOCIAL_LINKS.slice(0, 3).map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noreferrer" className="focus-ring hover:text-paper">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="font-display text-xs tracking-[0.16em] text-muted">© 2026 Creative Studio</p>
      </div>
      {visible ? (
        <MagneticButton
          className="fixed right-5 bottom-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-paper text-ink md:right-8 md:bottom-8"
          onClick={toTop}
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </MagneticButton>
      ) : null}
    </footer>
  );
}
