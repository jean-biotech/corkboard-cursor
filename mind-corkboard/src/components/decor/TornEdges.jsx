/** SVG clip-path for irregular torn paper edges */
export function TornPaperClip({ id }) {
  return (
    <svg width="0" height="0" className="absolute">
      <defs>
        <clipPath id={id} clipPathUnits="objectBoundingBox">
          <path d="M0.02,0.03 L0.08,0.01 L0.15,0.04 L0.22,0.01 L0.30,0.03 L0.38,0.00 L0.46,0.04 L0.55,0.01 L0.63,0.03 L0.72,0.00 L0.80,0.03 L0.88,0.01 L0.96,0.04 L0.99,0.10 L0.97,0.18 L1.00,0.26 L0.98,0.35 L1.00,0.44 L0.97,0.52 L0.99,0.61 L0.97,0.70 L1.00,0.78 L0.98,0.86 L0.99,0.93 L0.95,0.98 L0.88,0.96 L0.80,0.99 L0.72,0.97 L0.64,1.00 L0.55,0.97 L0.46,0.99 L0.38,0.96 L0.30,0.99 L0.22,0.97 L0.14,1.00 L0.06,0.97 L0.01,0.92 L0.03,0.84 L0.00,0.75 L0.02,0.66 L0.00,0.56 L0.03,0.47 L0.01,0.38 L0.03,0.28 L0.00,0.18 L0.02,0.09 Z" />
        </clipPath>
      </defs>
    </svg>
  )
}

export function PerforatedEdge({ className = '' }) {
  const holes = Array.from({ length: 14 }, (_, i) => i)
  return (
    <div className={`flex flex-col justify-between py-1 ${className}`} aria-hidden="true">
      {holes.map((i) => (
        <span
          key={i}
          className="block h-1.5 w-1.5 rounded-full bg-[#C9A876]"
          style={{ boxShadow: 'inset 0 0 0 1px rgba(74,51,35,0.15)' }}
        />
      ))}
    </div>
  )
}

export function SpiralHoles({ className = '' }) {
  const holes = Array.from({ length: 10 }, (_, i) => i)
  return (
    <div className={`flex flex-col items-center justify-around ${className}`} aria-hidden="true">
      {holes.map((i) => (
        <span
          key={i}
          className="block h-2.5 w-2.5 rounded-full border border-[#A08560]/60 bg-[#C9A876]/80"
        />
      ))}
    </div>
  )
}
