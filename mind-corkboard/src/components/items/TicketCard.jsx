import PushPin from '../decor/PushPin'
import { PerforatedEdge } from '../decor/TornEdges'

export default function TicketCard({ item }) {
  const { data, pinColor } = item

  return (
    <div className="relative select-none" style={{ width: 240 }}>
      <div className="absolute -top-2 left-1/2 z-10 -translate-x-1/2">
        <PushPin color={pinColor} size={16} />
      </div>

      <div
        className="relative flex overflow-hidden"
        style={{
          background: '#F1E7C7',
          boxShadow: '2px 3px 10px rgba(74,51,35,0.28)',
          clipPath:
            'polygon(0% 0%, 97% 0%, 100% 8%, 96% 16%, 100% 24%, 97% 32%, 100% 40%, 96% 48%, 100% 56%, 97% 64%, 100% 72%, 96% 80%, 100% 88%, 97% 96%, 100% 100%, 0% 100%)',
        }}
      >
        <PerforatedEdge className="w-4 shrink-0 border-r border-dashed border-[#A08560]/50 bg-[#EDE0C4]/60" />
        <div className="flex-1 px-3 py-3">
          <p className="font-type text-[0.55rem] tracking-[0.12em] text-[#6B4A2E]">
            ADMIT ONE
          </p>
          <h3 className="font-serif mt-1 text-lg font-medium leading-tight text-[#1F1815]">
            {data.eventName || 'Event'}
          </h3>
          <p className="font-type mt-2 text-[0.7rem] text-[#4A3323]">
            {data.date || '—'}
          </p>
          <p className="font-type text-[0.65rem] text-[#6B4A2E]">
            {data.venue || 'somewhere'}
          </p>
          {(data.seat || data.artist) && (
            <p className="font-type mt-1 text-[0.6rem] text-[#6B4A2E]/80">
              {[data.artist, data.seat].filter(Boolean).join(' · ')}
            </p>
          )}
          {data.memory && (
            <p className="font-hand mt-2 text-[1.05rem] leading-snug text-[#1E3A5F]">
              {data.memory}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
