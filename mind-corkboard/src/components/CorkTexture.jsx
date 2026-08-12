export default function CorkTexture() {
  // Fewer, heavier patches — used board, not brand-new cork
  const lightPatches = [
    [80, 100, 120], [300, 200, 90], [550, 80, 110], [800, 280, 100],
    [1050, 140, 95], [200, 550, 130], [500, 480, 85], [850, 600, 110],
    [1150, 520, 90], [150, 800, 100], [600, 850, 120], [1000, 780, 95],
  ]

  const deepPatches = [
    [160, 180, 130], [420, 90, 100], [700, 200, 120], [980, 100, 110],
    [250, 420, 140], [580, 360, 95], [900, 400, 130], [1200, 220, 100],
    [100, 650, 110], [480, 700, 125], [780, 750, 100], [1100, 680, 115],
    [330, 900, 140], [950, 900, 120], [1280, 500, 90],
  ]

  // Deterministic dark cork pits
  const darkSpecks = [
    [42, 68], [118, 140], [210, 55], [305, 220], [390, 90],
    [480, 310], [560, 180], [650, 70], [740, 250], [820, 130],
    [910, 300], [1000, 85], [1080, 210], [1160, 150], [1240, 280],
    [95, 400], [175, 520], [350, 610], [530, 700], [710, 620],
    [890, 710], [1070, 640], [1250, 690], [60, 780], [280, 820],
    [520, 840], [760, 860], [1000, 880], [1260, 850], [470, 150],
    [690, 360], [930, 190], [330, 750], [1050, 780], [190, 250],
    [400, 350], [840, 450], [1120, 360], [60, 300], [1350, 600],
  ]

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1400 1000"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        {/* Lighter noise for performance */}
        <filter id="corkNoise" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="2"
            seed="7"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0.78
                    0 0 0 0 0.62
                    0 0 0 0 0.42
                    0 0 0 0.32 0"
          />
        </filter>
        <radialGradient id="corkVignette" cx="50%" cy="45%" r="72%">
          <stop offset="0%" stopColor="#D4B788" stopOpacity="0.3" />
          <stop offset="55%" stopColor="#C9A876" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#A08560" stopOpacity="0.42" />
        </radialGradient>
        <pattern id="corkGrain" width="56" height="56" patternUnits="userSpaceOnUse">
          <circle cx="8" cy="12" r="1.2" fill="#A08560" opacity="0.32" />
          <circle cx="24" cy="6" r="0.7" fill="#8B7355" opacity="0.28" />
          <circle cx="40" cy="22" r="1.4" fill="#A08560" opacity="0.26" />
          <circle cx="16" cy="34" r="0.8" fill="#6B5344" opacity="0.24" />
          <circle cx="44" cy="42" r="1.1" fill="#A08560" opacity="0.3" />
          <circle cx="30" cy="48" r="0.6" fill="#8B7355" opacity="0.2" />
        </pattern>
      </defs>

      <rect width="1400" height="1000" fill="#C9A876" />

      {lightPatches.map(([cx, cy, r], i) => (
        <ellipse
          key={`l-${i}`}
          cx={cx}
          cy={cy}
          rx={r}
          ry={r * 0.72}
          fill="#D4B788"
          opacity={0.3 + (i % 3) * 0.07}
        />
      ))}
      {deepPatches.map(([cx, cy, r], i) => (
        <ellipse
          key={`d-${i}`}
          cx={cx}
          cy={cy}
          rx={r * 0.95}
          ry={r * 0.7}
          fill="#A08560"
          opacity={0.2 + (i % 4) * 0.05}
        />
      ))}

      {/* Extra aged dark patches */}
      <ellipse cx="380" cy="280" rx="160" ry="110" fill="#8B7355" opacity="0.14" />
      <ellipse cx="980" cy="620" rx="180" ry="130" fill="#6B5344" opacity="0.12" />
      <ellipse cx="720" cy="180" rx="90" ry="70" fill="#8B7355" opacity="0.11" />

      <rect width="1400" height="1000" filter="url(#corkNoise)" opacity="0.45" />
      <rect width="1400" height="1000" fill="url(#corkGrain)" opacity="0.65" />
      <rect width="1400" height="1000" fill="url(#corkVignette)" />

      {darkSpecks.map(([x, y], i) => (
        <circle
          key={`s-${i}`}
          cx={x}
          cy={y}
          r={0.9 + (i % 4) * 0.5}
          fill={i % 3 === 0 ? '#6B5344' : '#8B7355'}
          opacity={0.38 + (i % 5) * 0.08}
        />
      ))}

      {/* Coffee ring */}
      <circle cx="220" cy="780" r="38" fill="none" stroke="#6B4A2E" strokeWidth="3.5" opacity="0.14" />
      <circle
        cx="222"
        cy="782"
        r="34"
        fill="none"
        stroke="#4A3323"
        strokeWidth="1.5"
        opacity="0.09"
        strokeDasharray="8 4 3 6"
      />

      {/* Faint water stains */}
      <ellipse cx="640" cy="320" rx="55" ry="42" fill="none" stroke="#6B4A2E" strokeWidth="2" opacity="0.07" />
      <ellipse cx="1100" cy="760" rx="48" ry="36" fill="none" stroke="#4A3323" strokeWidth="1.8" opacity="0.08" />
      <ellipse cx="460" cy="860" rx="36" ry="28" fill="none" stroke="#6B4A2E" strokeWidth="1.5" opacity="0.06" />

      {/* Ink spot */}
      <ellipse cx="1180" cy="240" rx="14" ry="10" fill="#1E3A5F" opacity="0.08" />
      <circle cx="1174" cy="236" r="3" fill="#1E3A5F" opacity="0.1" />
      <circle cx="1188" cy="248" r="2" fill="#1E3A5F" opacity="0.07" />
    </svg>
  )
}
