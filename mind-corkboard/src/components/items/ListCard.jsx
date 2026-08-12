import PushPin from '../decor/PushPin'
import { SpiralHoles } from '../decor/TornEdges'

export default function ListCard({ item, onToggleItem }) {
  const { data, pinColor } = item
  const lines = Array.from({ length: 8 }, (_, i) => i)

  return (
    <div className="relative w-full select-none">
      <div className="absolute -top-2 left-1/2 z-10 -translate-x-1/2">
        <PushPin color={pinColor} size={18} />
      </div>

      <div
        className="relative flex overflow-hidden"
        style={{
          minHeight: 220,
          background: '#F1E7C7',
          boxShadow: '2px 3px 10px rgba(74,51,35,0.22), inset 0 0 0 1px rgba(74,51,35,0.1)',
        }}
      >
        <SpiralHoles className="w-6 shrink-0 border-r border-[#A08560]/25 bg-[#E8DCB8]/50 py-2" />
        <div className="relative flex-1 px-3 py-3">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            {lines.map((i) => (
              <div
                key={i}
                className="absolute inset-x-2 border-b border-[#B8CBDA]/45"
                style={{ top: 36 + i * 22 }}
              />
            ))}
          </div>

          <h3 className="font-display relative text-[1.25rem] font-medium italic text-[#1F1815]">
            {data.title || 'to remember'}
          </h3>
          {data.category && (
            <p className="font-type relative mt-0.5 text-[0.62rem] tracking-wide text-[#6B4A2E]">
              {data.category}
            </p>
          )}

          <ul className="relative mt-3 space-y-[6px]">
            {(data.items || []).slice(0, 7).map((entry, i) => (
              <li key={i} className="flex items-start gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onToggleItem?.(i)
                  }}
                  className="mt-1.5 h-3 w-3 shrink-0 border border-[#1E3A5F]/60"
                  style={{ background: entry.done ? '#1E3A5F' : 'transparent' }}
                  aria-label={entry.done ? 'mark incomplete' : 'mark complete'}
                />
                <span
                  className="font-hand text-[1.3rem] leading-tight text-[#1E3A5F]"
                  style={{
                    textDecoration: entry.done ? 'line-through' : 'none',
                    opacity: entry.done ? 0.5 : 1,
                  }}
                >
                  {entry.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
