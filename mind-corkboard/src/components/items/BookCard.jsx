import PushPin from '../decor/PushPin'
import Stars from './Stars'

export default function BookCard({ item, compact = false }) {
  const { data, pinColor, id } = item
  const note = data.note || data.takeaway || data.review || ''
  const catalogNo = String((id || '').replace(/\D/g, '').slice(-3) || '017').padStart(3, '0')

  return (
    <div
      className="relative w-full select-none px-3 pb-3 pt-5"
      style={{
        minHeight: compact ? 240 : 280,
        background: '#F1E7C7',
        border: '1.5px dashed rgba(74,51,35,0.4)',
        boxShadow: '2px 4px 10px rgba(74,51,35,0.22)',
      }}
    >
      <div className="absolute -top-2 left-1/2 z-10 -translate-x-1/2">
        <PushPin color={pinColor} size={18} />
      </div>

      <div className="mb-2 flex items-start justify-between gap-2">
        <p className="font-label text-[0.62rem] tracking-wide text-[#6B4A2E]/55">
          no. {catalogNo}
        </p>
        <p className="font-label text-[0.62rem] tracking-wide text-[#6B4A2E]/55">
          {data.dateRead || '····'}
        </p>
      </div>

      {data.coverImage && (
        <div className="mb-2 h-20 overflow-hidden bg-[#2A221C]">
          <img src={data.coverImage} alt="" className="h-full w-full object-cover" draggable={false} />
        </div>
      )}

      <h3
        className="font-display italic leading-tight text-[#1F1815]"
        style={{ fontSize: compact ? '1.15rem' : '1.35rem', fontWeight: 500 }}
      >
        {data.title || 'Untitled'}
      </h3>
      {data.author && (
        <p className="font-type mt-1 text-[0.7rem] text-[#6B4A2E]">{data.author}</p>
      )}

      <div className="mt-2">
        <Stars rating={data.rating || 0} size={compact ? 12 : 14} />
      </div>

      {note && (
        <p className="font-hand mt-2 line-clamp-4 text-[1.35rem] leading-snug text-[#1E3A5F]">
          {note}
        </p>
      )}

      {data.genre && (
        <p className="font-type mt-auto pt-2 text-[0.62rem] text-[#6B4A2E]/70">{data.genre}</p>
      )}
    </div>
  )
}
