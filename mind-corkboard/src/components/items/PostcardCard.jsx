import PushPin from '../decor/PushPin'

const PRESETS = {
  coast: 'linear-gradient(160deg, #B8CBDA 0%, #EDE0C4 55%, #E4A5A5 100%)',
  forest: 'linear-gradient(160deg, #5C7A4F 0%, #9AB5A0 50%, #F1E7C7 100%)',
  city: 'linear-gradient(160deg, #4A3323 0%, #6B4A2E 40%, #C9A876 100%)',
  dusk: 'linear-gradient(160deg, #2C4A6B 0%, #E4A5A5 60%, #D4A82B 100%)',
}

export default function PostcardCard({ item, showBack = false }) {
  const { data, pinColor } = item
  const frontBg = data.image ? undefined : PRESETS[data.preset] || PRESETS.coast

  return (
    <div
      className="relative select-none"
      style={{
        width: 280,
        height: 180,
        background: '#F1E7C7',
        boxShadow: '3px 4px 12px rgba(74,51,35,0.26), inset 0 0 0 2px rgba(74,51,35,0.12)',
      }}
    >
      <div className="absolute -top-2 left-1/2 z-10 -translate-x-1/2">
        <PushPin color={pinColor} size={18} />
      </div>

      <div className="absolute inset-1.5 border border-[#A08560]/35" />
      <p className="font-type absolute left-4 top-3 z-[1] text-[0.55rem] tracking-[0.14em] text-[#6B4A2E]/70">
        postcard
      </p>

      {!showBack ? (
        <div className="relative h-full w-full overflow-hidden p-3 pt-6">
          <div className="h-full w-full overflow-hidden" style={{ background: frontBg || '#2A221C' }}>
            {data.image && (
              <img src={data.image} alt="" className="h-full w-full object-cover" draggable={false} />
            )}
          </div>
          <div
            className="absolute right-4 top-5 flex h-12 w-10 flex-col items-center justify-center"
            style={{
              border: '2px dashed rgba(200,50,46,0.5)',
              background: 'rgba(241,231,199,0.85)',
            }}
          >
            <span className="font-type text-[0.5rem] text-[#C8322E]">POST</span>
            <span className="font-type text-[0.45rem] text-[#6B4A2E]">
              {data.date?.slice(0, 4) || '····'}
            </span>
          </div>
          {data.location && (
            <p className="font-hand absolute bottom-4 left-5 text-[1.15rem] text-[#1E3A5F]">
              {data.location}
            </p>
          )}
        </div>
      ) : (
        <div className="relative flex h-full gap-3 p-4 pt-7">
          <div className="flex-1 border-r border-dashed border-[#A08560]/40 pr-3">
            <p className="font-type text-[0.55rem] tracking-wide text-[#6B4A2E]">message</p>
            <p className="font-hand mt-1 text-[1.1rem] leading-snug text-[#1E3A5F]">
              {data.message || '…'}
            </p>
          </div>
          <div className="w-[42%]">
            <p className="font-type text-[0.55rem] tracking-wide text-[#6B4A2E]">from</p>
            <p className="font-hand text-[1rem] text-[#1E3A5F]">{data.sentFrom || 'you'}</p>
            <p className="font-type mt-3 text-[0.55rem] tracking-wide text-[#6B4A2E]">date</p>
            <p className="font-type text-[0.7rem] text-[#1F1815]">{data.date || '—'}</p>
          </div>
        </div>
      )}
    </div>
  )
}
