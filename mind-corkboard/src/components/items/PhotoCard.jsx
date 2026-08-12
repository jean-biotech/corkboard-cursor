import WashiTape from '../decor/WashiTape'

export default function PhotoCard({ item }) {
  const { data } = item
  const isPolaroid = data.style !== 'regular'

  return (
    <div className="relative select-none" style={{ width: isPolaroid ? 176 : 196 }}>
      <div className="absolute -top-2 left-1/2 z-10 -translate-x-1/2">
        <WashiTape
          color={data.tapeColor || 'cream'}
          width={48}
          height={16}
          rotation={-4}
          striped={data.tapeColor === 'cream' || !data.tapeColor}
        />
      </div>

      <div
        className={isPolaroid ? 'photo-curl-corner' : ''}
        style={{
          background: '#FAF6EE',
          padding: isPolaroid ? '10px 10px 40px' : '8px',
          boxShadow: '2px 4px 12px rgba(74,51,35,0.28)',
        }}
      >
        <div
          className="overflow-hidden bg-[#2A221C]"
          style={{ width: '100%', height: isPolaroid ? 155 : 135 }}
        >
          {data.image ? (
            <img
              src={data.image}
              alt={data.caption || ''}
              className="h-full w-full object-cover"
              draggable={false}
            />
          ) : (
            <div className="font-type flex h-full items-center justify-center text-xs text-[#F1E7C7]/50">
              no photo
            </div>
          )}
        </div>
        {data.caption && (
          <p className="font-hand mt-2 text-center text-[1.35rem] leading-tight text-[#1E3A5F]">
            {data.caption}
          </p>
        )}
      </div>
    </div>
  )
}
