import { useState } from 'react'
import { MAX_BOARDS, useStore } from '../lib/store'

const WASHI = [
  { fill: '#E4A5A5', stripe: null },
  { fill: '#9AB5A0', stripe: '#EDE0C4' },
  { fill: '#B8CBDA', stripe: null },
  { fill: '#EDE0C4', stripe: '#E4A5A5' },
  { fill: '#D4B788', stripe: null },
  { fill: '#C9A876', stripe: '#EDE0C4' },
]

export default function BoardTabs() {
  const { boards, activeBoardId, setActiveBoard, addBoard, renameBoard, deleteBoard } = useStore()
  const [editingId, setEditingId] = useState(null)
  const [draft, setDraft] = useState('')

  return (
    <div className="flex flex-wrap items-end gap-2 px-1 pb-1">
      {boards.map((board, i) => {
        const active = board.id === activeBoardId
        const washi = WASHI[i % WASHI.length]
        const rot = ((i % 3) - 1) * 2.2 + (active ? -1 : 0.5)

        return (
          <div key={board.id} className="relative" style={{ transform: `rotate(${rot}deg)` }}>
            {editingId === board.id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (draft.trim()) renameBoard(board.id, draft.trim())
                  setEditingId(null)
                }}
              >
                <input
                  className="font-hand w-36 border-b border-[#4A3323] bg-transparent px-2 py-1 text-xl text-[#1E3A5F] outline-none"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onBlur={() => {
                    if (draft.trim()) renameBoard(board.id, draft.trim())
                    setEditingId(null)
                  }}
                  autoFocus
                />
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setActiveBoard(board.id)}
                onDoubleClick={() => {
                  setEditingId(board.id)
                  setDraft(board.name)
                }}
                className="font-hand relative px-4 py-1.5 text-xl leading-none text-[#1F1815]"
                style={{
                  background: washi.fill,
                  opacity: active ? 1 : 0.62,
                  boxShadow: active
                    ? '1px 3px 6px rgba(74,51,35,0.22)'
                    : '1px 2px 3px rgba(74,51,35,0.12)',
                  backgroundImage: washi.stripe
                    ? `repeating-linear-gradient(90deg, ${washi.fill} 0 8px, ${washi.stripe} 8px 12px)`
                    : undefined,
                }}
              >
                {/* torn edge nicks */}
                <span
                  className="pointer-events-none absolute -left-0.5 top-0 h-full w-1.5 opacity-70"
                  style={{
                    background: `linear-gradient(180deg, transparent 10%, ${washi.fill} 12%, transparent 30%, ${washi.fill} 55%, transparent 70%)`,
                  }}
                />
                {board.name}
              </button>
            )}
            {active && boards.length > 1 && (
              <button
                type="button"
                className="font-hand absolute -right-1 -top-2 text-sm text-[#C8322E]/75"
                onClick={() => {
                  if (window.confirm('take this board down?')) deleteBoard(board.id)
                }}
                aria-label="delete board"
              >
                ×
              </button>
            )}
          </div>
        )
      })}

      {boards.length < MAX_BOARDS && (
        <button
          type="button"
          onClick={() => {
            const name = window.prompt('name this board', `Board ${boards.length + 1}`)
            if (name?.trim()) addBoard(name.trim())
          }}
          className="ml-1 px-2 py-1"
          aria-label="add board"
          style={{ transform: 'rotate(4deg)' }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
            <path
              d="M4 11.2 Q10 10.5 18 10.8"
              stroke="#1E3A5F"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M10.8 4 Q11.4 11 11 18"
              stroke="#1E3A5F"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  )
}
