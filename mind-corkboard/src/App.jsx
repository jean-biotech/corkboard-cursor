import { useRef } from 'react'
import { StoreProvider } from './lib/store'
import BoardTabs from './components/BoardTabs'
import Corkboard from './components/Corkboard'
import PushPin from './components/decor/PushPin'

function TitleMark() {
  return (
    <div className="inline-block">
      <div className="flex items-start">
        <span
          className="relative z-[1] shrink-0"
          style={{ marginTop: 6, marginRight: -6 }}
          aria-hidden="true"
        >
          <PushPin color="red" size={14} />
        </span>
        <div>
          <h1
            className="font-display italic leading-none text-[#1F1815]"
            style={{
              fontSize: '48px',
              fontWeight: 500,
              fontVariationSettings: '"opsz" 144',
            }}
          >
            Mind Corkboard
          </h1>
          <svg
            className="mt-1 block w-full"
            height="6"
            viewBox="0 0 320 6"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M1 4 Q40 1.5 80 3.5 T160 2.5 Q220 1.5 280 3.5 Q300 4.5 319 3"
              fill="none"
              stroke="#1E3A5F"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.7"
            />
          </svg>
          <p
            className="font-hand italic text-[#1E3A5F]"
            style={{ fontSize: '16px', marginTop: 12, lineHeight: 1.2 }}
          >
            Pin what stays with you.
          </p>
        </div>
      </div>
    </div>
  )
}

function WallEnvironment() {
  return null
}

function Shell() {
  const boardRef = useRef(null)

  return (
    <div className="wall-pattern relative min-h-screen overflow-x-hidden pb-16">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 28% 18%, rgba(255,248,230,0.45) 0%, transparent 48%)',
        }}
      />
      <WallEnvironment />

      <header className="relative z-10 mx-auto max-w-[1500px] px-4 pt-7 sm:px-8">
        <TitleMark />
        <div style={{ marginTop: 24 }}>
          <BoardTabs />
        </div>
      </header>

      <main className="relative z-10 px-2 pt-8 sm:px-6">
        <Corkboard boardRef={boardRef} />
        <p className="font-type mx-auto mt-8 max-w-xl text-center text-[0.6rem] tracking-wide text-[#6B4A2E]/60">
          click empty cork to pin · drag to arrange · double-click to edit
        </p>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  )
}
