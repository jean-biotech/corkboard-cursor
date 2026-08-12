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

function TinyBird({ className = '', style }) {
  return (
    <svg width="36" height="24" viewBox="0 0 36 24" className={className} style={style} aria-hidden="true">
      <path
        d="M6 14 Q12 6 20 10 Q26 4 32 8"
        fill="none"
        stroke="#1E3A5F"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M20 10 Q18 16 14 18"
        fill="none"
        stroke="#1E3A5F"
        strokeWidth="1.2"
        opacity="0.5"
      />
      <circle cx="31" cy="8" r="1.2" fill="#1E3A5F" opacity="0.55" />
    </svg>
  )
}

function TinyMoth({ className = '', style }) {
  return (
    <svg width="34" height="28" viewBox="0 0 34 28" className={className} style={style} aria-hidden="true">
      <ellipse cx="12" cy="14" rx="8" ry="10" fill="#6B4A2E" opacity="0.18" transform="rotate(-18 12 14)" />
      <ellipse cx="22" cy="14" rx="8" ry="10" fill="#6B4A2E" opacity="0.18" transform="rotate(18 22 14)" />
      <path d="M17 8 V22" stroke="#4A3323" strokeWidth="1.1" opacity="0.45" />
      <circle cx="17" cy="7" r="1.4" fill="#4A3323" opacity="0.4" />
    </svg>
  )
}

function ForYouStamp({ className = '', style }) {
  return (
    <div
      className={className}
      style={{
        ...style,
        border: '1.5px solid rgba(200,50,46,0.45)',
        padding: '2px 6px',
        opacity: 0.45,
        transform: `${style?.transform || ''} rotate(-8deg)`.trim(),
      }}
      aria-hidden="true"
    >
      <p className="font-type text-[0.55rem] tracking-wide text-[#C8322E]">FOR YOU</p>
    </div>
  )
}

function BlankTornScrap({ className = '', style }) {
  return (
    <svg width="48" height="36" viewBox="0 0 48 36" className={className} style={style} aria-hidden="true">
      <path
        d="M4 4 L40 2 L44 6 L42 10 L46 14 L43 20 L46 26 L40 32 L8 34 L4 30 L6 24 L3 18 L6 12 L3 8 Z"
        fill="#F1E7C7"
        stroke="#A08560"
        strokeWidth="0.8"
        opacity="0.75"
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
      <TinyArrow className="absolute left-[68%] top-[58%] opacity-55" style={{ transform: 'rotate(10deg)' }} />
      <TinyBird className="absolute left-[40%] top-[8%] opacity-70" style={{ transform: 'rotate(-4deg)' }} />
      <TinyMoth className="absolute right-[22%] bottom-[22%] opacity-65" style={{ transform: 'rotate(18deg)' }} />
      <ForYouStamp className="absolute left-[4%] bottom-[28%]" />
      <BlankTornScrap className="absolute right-[28%] top-[18%]" style={{ transform: 'rotate(-12deg)' }} />
    </div>
  )
}
