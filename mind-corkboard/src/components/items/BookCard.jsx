import PushPin from '../decor/PushPin'
import Stars from './Stars'

export default function BookCard({ item, compact = false }) {
  const { data, pinColor } = item
  const w = compact ? 200 : 240
  const h = compact ? 290 : 340

  return (
    <div
      className="relative select-none"
      style={{
        width: w,
        height: h,
        background: '#F1E7C7',
        boxShadow: '2px 4px 10px rgba(74,51,35,0.28), inset 0 0 0 1px rgba(74,51,35,0.18)',
      }}
    >
      <div className="absolute -top-2 left-1/2 z-10 -translate-x-1/2">
        <PushPin color={pinColor} size={20} />
      </div>

      {/* subtle paper curl */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-10 w-10"
        style={{
          background: 'linear-gradient(225deg, transparent 50%, rgba(160,133,96,0.18) 50%)',
        }}
      />

      <div className="flex h-full flex-col px-3 pb-3 pt-5">
        <div
          className="mb-2 flex items-center justify-center overflow-hidden"
          style={{
            height: compact ? 90 : 110,
            background: data.coverImage
              ? '#1F1815'
              : 'linear-gradient(160deg, #6B4A2E 0%, #4A3323 100%)',
            boxShadow: 'inset 0 0 0 1px rgba(31,24,21,0.2)',
          }}
        >
          {data.coverImage ? (
            <img
              src={data.coverImage}
              alt=""
              className="h-full w-full object-cover"
              draggable={false}
            />
          ) : (
            <span className="font-serif text-4xl text-[#F1E7C7]/80" aria-hidden="true">
              {data.coverEmoji || '◆'}
            </span>
          )}
        </div>

        <h3
          className="font-serif leading-tight text-[#1F1815]"
          style={{ fontSize: compact ? '1.05rem' : '1.25rem', fontWeight: 500 }}
        >
          {data.title || 'Untitled'}
        </h3>
        <p className="font-type mt-0.5 text-[0.65rem] text-[#6B4A2E]">
          {data.author || 'unknown author'}
        </p>

        {data.genre && (
          <span
            className="font-type mt-1.5 inline-block self-start px-1.5 py-0.5 text-[0.58rem]"
            style={{
              background: 'rgba(154,181,160,0.35)',
              border: '1px solid rgba(92,122,79,0.3)',
              color: '#3A4A32',
            }}
          >
            {data.genre}
          </span>
        )}

        <div className="mt-2">
          <Stars rating={data.rating || 0} size={compact ? 12 : 14} />
        </div>

        {!compact && data.takeaway && (
          <p className="font-hand mt-2 line-clamp-2 text-[1.05rem] leading-snug text-[#1E3A5F]">
            {data.takeaway}
          </p>
        )}

        {!compact && data.review && (
          <p className="font-serif mt-1 line-clamp-3 text-[0.85rem] leading-snug text-[#1F1815]/80 italic">
            {data.review}
          </p>
        )}

        {data.dateRead && (
          <p className="font-type mt-auto pt-2 text-[0.58rem] tracking-wide text-[#6B4A2E]/80">
            read {data.dateRead}
          </p>
        )}
      </div>
    </div>
  )
}
