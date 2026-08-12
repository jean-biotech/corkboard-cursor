import { useRef } from 'react'
import { StoreProvider } from './lib/store'
import BoardTabs from './components/BoardTabs'
import Corkboard from './components/Corkboard'
import PushPin from './components/decor/PushPin'

function TitleMark() {
  return (
    <div className="relative inline-block">
      <p
        className="font-type absolute -top-3 left-0 leading-none text-[#1E3A5F]"
        style={{ fontSize: '10px', opacity: 0.65 }}
      >
        no. 1
      </p>
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex items-center gap-1.5">
          <PushPin color="red" size={16} />
          <h1
            className="font-display italic leading-none text-[#1F1815]"
            style={{
              fontSize: '44px',
              fontWeight: 500,
              fontVariationSettings: '"opsz" 144',
            }}
          >
            Mind{' '}
            <span className="relative inline-block">
              Corkboard
              <svg
                className="absolute -bottom-0.5 left-0 w-full"
                height="10"
                viewBox="0 0 200 10"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 6 Q40 2 80 7 T160 4 Q175 3 198 6"
                  fill="none"
                  stroke="#1E3A5F"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  opacity="0.75"
                />
              </svg>
            </span>
          </h1>
        </div>
        <p
          className="font-hand mb-1 text-[#1E3A5F]"
          style={{ fontSize: '15px', transform: 'rotate(-2deg)', lineHeight: 1 }}
        >
          Pin what stays with you.
        </p>
      </div>
    </div>
  )
}

function WallEnvironment() {
  // One quiet wall element: hanging plant only
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg
        className="absolute left-4 top-24 hidden opacity-55 lg:block"
        width="70"
        height="120"
        viewBox="0 0 78 140"
        fill="none"
      >
        <path d="M39 0 V18" stroke="#6B4A2E" strokeWidth="1.1" />
        <ellipse cx="39" cy="24" rx="12" ry="5" fill="#EDE0C4" stroke="#6B4A2E" strokeWidth="0.9" />
        <path d="M28 28 Q26 55 32 90" stroke="#5C7A4F" strokeWidth="1.4" fill="none" />
        <path d="M39 28 Q42 60 38 105" stroke="#5C7A4F" strokeWidth="1.3" fill="none" />
        <path d="M48 28 Q54 55 50 92" stroke="#5C7A4F" strokeWidth="1.3" fill="none" />
        <ellipse cx="26" cy="48" rx="11" ry="6" fill="#9AB5A0" opacity="0.45" transform="rotate(-28 26 48)" />
        <ellipse cx="50" cy="58" rx="10" ry="5" fill="#5C7A4F" opacity="0.4" transform="rotate(22 50 58)" />
      </svg>
    </div>
  )
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
