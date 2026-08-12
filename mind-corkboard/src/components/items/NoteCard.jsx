import PushPin from '../decor/PushPin'
import { TornPaperClip } from '../decor/TornEdges'
import { TinyArrow } from '../decor/Doodles'

const NOTE_COLORS = {
  cream: '#F1E7C7',
  rose: '#E4A5A5',
  sage: '#9AB5A0',
  blue: '#B8CBDA',
}

export default function NoteCard({ item }) {
  const { data, pinColor, id } = item
  const bg = NOTE_COLORS[data.color] || NOTE_COLORS.cream
  const clipId = `torn-${id}`
  const fontClass = data.fontStyle === 'scribble' ? 'font-scribble' : 'font-hand'

  return (
    <div className="relative select-none" style={{ width: 200 }}>
      <TornPaperClip id={clipId} />
      <div className="absolute -top-2 left-1/2 z-10 -translate-x-1/2">
        <PushPin color={pinColor} size={18} />
      </div>

      <div
        className="relative px-4 py-5"
        style={{
          background: bg,
          clipPath: `url(#${clipId})`,
          boxShadow: '2px 3px 8px rgba(74,51,35,0.22)',
          minHeight: 120,
        }}
      >
        <p
          className={`${fontClass} text-[1.25rem] leading-snug text-[#1E3A5F]`}
          style={{ fontWeight: data.fontStyle === 'scribble' ? 400 : 600 }}
        >
          {data.text || '…'}
        </p>
        {data.showArrow && (
          <div className="mt-2 flex justify-end">
            <TinyArrow />
          </div>
        )}
      </div>
    </div>
  )
}
