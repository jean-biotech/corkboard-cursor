import { useRef } from 'react'
import { StoreProvider } from './lib/store'
import BoardTabs from './components/BoardTabs'
import Corkboard from './components/Corkboard'
import ExportToolbar from './components/ExportToolbar'
import PushPin from './components/decor/PushPin'

function TitleMark() {
  return (
    <div className="relative inline-block" style={{ transform: 'rotate(-0.6deg)' }}>
      <p className="font-scribble absolute -top-3 left-2 text-[11px] leading-none text-[#1E3A5F]">
        no. 1
      </p>
      <div className="flex flex-wrap items-end gap-2 sm:gap-3">
        <div className="relative">
          <div className="flex items-center gap-2">
            <span style={{ transform: 'rotate(-12deg)', marginTop: -4 }}>
              <PushPin color="red" size={18} />
            </span>
            <h1
              className="font-display leading-none text-[#1F1815]"
              style={{ fontSize: '38px', fontWeight: 400 }}
            >
              Mind{' '}
              <span className="relative inline-block">
                Corkboard
                <svg
                  className="absolute -bottom-0.5 left-0 w-full"
                  height="12"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 8 Q35 3 70 9 T140 5 Q170 3 198 7"
                    fill="none"
                    stroke="#1E3A5F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                </svg>
              </span>
            </h1>
          </div>
        </div>
        <p
          className="font-hand mb-0.5 text-[#1E3A5F]"
          style={{ fontSize: '16px', transform: 'rotate(-4deg) translateY(2px)', lineHeight: 1 }}
        >
          Pin what stays with you.
        </p>
      </div>
    </div>
  )
}

function WallEnvironment() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* hanging plant left */}
      <svg
        className="absolute left-3 top-20 hidden opacity-75 lg:block"
        width="78"
        height="140"
        viewBox="0 0 78 140"
        fill="none"
      >
        <path d="M39 0 V18" stroke="#6B4A2E" strokeWidth="1.2" />
        <ellipse cx="39" cy="24" rx="14" ry="6" fill="#EDE0C4" stroke="#6B4A2E" strokeWidth="1" />
        <path d="M28 28 Q26 55 32 90" stroke="#5C7A4F" strokeWidth="1.6" fill="none" />
        <path d="M39 28 Q42 60 38 110" stroke="#5C7A4F" strokeWidth="1.5" fill="none" />
        <path d="M48 28 Q54 58 50 95" stroke="#5C7A4F" strokeWidth="1.5" fill="none" />
        <ellipse cx="26" cy="48" rx="12" ry="7" fill="#9AB5A0" opacity="0.55" transform="rotate(-28 26 48)" />
        <ellipse cx="50" cy="58" rx="11" ry="6" fill="#5C7A4F" opacity="0.45" transform="rotate(22 50 58)" />
        <ellipse cx="36" cy="78" rx="10" ry="6" fill="#9AB5A0" opacity="0.5" transform="rotate(-10 36 78)" />
      </svg>

      {/* framed landscape right */}
      <div
        className="absolute right-5 top-28 hidden lg:block"
        style={{ transform: 'rotate(2.5deg)' }}
      >
        <div
          className="p-1.5"
          style={{
            background: '#6B4A2E',
            boxShadow: '2px 4px 10px rgba(74,51,35,0.25)',
          }}
        >
          <div
            className="h-[72px] w-[92px]"
            style={{
              background:
                'linear-gradient(180deg, #B8CBDA 0%, #E4A5A5 45%, #9AB5A0 70%, #6B4A2E 100%)',
            }}
          />
        </div>
        <div className="mx-auto mt-0 h-3 w-px bg-[#6B4A2E]/50" />
      </div>

      {/* wall shelf with objects */}
      <div className="absolute bottom-16 right-10 hidden opacity-80 xl:block">
        <svg width="140" height="70" viewBox="0 0 140 70" fill="none">
          <rect x="8" y="42" width="124" height="6" fill="#6B4A2E" opacity="0.75" />
          <rect x="10" y="48" width="4" height="14" fill="#4A3323" opacity="0.5" />
          <rect x="126" y="48" width="4" height="14" fill="#4A3323" opacity="0.5" />
          {/* candle */}
          <rect x="28" y="22" width="10" height="20" fill="#F1E7C7" stroke="#6B4A2E" strokeWidth="0.8" />
          <path d="M33 16 Q34 20 33 22" stroke="#D4A82B" strokeWidth="1.2" fill="none" />
          {/* book */}
          <rect x="52" y="26" width="28" height="16" fill="#2C4A6B" transform="rotate(-6 52 26)" />
          <rect x="54" y="28" width="24" height="12" fill="#F1E7C7" opacity="0.3" transform="rotate(-6 54 28)" />
          {/* pot plant */}
          <path d="M100 42 L106 28 H118 L124 42 Z" fill="#A08560" />
          <ellipse cx="112" cy="24" rx="8" ry="5" fill="#5C7A4F" opacity="0.65" />
          <ellipse cx="106" cy="20" rx="5" ry="3" fill="#9AB5A0" opacity="0.55" />
        </svg>
      </div>
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
            'radial-gradient(ellipse at 28% 18%, rgba(255,248,230,0.55) 0%, transparent 48%), radial-gradient(ellipse at 78% 72%, rgba(201,168,118,0.1) 0%, transparent 42%)',
        }}
      />
      <WallEnvironment />

      <header className="relative z-10 mx-auto max-w-[1500px] px-4 pb-1 pt-7 sm:px-8">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <TitleMark />
          <ExportToolbar boardRef={boardRef} />
        </div>
        <BoardTabs />
      </header>

      <main className="relative z-10 px-2 pt-2 sm:px-6">
        <Corkboard boardRef={boardRef} />
        <p className="font-type mx-auto mt-6 max-w-xl text-center text-[0.6rem] tracking-wide text-[#6B4A2E]/65">
          click empty cork to pin · drag to arrange · double-click to edit · right-click for more
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
