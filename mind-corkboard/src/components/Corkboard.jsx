import { useCallback, useEffect, useRef, useState, lazy, Suspense } from 'react'
import CorkTexture from './CorkTexture'
import WoodFrame from './WoodFrame'
import { BoardDecorations } from './decor/Doodles'
import AddItemPopover from './AddItemPopover'
import BoardItem from './BoardItem'
import ContextMenu from './ContextMenu'
import ExpandedView from './ExpandedView'
import {
  BOARD_H,
  BOARD_W,
  playPinChime,
  useStore,
} from '../lib/store'

const FORM_MAP = {
  book: lazy(() => import('./forms/BookForm')),
  quote: lazy(() => import('./forms/QuoteForm')),
  photo: lazy(() => import('./forms/PhotoForm')),
  note: lazy(() => import('./forms/NoteForm')),
  postcard: lazy(() => import('./forms/PostcardForm')),
  letter: lazy(() => import('./forms/LetterForm')),
  ticket: lazy(() => import('./forms/TicketForm')),
  list: lazy(() => import('./forms/ListForm')),
}

export default function Corkboard({ boardRef }) {
  const {
    board,
    soundEnabled,
    addItem,
    updateItem,
    moveItem,
    nudgeItems,
    bringToFront,
    duplicateItem,
    deleteItem,
    setPinColor,
  } = useStore()

  const surfaceRef = useRef(null)
  const [scale, setScale] = useState(1)
  const [addMenu, setAddMenu] = useState(null)
  const [formType, setFormType] = useState(null)
  const [formPos, setFormPos] = useState({ x: 200, y: 200 })
  const [editingItem, setEditingItem] = useState(null)
  const [expanded, setExpanded] = useState(null)
  const [context, setContext] = useState(null)
  const [justPinnedId, setJustPinnedId] = useState(null)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [pinnedFlash, setPinnedFlash] = useState(false)
  const ignoreBoardClickUntil = useRef(0)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const handler = () => setReduceMotion(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    function updateScale() {
      const padding = window.innerWidth < 640 ? 16 : 48
      const available = Math.min(window.innerWidth - padding, 1500)
      const frameW = BOARD_W + 64
      setScale(Math.min(1, available / frameW))
    }
    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  useEffect(() => {
    if (!justPinnedId) return
    const t = setTimeout(() => setJustPinnedId(null), 600)
    return () => clearTimeout(t)
  }, [justPinnedId])

  const handleBoardClick = useCallback((e) => {
    if (Date.now() < ignoreBoardClickUntil.current) return
    // only empty cork — ignore clicks that land on pinned items
    if (e.target.closest('[data-board-item]')) return
    if (e.target.closest('[data-add-popover]')) return

    const rect = surfaceRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / scale
    const y = (e.clientY - rect.top) / scale
    setAddMenu({ x, y })
    setContext(null)
  }, [scale])

  const openForm = (type, x, y, item = null) => {
    setFormType(type)
    setFormPos({ x, y })
    setEditingItem(item)
    setAddMenu(null)
    setExpanded(null)
  }

  const handleFormSubmit = (data) => {
    if (editingItem) {
      updateItem(editingItem.id, data)
      setEditingItem(null)
      setFormType(null)
      return
    }
    addItem(formType, formPos.x - 40, formPos.y - 20, data)
    // find newest item after dispatch via timeout
    setTimeout(() => {
      const newest = board.items[board.items.length - 1]
      // The store will have the new item; we mark by listening next render
    }, 0)
    setJustPinnedId('pending')
    if (soundEnabled) playPinChime()
    setPinnedFlash(true)
    setTimeout(() => setPinnedFlash(false), 1200)
    setFormType(null)
  }

  // Track last item count to detect new pins for animation
  const prevCount = useRef(board.items.length)
  useEffect(() => {
    if (board.items.length > prevCount.current) {
      const newest = [...board.items].sort((a, b) => b.createdAt - a.createdAt)[0]
      if (newest) setJustPinnedId(newest.id)
    }
    prevCount.current = board.items.length
  }, [board.items])

  const FormComponent = formType ? FORM_MAP[formType] : null

  const frameW = BOARD_W + 64
  const frameH = BOARD_H + 64

  return (
    <>
      <div
        className="relative mx-auto"
        style={{
          width: frameW * scale,
          height: frameH * scale,
        }}
      >
        <div
          ref={boardRef}
          className="origin-top-left"
          style={{
            width: frameW,
            height: frameH,
            transform: `scale(${scale})`,
            filter: 'drop-shadow(0 22px 40px rgba(74, 51, 35, 0.35))',
          }}
        >
          {/* Wood frame shell */}
          <div className="relative h-full w-full">
            <WoodFrame />

            {/* Cork surface */}
            <div
              ref={surfaceRef}
              data-cork-surface
              className="cork-surface absolute overflow-hidden"
              style={{
                left: 32,
                top: 32,
                width: BOARD_W,
                height: BOARD_H,
              }}
              onClick={handleBoardClick}
            >
              <CorkTexture />
              <div className="window-light" />
              <div className="grain-overlay" />
              <BoardDecorations />

              {/* Board title card */}
              <div
                className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 px-5 py-2"
                style={{
                  background: '#F1E7C7',
                  transform: 'translateX(-50%) rotate(-1.5deg)',
                  boxShadow: '2px 3px 8px rgba(74,51,35,0.2)',
                }}
              >
                <p className="font-display text-center text-xl italic text-[#1F1815]">
                  {board.titleCard || board.name}
                </p>
              </div>

              {/* Item counter note */}
              <div
                className="pointer-events-none absolute bottom-4 right-6 px-3 py-1"
                style={{
                  background: 'rgba(241,231,199,0.85)',
                  transform: 'rotate(2deg)',
                  boxShadow: '1px 2px 4px rgba(74,51,35,0.15)',
                }}
              >
                <p className="font-hand text-base text-[#1E3A5F]">
                  your board has {board.items.length} pinned item
                  {board.items.length === 1 ? '' : 's'}
                </p>
              </div>

              {board.items.map((item) => (
                <BoardItem
                  key={item.id}
                  item={item}
                  justPinned={justPinnedId === item.id}
                  reduceMotion={reduceMotion}
                  onMove={(id, nx, ny) => {
                    ignoreBoardClickUntil.current = Date.now() + 250
                    moveItem(id, nx, ny)
                    if (!reduceMotion) {
                      const nudges = {}
                      board.items.forEach((other) => {
                        if (other.id === id) return
                        const dx = other.x - nx
                        const dy = other.y - ny
                        const dist = Math.hypot(dx, dy)
                        if (dist < 90 && dist > 0) {
                          const push = (90 - dist) / 90
                          nudges[other.id] = {
                            dx: (dx / dist) * push * 14,
                            dy: (dy / dist) * push * 14,
                          }
                        }
                      })
                      if (Object.keys(nudges).length) nudgeItems(nudges)
                    }
                  }}
                  onSelect={(it) => {
                    bringToFront(it.id)
                    setExpanded(it)
                  }}
                  onEdit={(it) => openForm(it.type, it.x, it.y, it)}
                  onContextMenu={(it, cx, cy) => {
                    bringToFront(it.id)
                    setContext({ item: it, x: cx, y: cy })
                  }}
                  onToggleListItem={(index) => {
                    const items = [...(item.data.items || [])]
                    items[index] = { ...items[index], done: !items[index].done }
                    updateItem(item.id, { items })
                  }}
                />
              ))}

              <AddItemPopover
                open={!!addMenu}
                x={addMenu?.x ?? 0}
                y={addMenu?.y ?? 0}
                onClose={() => setAddMenu(null)}
                onSelect={(type) => openForm(type, addMenu.x, addMenu.y)}
              />
            </div>
          </div>
        </div>
      </div>

      {pinnedFlash && (
        <p className="font-hand pointer-events-none fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 text-2xl text-[#C8322E]">
          pinned.
        </p>
      )}

      {FormComponent && (
        <Suspense fallback={null}>
          <FormComponent
            key={editingItem?.id || formType}
            open
            initial={editingItem?.data}
            onClose={() => {
              setFormType(null)
              setEditingItem(null)
            }}
            onSubmit={handleFormSubmit}
          />
        </Suspense>
      )}

      <ExpandedView
        item={expanded ? board.items.find((i) => i.id === expanded.id) || expanded : null}
        onClose={() => setExpanded(null)}
        onEdit={() => {
          if (expanded) openForm(expanded.type, expanded.x, expanded.y, expanded)
        }}
      />

      <ContextMenu
        open={!!context}
        x={context?.x ?? 0}
        y={context?.y ?? 0}
        onClose={() => setContext(null)}
        onEdit={() => {
          if (context) openForm(context.item.type, context.item.x, context.item.y, context.item)
        }}
        onDuplicate={() => {
          if (context) duplicateItem(context.item.id)
        }}
        onDelete={() => {
          if (context && window.confirm('take this down?')) {
            deleteItem(context.item.id)
          }
        }}
        onPinColor={(color) => {
          if (context) setPinColor(context.item.id, color)
        }}
      />
    </>
  )
}
