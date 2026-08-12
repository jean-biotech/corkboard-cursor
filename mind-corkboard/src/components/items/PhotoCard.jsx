import WashiTape from '../decor/WashiTape'

export default function PhotoCard({ item }) {
  const { data } = item
  const isPolaroid = data.style !== 'regular'

  return (
    <div className="relative select-none" style={{ width: isPolaroid ? 180 : 200 }}>
      {/* Tape instead of pin */}
      <div className="absolute -top-2 left-1/2 z-10 -translate-x-1/2">
        <WashiTape
          color={data.tapeColor || 'cream'}
          width={48}
          height={16}
          rotation={-4}
          striped={data.tapeColor === 'cream'}
        />
      </div>

      <div
        style={{
          background: '#FAF6EE',
          padding: isPolaroid ? '10px 10px 36px' : '8px',
          boxShadow: '2px 4px 12px rgba(74,51,35,0.3)',
        }}
      >
        <div
          className="overflow-hidden bg-[#2A221C]"
          style={{
            width: '100%',
            height: isPolaroid ? 160 : 140,
          }}
        >
          {data.image ? (
            <img
              src={data.image}
              alt={data.caption || ''}
              className="h-full w-full object-cover"
              draggable={false}
            />
          ) : (
            <div className="flex h-full items-center justify-center font-type text-xs text-[#F1E7C7]/50">
              no photo
            </div>
          )}
        </div>
        {data.caption && (
          <p
            className="font-hand mt-2 text-center text-[1.1rem] leading-tight text-[#1E3A5F]"
            style={{ marginTop: isPolaroid ? 8 : 6 }}
          >
            {data.caption}
          </p>
        )}
      </div>
    </div>
  )
}
