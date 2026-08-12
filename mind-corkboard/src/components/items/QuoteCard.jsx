import PushPin from '../decor/PushPin'

export default function QuoteCard({ item }) {
  const { data, pinColor } = item

  return (
    <div
      className="relative select-none px-4 pb-4 pt-6"
      style={{
        width: 200,
        minHeight: 160,
        background: '#F1E7C7',
        boxShadow: '2px 3px 8px rgba(74,51,35,0.25), inset 0 0 0 1px rgba(74,51,35,0.15)',
      }}
    >
      <div className="absolute -top-2 left-1/2 z-10 -translate-x-1/2">
        <PushPin color={pinColor} size={18} />
      </div>

      <p className="font-serif text-[1.15rem] leading-snug text-[#1F1815] italic">
        “{data.text || '…'}”
      </p>
      <p className="font-type mt-3 text-[0.65rem] text-[#6B4A2E]">
        — {data.attribution || 'anonymous'}
      </p>
      {data.context && (
        <p className="font-hand mt-2 text-[0.95rem] leading-snug text-[#1E3A5F]/85">
          {data.context}
        </p>
      )}
    </div>
  )
}
