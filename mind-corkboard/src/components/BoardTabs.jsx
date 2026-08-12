import { useState } from 'react'
import { MAX_BOARDS, useStore } from '../lib/store'

export default function BoardTabs() {
  const { boards, activeBoardId, setActiveBoard, addBoard, renameBoard, deleteBoard } = useStore()
  const [editingId, setEditingId] = useState(null)
  const [draft, setDraft] = useState('')

  return (
    <div className="flex flex-wrap items-end gap-1 px-1">
      {boards.map((board) => {
        const active = board.id === activeBoardId
        return (
          <div key={board.id} className="relative">
            {editingId === board.id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (draft.trim()) renameBoard(board.id, draft.trim())
                  setEditingId(null)
                }}
              >
                <input
                  className="font-hand w-36 border-b border-[#4A3323] bg-transparent px-2 py-1 text-lg text-[#1E3A5F] outline-none"
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
                className="font-hand relative px-4 py-1.5 text-lg transition-colors"
                style={{
                  background: active ? '#F1E7C7' : 'rgba(241,231,199,0.45)',
                  color: active ? '#1F1815' : '#6B4A2E',
                  boxShadow: active
                    ? '0 -2px 0 #C8322E inset, 0 2px 6px rgba(74,51,35,0.12)'
                    : 'none',
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4,
                }}
              >
                {board.name}
              </button>
            )}
            {active && boards.length > 1 && (
              <button
                type="button"
                className="font-type absolute -right-1 -top-2 text-[0.55rem] text-[#C8322E]/80"
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
          className="font-hand px-3 py-1.5 text-xl text-[#6B4A2E] hover:text-[#C8322E]"
          aria-label="add board"
        >
          +
        </button>
      )}
    </div>
  )
}
