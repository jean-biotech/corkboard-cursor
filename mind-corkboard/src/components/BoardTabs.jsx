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
    <div className="flex flex-wrap items-end gap-2 px-1">
      {boards.map((board, i) => {
        const active = board.id === activeBoardId
        const washi = WASHI[i % WASHI.length]
        const rot = ((i % 3) - 1) * 0.7

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
                  className="font-hand w-32 border-b border-[#4A3323] bg-transparent px-2 py-0.5 text-[14px] text-[#1E3A5F] outline-none"
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
                className="font-hand relative px-3.5 py-1 text-[14px] leading-none text-[#1F1815] transition"
                style={{
                  background: washi.fill,
                  opacity: active ? 1 : 0.6,
                  boxShadow: active
                    ? '1px 2px 4px rgba(74,51,35,0.18)'
                    : '1px 1px 2px rgba(74,51,35,0.1)',
                  filter: active ? 'saturate(1.08)' : 'saturate(0.9)',
                  backgroundImage: washi.stripe
                    ? `repeating-linear-gradient(90deg, ${washi.fill} 0 8px, ${washi.stripe} 8px 12px)`
                    : undefined,
                }}
              >
                {board.name}
              </button>
            )}
            {active && boards.length > 1 && (
              <button
                type="button"
                className="font-hand absolute -right-1 -top-1.5 text-[11px] text-[#C8322E]/70"
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
          className="mb-0.5 ml-0.5 px-1.5 font-hand text-[16px] leading-none text-[#8A6A4A] opacity-45 transition hover:opacity-75"
          aria-label="add board"
          title="New board"
        >
          +
        </button>
      )}
    </div>
  )
}
