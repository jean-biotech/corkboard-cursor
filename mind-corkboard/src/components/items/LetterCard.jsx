import PushPin from '../decor/PushPin'

export default function LetterCard({ item }) {
  const { data, pinColor } = item

  return (
    <div
      className="relative select-none px-4 pb-4 pt-6"
      style={{
        width: 260,
        minHeight: 320,
        maxHeight: 360,
        background: 'linear-gradient(180deg, #F4EBD0 0%, #F1E7C7 60%, #E8DCB8 100%)',
        boxShadow: '2px 4px 12px rgba(74,51,35,0.28), inset 0 0 0 1px rgba(74,51,35,0.14)',
      }}
    >
      <div className="absolute -top-2 left-1/2 z-10 -translate-x-1/2">
        <PushPin color={pinColor} size={18} />
      </div>

      {/* fold marks */}
      <div
        className="pointer-events-none absolute inset-x-0 top-1/3 h-px"
        style={{ background: 'rgba(160,133,96,0.25)' }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-2/3 h-px"
        style={{ background: 'rgba(160,133,96,0.18)' }}
      />

      {/* paper curl */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-12 w-12"
        style={{
          background: 'linear-gradient(225deg, transparent 48%, rgba(160,133,96,0.2) 48%)',
        }}
      />

      <h3 className="font-serif text-xl font-medium leading-tight text-[#1F1815]">
        {data.title || 'Untitled'}
      </h3>
      <div className="font-serif mt-3 space-y-2 overflow-hidden text-[0.9rem] leading-relaxed text-[#1F1815]/85">
        {(data.body || '')
          .split('\n')
          .filter(Boolean)
          .slice(0, 6)
          .map((para, i) => (
            <p key={i} className="line-clamp-3">
              {para}
            </p>
          ))}
      </div>
      {data.signature && (
        <p className="font-hand mt-4 text-right text-[1.3rem] text-[#1E3A5F]">
          {data.signature}
        </p>
      )}
    </div>
  )
}
