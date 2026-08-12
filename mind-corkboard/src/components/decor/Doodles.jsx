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
        d="M10 2 L11.5 7.5 L17 8 L12.5 11.5 L14 17 L10 14 L6 17 L7.5 11.5 L3 8 L8.5 7.5 Z"
        fill="none"
        stroke="#1E3A5F"
        strokeWidth="1.2"
        opacity="0.55"
      />
    </svg>
  )
}

export function TinyArrow({ className = '', style }) {
  return (
    <svg width="56" height="28" viewBox="0 0 56 28" className={className} style={style} aria-hidden="true">
      <path
        d="M4 18 Q18 8 32 14 T50 10"
        fill="none"
        stroke="#1E3A5F"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.65"
      />
      <path
        d="M44 6 L52 10 L46 16"
        fill="none"
        stroke="#1E3A5F"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.65"
      />
    </svg>
  )
}

export function BoardDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute left-[8%] top-[6%]">
        <WashiTape color="rose" width={100} height={20} rotation={-18} />
      </div>
      <div className="absolute right-[10%] top-[12%]">
        <WashiTape color="sage" width={85} height={18} rotation={12} striped />
      </div>
      <div className="absolute left-[18%] bottom-[10%]">
        <WashiTape color="blue" width={70} height={16} rotation={-8} />
      </div>

      <div className="absolute left-[5%] top-[22%]">
        <PushPin color="blue" size={16} />
      </div>
      <div className="absolute right-[6%] top-[40%]">
        <PushPin color="yellow" size={15} />
      </div>
      <div className="absolute left-[12%] bottom-[18%]">
        <PushPin color="green" size={14} />
      </div>

      <PressedFlower className="absolute right-[7%] bottom-[14%] opacity-70" style={{ transform: 'rotate(12deg)' }} />
      <TinyStar className="absolute left-[7%] top-[48%]" style={{ transform: 'rotate(-8deg)' }} />
      <TinyStar className="absolute right-[14%] top-[28%]" style={{ transform: 'rotate(15deg)' }} />
      <TinyArrow className="absolute left-[72%] top-[52%] opacity-60" style={{ transform: 'rotate(8deg)' }} />
    </div>
  )
}
