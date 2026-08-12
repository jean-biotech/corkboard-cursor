import PushPin from '../decor/PushPin'
import { TornPaperClip } from '../decor/TornEdges'
import { TinyArrow, TinyStar } from '../decor/Doodles'

const NOTE_COLORS = {
  cream: '#F1E7C7',
  rose: '#E4A5A5',
  sage: '#9AB5A0',
  blue: '#B8CBDA',
}

export default function NoteCard({ item, welcome = false }) {
  const { data, pinColor, id } = item
  const bg = NOTE_COLORS[data.color] || NOTE_COLORS.cream
  const clipId = `torn-${id}`

  return (
    <div className="relative w-full select-none">
      <TornPaperClip id={clipId} />
      <div className="absolute -top-2 left-1/2 z-10 -translate-x-1/2">
        <PushPin color={pinColor} size={welcome ? 16 : 18} />
      </div>

      <div
        className={`relative ${welcome ? 'px-4 py-4' : 'px-6 py-6'}`}
        style={{
          background: bg,
          clipPath: `url(#${clipId})`,
          boxShadow: '2px 3px 8px rgba(74,51,35,0.22)',
          minHeight: welcome ? 168 : 120,
          maxHeight: welcome ? 180 : undefined,
        }}
      >
        {data.doodle === 'star' && (
          <TinyStar className="absolute right-3 top-3 opacity-60" style={{ transform: 'rotate(12deg)' }} />
        )}
        <p
          className={`font-hand whitespace-pre-line text-[#1E3A5F] ${
            welcome ? 'text-[1.15rem] leading-snug' : 'text-[1.5rem] leading-snug'
          }`}
        >
          {data.text || '…'}
        </p>
        {data.showArrow && (
          <div className={`flex justify-end pr-1 ${welcome ? 'mt-1.5' : 'mt-3'}`}>
            <TinyArrow style={welcome ? { width: 48, height: 24 } : undefined} />
          </div>
        )}
      </div>
    </div>
  )
}
