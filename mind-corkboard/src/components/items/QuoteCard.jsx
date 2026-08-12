import PushPin from '../decor/PushPin'
import { TornPaperClip } from '../decor/TornEdges'

export default function QuoteCard({ item }) {
  const { data, pinColor, id } = item
  const clipId = `quote-torn-${id}`

  return (
    <div className="relative select-none" style={{ width: 210 }}>
      <TornPaperClip id={clipId} />
      <div className="absolute -top-2 left-1/2 z-10 -translate-x-1/2">
        <PushPin color={pinColor} size={16} />
      </div>

      <div
        className="relative px-4 pb-4 pt-5"
        style={{
          minHeight: 140,
          background: 'linear-gradient(180deg, #F4EBD0 0%, #EDE3C4 100%)',
          clipPath: `url(#${clipId})`,
          boxShadow: '2px 3px 8px rgba(74,51,35,0.2)',
        }}
      >
        {/* newspaper columns hint */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, #1F1815 0 1px, transparent 1px 7px)',
          }}
        />
        <p className="font-serif relative text-[1.2rem] leading-snug text-[#1F1815] italic">
          “{data.text || '…'}”
        </p>
        <p className="font-type relative mt-3 text-right text-[0.62rem] text-[#6B4A2E]">
          — {data.attribution || 'anonymous'}
        </p>
      </div>
    </div>
  )
}
