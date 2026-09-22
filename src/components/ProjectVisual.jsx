import { memo } from 'react';

const VARIANTS = {
  neon: {
    bg: '#0a0a0a',
    ink: '#d4ff3f',
    hot: '#ff4d1c',
    paper: '#f4f0e6',
  },
  mono: {
    bg: '#141414',
    ink: '#f4f0e6',
    hot: '#d4ff3f',
    paper: '#8c8c8c',
  },
  arc: {
    bg: '#161412',
    ink: '#c6a87c',
    hot: '#f4f0e6',
    paper: '#3a342c',
  },
  nova: {
    bg: '#07070c',
    ink: '#7aa2ff',
    hot: '#d4ff3f',
    paper: '#f4f0e6',
  },
  form: {
    bg: '#1a1612',
    ink: '#e7d5b5',
    hot: '#8c5a3c',
    paper: '#f4f0e6',
  },
  pulse: {
    bg: '#0c0c0c',
    ink: '#ff4d1c',
    hot: '#d4ff3f',
    paper: '#f4f0e6',
  },
  echo: {
    bg: '#12110f',
    ink: '#f4f0e6',
    hot: '#d4ff3f',
    paper: '#5c5850',
  },
};

function NeonArt({ c }) {
  return (
    <>
      <rect width="100%" height="100%" fill={c.bg} />
      <circle cx="78%" cy="30%" r="28%" fill={c.ink} opacity="0.9" />
      <circle cx="70%" cy="42%" r="16%" fill={c.hot} opacity="0.85" />
      <rect x="8%" y="18%" width="2" height="64%" fill={c.paper} opacity="0.35" />
      <rect x="12%" y="28%" width="36%" height="1.5" fill={c.ink} />
    </>
  );
}

function MonoArt({ c }) {
  return (
    <>
      <rect width="100%" height="100%" fill={c.bg} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect
          key={i}
          x={`${12 + i * 13}%`}
          y={`${20 + (i % 2) * 8}%`}
          width="10%"
          height={`${50 - i * 4}%`}
          fill={c.ink}
          opacity={0.15 + i * 0.12}
        />
      ))}
      <circle cx="78%" cy="72%" r="9%" fill={c.hot} />
    </>
  );
}

function ArcArt({ c }) {
  return (
    <>
      <rect width="100%" height="100%" fill={c.bg} />
      <path d="M10 90 Q50 10 90 90" fill="none" stroke={c.ink} strokeWidth="8" />
      <path d="M18 90 Q50 28 82 90" fill="none" stroke={c.hot} strokeWidth="1.5" opacity="0.7" />
      <rect x="46%" y="18%" width="8%" height="62%" fill={c.paper} opacity="0.25" />
    </>
  );
}

function NovaArt({ c }) {
  const dots = Array.from({ length: 18 }, (_, i) => ({
    cx: 20 + ((i * 37) % 70),
    cy: 18 + ((i * 53) % 64),
    r: 1.2 + (i % 4),
  }));
  return (
    <>
      <rect width="100%" height="100%" fill={c.bg} />
      {dots.map((dot, i) => (
        <circle key={i} cx={`${dot.cx}%`} cy={`${dot.cy}%`} r={dot.r} fill={c.ink} opacity="0.85" />
      ))}
      <circle cx="50%" cy="48%" r="18%" fill="none" stroke={c.hot} strokeWidth="1.5" />
      <circle cx="50%" cy="48%" r="4%" fill={c.paper} />
    </>
  );
}

function FormArt({ c }) {
  return (
    <>
      <rect width="100%" height="100%" fill={c.bg} />
      <ellipse cx="52%" cy="48%" rx="22%" ry="30%" fill={c.ink} opacity="0.9" />
      <ellipse cx="48%" cy="52%" rx="16%" ry="22%" fill={c.hot} opacity="0.55" />
      <circle cx="62%" cy="30%" r="7%" fill={c.paper} opacity="0.35" />
    </>
  );
}

function PulseArt({ c }) {
  const bars = Array.from({ length: 24 }, (_, i) => 12 + Math.abs(Math.sin(i * 0.7)) * 70);
  return (
    <>
      <rect width="100%" height="100%" fill={c.bg} />
      {bars.map((h, i) => (
        <rect
          key={i}
          x={`${8 + i * 3.6}%`}
          y={`${50 - h / 2}%`}
          width="1.6%"
          height={`${h}%`}
          fill={i % 5 === 0 ? c.hot : c.ink}
          opacity="0.9"
        />
      ))}
    </>
  );
}

function EchoArt({ c }) {
  return (
    <>
      <rect width="100%" height="100%" fill={c.bg} />
      <rect x="10%" y="16%" width="80%" height="6%" fill={c.ink} />
      <rect x="10%" y="28%" width="62%" height="3%" fill={c.paper} />
      <rect x="10%" y="36%" width="70%" height="3%" fill={c.paper} opacity="0.5" />
      <rect x="10%" y="52%" width="48%" height="32%" fill={c.hot} />
      <rect x="62%" y="52%" width="28%" height="32%" fill={c.ink} opacity="0.2" />
    </>
  );
}

const ART = {
  neon: NeonArt,
  mono: MonoArt,
  arc: ArcArt,
  nova: NovaArt,
  form: FormArt,
  pulse: PulseArt,
  echo: EchoArt,
};

function ProjectVisual({ visual = 'neon', title, className = '', animated = true }) {
  const colors = VARIANTS[visual] || VARIANTS.neon;
  const Art = ART[visual] || NeonArt;

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: colors.bg }}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className={`absolute inset-0 h-full w-full ${animated ? 'motion-safe:animate-pulse' : ''}`}
        aria-hidden="true"
      >
        <Art c={colors} />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
      {title ? (
        <div className="absolute bottom-5 left-5 right-5 font-display text-[clamp(2rem,6vw,5rem)] font-medium leading-[0.85] tracking-[-0.05em] text-paper">
          {title}
        </div>
      ) : null}
    </div>
  );
}

export default memo(ProjectVisual);
