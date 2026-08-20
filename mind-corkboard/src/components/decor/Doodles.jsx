import PushPin from './PushPin'
import WashiTape from './WashiTape'

export function PressedFlower({ className = '', style }) {
  return (
    <svg width="44" height="48" viewBox="0 0 44 48" className={className} style={style} aria-hidden="true">
      <ellipse cx="22" cy="22" rx="10" ry="10" fill="#E4A5A5" opacity="0.55" />
      <ellipse cx="14" cy="18" rx="7" ry="6" fill="#E4A5A5" opacity="0.45" transform="rotate(-20 14 18)" />
      <ellipse cx="30" cy="18" rx="7" ry="6" fill="#E4A5A5" opacity="0.45" transform="rotate(20 30 18)" />
      <ellipse cx="16" cy="28" rx="6" ry="5" fill="#C89090" opacity="0.4" />
      <ellipse cx="28" cy="28" rx="6" ry="5" fill="#C89090" opacity="0.4" />
      <circle cx="22" cy="22" r="3.5" fill="#D4A82B" opacity="0.65" />
      <path d="M22 32 Q20 40 18 46" stroke="#5C7A4F" strokeWidth="1.4" fill="none" opacity="0.55" />
      <ellipse cx="16" cy="40" rx="5" ry="2.5" fill="#9AB5A0" opacity="0.45" transform="rotate(-30 16 40)" />
    </svg>
  )
}

export function TinyStar({ className = '', style }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" className={className} style={style} aria-hidden="true">
      <path
        d="M10 2 L11.8 7.6 L17.5 7.4 L12.8 11.2 L14.5 17 L10 13.8 L5.4 17.2 L6.9 11.1 L2.2 7.6 L8 7.5 Z"
        fill="none"
        stroke="#1E3A5F"
        strokeWidth="1.15"
        opacity="0.55"
      />
    </svg>
  )
}

export function TinyArrow({ className = '', style }) {
  return (
    <svg width="64" height="32" viewBox="0 0 64 32" className={className} style={style} aria-hidden="true">
      <path
        d="M3 20 Q16 6 28 16 Q40 26 52 10"
        fill="none"
        stroke="#1E3A5F"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M46 6 L55 9 L49 17"
        fill="none"
        stroke="#1E3A5F"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
    </svg>
  )
}

function WaterRing({ className = '', style }) {
  return (
    <svg width="52" height="52" viewBox="0 0 64 64" className={className} style={style} aria-hidden="true">
      <ellipse cx="32" cy="32" rx="26" ry="20" fill="none" stroke="#5C4033" strokeWidth="2.5" opacity="0.55" />
      <ellipse cx="33" cy="33" rx="18" ry="13" fill="none" stroke="#5C4033" strokeWidth="1.2" opacity="0.3" />
    </svg>
  )
}

/** Used but not decorated — washi, pins, one stain, one flower */
export function BoardDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute left-[6%] top-[8%]" style={{ opacity: 0.7 }}>
        <WashiTape color="rose" width={90} height={16} rotation={-14} />
      </div>
      <div className="absolute right-[8%] top-[14%]" style={{ opacity: 0.65 }}>
        <WashiTape color="sage" width={72} height={14} rotation={10} striped />
      </div>

      <div className="absolute left-[5%] top-[28%]" style={{ opacity: 0.65 }}>
        <PushPin color="blue" size={14} />
      </div>
      <div className="absolute right-[7%] top-[48%]" style={{ opacity: 0.6 }}>
        <PushPin color="yellow" size={13} />
      </div>

      <WaterRing
        className="absolute left-[12%] top-[18%]"
        style={{ opacity: 0.12, transform: 'rotate(-8deg)' }}
      />

      <PressedFlower
        className="absolute bottom-[14%] right-[6%]"
        style={{ transform: 'rotate(10deg)', opacity: 0.42 }}
      />
    </div>
  )
}
