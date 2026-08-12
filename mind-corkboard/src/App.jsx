import { useRef } from 'react'
import { StoreProvider } from './lib/store'
import BoardTabs from './components/BoardTabs'
import Corkboard from './components/Corkboard'
import ExportToolbar from './components/ExportToolbar'
import { PressedFlower } from './components/decor/Doodles'
import WashiTape from './components/decor/WashiTape'

function Shell() {
  const boardRef = useRef(null)

  return (
    <div className="wall-dots relative min-h-screen overflow-x-hidden pb-16">
      {/* Wall atmosphere */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 30% 20%, rgba(255,248,230,0.7) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(201,168,118,0.12) 0%, transparent 45%)',
        }}
      />

      {/* Decorative wall elements */}
      <div className="pointer-events-none absolute left-4 top-28 hidden opacity-70 lg:block" aria-hidden="true">
        <svg width="70" height="120" viewBox="0 0 70 120" fill="none">
          <path d="M35 10 C20 40 18 70 28 110" stroke="#5C7A4F" strokeWidth="2" fill="none" opacity="0.6" />
          <ellipse cx="28" cy="40" rx="14" ry="8" fill="#9AB5A0" opacity="0.45" transform="rotate(-30 28 40)" />
          <ellipse cx="42" cy="55" rx="12" ry="7" fill="#5C7A4F" opacity="0.4" transform="rotate(25 42 55)" />
          <ellipse cx="30" cy="72" rx="11" ry="6" fill="#9AB5A0" opacity="0.4" transform="rotate(-15 30 72)" />
        </svg>
      </div>
      <div className="pointer-events-none absolute right-6 top-32 hidden rotate-6 opacity-80 lg:block" aria-hidden="true">
        <div
          className="p-1.5 pb-5"
          style={{ background: '#FAF6EE', boxShadow: '2px 3px 8px rgba(74,51,35,0.2)', width: 72 }}
        >
          <div className="h-16 w-full" style={{ background: 'linear-gradient(140deg, #B8CBDA, #E4A5A5)' }} />
        </div>
        <div className="absolute -top-1 left-1/2 -translate-x-1/2">
          <WashiTape color="rose" width={36} height={12} rotation={-6} />
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-10 left-8 hidden opacity-50 lg:block" aria-hidden="true">
        <PressedFlower />
      </div>

      <header className="relative z-10 mx-auto max-w-[1500px] px-4 pb-2 pt-6 sm:px-8">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-4xl italic leading-none text-[#1F1815] sm:text-5xl">
              Mind Corkboard
            </h1>
            <p className="font-hand mt-1 text-xl text-[#1E3A5F]">
              Pin what stays with you.
            </p>
          </div>
          <ExportToolbar boardRef={boardRef} />
        </div>
        <BoardTabs />
      </header>

      <main className="relative z-10 px-2 pt-4 sm:px-6">
        <Corkboard boardRef={boardRef} />
        <p className="font-type mx-auto mt-6 max-w-xl text-center text-[0.65rem] tracking-wide text-[#6B4A2E]/70">
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
