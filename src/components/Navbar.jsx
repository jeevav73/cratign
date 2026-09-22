import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../data/site.js';
import { useCursor } from '../context/CursorContext.jsx';
import MagneticButton from './MagneticButton.jsx';

export default function Navbar({ ready }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { setCursorState } = useCursor();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.header
        className={`fixed top-0 right-0 left-0 z-50 px-5 py-5 md:px-10 ${
          scrolled ? 'bg-ink/70 backdrop-blur-md' : ''
        }`}
        initial={{ y: -40, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
      >
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="focus-ring font-display text-sm tracking-[0.22em]"
            onMouseEnter={() => setCursorState({ variant: 'link' })}
            onMouseLeave={() => setCursorState({ variant: 'default' })}
          >
            CREATIVE STUDIO
          </Link>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => {
              const className =
                'focus-ring font-display text-xs tracking-[0.22em] text-paper/80 transition-colors hover:text-accent';
              const pointerProps = {
                onMouseEnter: () => setCursorState({ variant: 'link' }),
                onMouseLeave: () => setCursorState({ variant: 'default' }),
              };
              if (link.href.includes('#')) {
                return (
                  <Link key={link.label} to={link.href} className={className} {...pointerProps}>
                    {link.label}
                  </Link>
                );
              }
              return (
                <NavLink key={link.label} to={link.href} className={className} {...pointerProps}>
                  {link.label}
                </NavLink>
              );
            })}
          </nav>
          <MagneticButton
            className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-line"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </MagneticButton>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="site-menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink px-6 py-28 md:px-12"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.87, 0, 0.13, 1] }}
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile">
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + index * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={link.href}
                    className="font-display text-[clamp(2.5rem,8vw,7rem)] font-medium leading-[0.9] tracking-[-0.05em] text-paper transition-colors hover:text-accent"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <p className="font-display text-xs tracking-[0.22em] text-muted">
              HELLO@CREATIVESTUDIO.COM
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
