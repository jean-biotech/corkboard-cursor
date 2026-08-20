import { useRef } from 'react'
import { StoreProvider, useStore } from './lib/store'
import BoardTabs from './components/BoardTabs'
import Corkboard from './components/Corkboard'
import ExportToolbar from './components/ExportToolbar'
import PushPin from './components/decor/PushPin'
import { useBoardLayout } from './lib/useBoardLayout'

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
              fontSize: 'clamp(36px, 5vw, 48px)',
              fontWeight: 500,
              fontVariationSettings: '"opsz" 144',
            }}
          >
            Mind Corkboard
          </h1>
          <svg
            className="mt-1 block w-full max-w-[320px]"
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

function BoardFooter({ boardRef }) {
  const { board } = useStore()

  return (
    <footer className="cork-footer mt-4 flex flex-col items-end gap-1.5 sm:mt-5">
      <p
        className="font-hand px-2 py-0.5 text-[13px] leading-none text-[#1E3A5F]"
        style={{
          background: 'rgba(241,231,199,0.72)',
          transform: 'rotate(-2deg)',
          boxShadow: '1px 1px 3px rgba(74,51,35,0.1)',
        }}
      >
        {board.items.length} thing{board.items.length === 1 ? '' : 's'} pinned
      </p>
      <ExportToolbar boardRef={boardRef} />
    </footer>
  )
}

function Shell() {
  const boardRef = useRef(null)
  const layout = useBoardLayout()

  return (
    <div className="wall-pattern relative min-h-[100vh] min-h-[100dvh] overflow-x-hidden">
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 28% 18%, rgba(255,248,230,0.45) 0%, transparent 48%)',
        }}
      />

      <div
        className="cork-page relative z-10 mx-auto flex min-h-[100vh] min-h-[100dvh] flex-col"
        style={{
          paddingLeft: layout.pagePad,
          paddingRight: layout.pagePad,
          paddingTop: 'max(28px, env(safe-area-inset-top))',
          paddingBottom: 'max(24px, env(safe-area-inset-bottom))',
          maxWidth: layout.frameWidth + layout.pagePad * 2,
        }}
      >
        <header className="cork-header shrink-0">
          <TitleMark />
          <div className="mt-6 sm:mt-8">
            <BoardTabs />
          </div>
        </header>

        <main className="cork-main flex flex-1 flex-col justify-center pt-6 sm:pt-8">
          <Corkboard boardRef={boardRef} />
          <BoardFooter boardRef={boardRef} />
          <p className="font-type mt-5 w-full text-left text-[0.6rem] tracking-wide text-[#6B4A2E]/60">
            tap empty cork to pin · drag to arrange · tap a pin to open · long-press to edit
          </p>
        </main>
      </div>
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
