export default function CorkTexture() {
  // Deterministic speck positions for a lived-in cork surface
  const darkSpecks = [
    [42, 68], [118, 140], [210, 55], [305, 220], [390, 90],
    [480, 310], [560, 180], [650, 70], [740, 250], [820, 130],
    [910, 300], [1000, 85], [1080, 210], [1160, 150], [1240, 280],
    [1320, 95], [95, 400], [175, 520], [260, 460], [350, 610],
    [440, 540], [530, 700], [620, 480], [710, 620], [800, 540],
    [890, 710], [980, 500], [1070, 640], [1150, 560], [1250, 690],
    [1340, 520], [60, 780], [150, 860], [280, 820], [400, 900],
    [520, 840], [640, 920], [760, 860], [880, 940], [1000, 880],
    [1120, 930], [1260, 850], [190, 250], [470, 150], [690, 360],
    [930, 190], [1190, 400], [330, 750], [770, 120], [1050, 780],
  ]

  const lightPatches = [
    [80, 100, 120], [300, 200, 90], [550, 80, 110], [800, 280, 100],
    [1050, 140, 95], [200, 550, 130], [500, 480, 85], [850, 600, 110],
    [1150, 520, 90], [150, 800, 100], [600, 850, 120], [1000, 780, 95],
    [1280, 300, 80], [400, 350, 70], [720, 450, 85],
  ]

  const deepPatches = [
    [160, 180, 100], [420, 90, 80], [700, 200, 95], [980, 100, 85],
    [250, 420, 90], [580, 360, 75], [900, 400, 100], [1200, 220, 80],
    [100, 650, 85], [480, 700, 95], [780, 750, 80], [1100, 680, 90],
    [1300, 800, 70], [340, 900, 85], [950, 900, 75],
  ]

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1400 1000"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="corkNoise" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="4"
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
                    0 0 0 0.35 0"
            result="tint"
          />
        </filter>
        <filter id="corkMottle" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.035"
            numOctaves="3"
            seed="3"
            stitchTiles="stitch"
            result="mottle"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="mottle"
            scale="8"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <radialGradient id="corkVignette" cx="50%" cy="45%" r="70%">
          <stop offset="0%" stopColor="#D4B788" stopOpacity="0.35" />
          <stop offset="55%" stopColor="#C9A876" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#A08560" stopOpacity="0.45" />
        </radialGradient>
        <pattern id="corkGrain" width="48" height="48" patternUnits="userSpaceOnUse">
          <circle cx="8" cy="12" r="1.1" fill="#A08560" opacity="0.35" />
          <circle cx="22" cy="6" r="0.8" fill="#8B7355" opacity="0.3" />
          <circle cx="36" cy="20" r="1.3" fill="#A08560" opacity="0.28" />
          <circle cx="14" cy="30" r="0.7" fill="#6B5344" opacity="0.25" />
          <circle cx="40" cy="38" r="1" fill="#A08560" opacity="0.32" />
          <circle cx="28" cy="42" r="0.6" fill="#8B7355" opacity="0.22" />
        </pattern>
      </defs>

      {/* Base cork */}
      <rect width="1400" height="1000" fill="#C9A876" />

      {/* Soft tonal variation patches */}
      {lightPatches.map(([cx, cy, r], i) => (
        <ellipse
          key={`l-${i}`}
          cx={cx}
          cy={cy}
          rx={r}
          ry={r * 0.72}
          fill="#D4B788"
          opacity={0.28 + (i % 3) * 0.06}
          filter="url(#corkMottle)"
        />
      ))}
      {deepPatches.map(([cx, cy, r], i) => (
        <ellipse
          key={`d-${i}`}
          cx={cx}
          cy={cy}
          rx={r * 0.9}
          ry={r * 0.65}
          fill="#A08560"
          opacity={0.18 + (i % 4) * 0.04}
          filter="url(#corkMottle)"
        />
      ))}

      {/* Noise grain layer */}
      <rect width="1400" height="1000" filter="url(#corkNoise)" opacity="0.55" />
      <rect width="1400" height="1000" fill="url(#corkGrain)" opacity="0.7" />
      <rect width="1400" height="1000" fill="url(#corkVignette)" />

      {/* Natural dark cork imperfections */}
      {darkSpecks.map(([x, y], i) => (
        <circle
          key={`s-${i}`}
          cx={x}
          cy={y}
          r={0.8 + (i % 4) * 0.45}
          fill={i % 3 === 0 ? '#6B5344' : '#8B7355'}
          opacity={0.35 + (i % 5) * 0.08}
        />
      ))}

      {/* Coffee ring stain */}
      <circle
        cx="220"
        cy="780"
        r="38"
        fill="none"
        stroke="#6B4A2E"
        strokeWidth="3.5"
        opacity="0.12"
      />
      <circle
        cx="222"
        cy="782"
        r="34"
        fill="none"
        stroke="#4A3323"
        strokeWidth="1.5"
        opacity="0.08"
        strokeDasharray="8 4 3 6"
      />

      {/* Ink spot */}
      <ellipse cx="1180" cy="240" rx="14" ry="10" fill="#1E3A5F" opacity="0.08" />
      <circle cx="1174" cy="236" r="3" fill="#1E3A5F" opacity="0.1" />
      <circle cx="1188" cy="248" r="2" fill="#1E3A5F" opacity="0.07" />
    </svg>
  )
}
